"""Check the locked reading-audio manifest against every generated MP3."""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, default=ROOT / "audio-work/reading-manifest.json")
    parser.add_argument("--audio-root", type=Path, default=ROOT / "audio-work/generated")
    parser.add_argument("--report", type=Path, default=ROOT / "audio-work/reading-qa.json")
    parser.add_argument("--ffprobe", default="ffprobe")
    parser.add_argument("--ffmpeg", default="ffmpeg")
    args = parser.parse_args()

    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    entries = manifest["entries"]
    actual_hash = hashlib.sha256(
        json.dumps(entries, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    ).hexdigest()
    if actual_hash != manifest["sourceSha256"]:
        raise ValueError("Manifest source hash does not match its entries")

    expected = {entry["file"] for entry in entries}
    actual = {str(path.relative_to(args.audio_root)).replace("\\", "/")
              for path in args.audio_root.rglob("*.mp3")}
    errors = [f"missing: {name}" for name in sorted(expected - actual)]
    errors += [f"unexpected: {name}" for name in sorted(actual - expected)]
    durations = {}
    for index, entry in enumerate(entries, 1):
        path = args.audio_root / entry["file"]
        if not path.is_file():
            continue
        result = subprocess.run(
            [args.ffprobe, "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)],
            capture_output=True, text=True,
        )
        if result.returncode:
            errors.append(f"ffprobe failed: {entry['id']}: {result.stderr.strip()}")
            continue
        probe = json.loads(result.stdout)
        streams = [stream for stream in probe.get("streams", []) if stream.get("codec_type") == "audio"]
        if len(streams) != 1:
            errors.append(f"expected one audio stream: {entry['id']}")
            continue
        stream = streams[0]
        duration = float(probe["format"]["duration"])
        durations[entry["id"]] = round(duration, 3)
        if stream.get("codec_name") != "mp3" or stream.get("channels") != 1 or stream.get("sample_rate") != "24000":
            errors.append(f"wrong codec, channels, or sample rate: {entry['id']}")
        if not 0.5 <= duration <= 180:
            errors.append(f"implausible duration {duration:.2f}s: {entry['id']}")
        if entry["kind"] == "passage" and duration < 3:
            errors.append(f"repeated passage too short: {entry['id']}")
        if path.stat().st_size < 1_000:
            errors.append(f"file too small: {entry['id']}")
        decoded = subprocess.run(
            [args.ffmpeg, "-v", "error", "-xerror", "-i", str(path), "-f", "null", "-"],
            capture_output=True, text=True,
        )
        if decoded.returncode:
            errors.append(f"decode failed: {entry['id']}: {decoded.stderr.strip()}")
        if index % 25 == 0 or index == len(entries):
            print(f"Verified {index}/{len(entries)}", flush=True)

    report = {
        "manifestSha256": actual_hash,
        "expectedFiles": len(expected),
        "foundFiles": len(actual),
        "decodedFiles": len(durations),
        "errors": errors,
        "durationsSeconds": durations,
    }
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(durations)} checked; {len(errors)} errors; report: {args.report}")
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
