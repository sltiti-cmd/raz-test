"""Generate reviewable MP3s from the locked A-F reading-audio manifest.

Dependencies are intentionally local to this project. Install kokoro==0.9.4 and
misaki[zh]==0.9.4 in an isolated environment before running this script.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LOCAL_DEPS = ROOT / "tmp" / "kokoro_deps"
if LOCAL_DEPS.exists():
    sys.path.insert(0, str(LOCAL_DEPS))
os.environ.setdefault("HF_HOME", str(ROOT / "audio-work" / "hf-cache"))

import numpy as np  # noqa: E402
import soundfile as sf  # noqa: E402
from kokoro import KPipeline  # noqa: E402

SAMPLE_RATE = 24_000
VOICES = {
    "en-US": ("a", "hexgrad/Kokoro-82M", "af_heart", 0.96),
    "zh-CN": ("z", "hexgrad/Kokoro-82M-v1.1-zh", "zf_001", 1.0),
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, default=ROOT / "audio-work" / "reading-manifest.json")
    parser.add_argument("--output", type=Path, default=ROOT / "audio-work" / "generated")
    parser.add_argument("--only", help="Comma-separated manifest IDs for a pilot run")
    parser.add_argument("--ffmpeg", default="ffmpeg")
    parser.add_argument("--skip-existing", action="store_true")
    return parser.parse_args()


def silence(seconds: float) -> np.ndarray:
    return np.zeros(round(seconds * SAMPLE_RATE), dtype=np.float32)


def synthesize(text: str, lang: str, pipelines: dict[str, KPipeline]) -> np.ndarray:
    code, repo, voice, speed = VOICES[lang]
    if lang not in pipelines:
        print(f"Loading {repo} ({lang})...", flush=True)
        if lang == "zh-CN":
            # The Chinese front end otherwise drops embedded English words in
            # stems such as "Jake 为什么走进 tunnel？".
            en_g2p = KPipeline(lang_code="a", repo_id=repo, model=False)

            def en_callable(english: str) -> str:
                return next(en_g2p(english)).phonemes

            pipelines[lang] = KPipeline(
                lang_code=code, repo_id=repo, device="cpu", en_callable=en_callable
            )
        else:
            pipelines[lang] = KPipeline(lang_code=code, repo_id=repo, device="cpu")
    chunks = []
    for _, _, audio in pipelines[lang](text, voice=voice, speed=speed):
        waveform = np.asarray(audio, dtype=np.float32).reshape(-1)
        if waveform.size:
            if chunks:
                chunks.append(silence(0.12))
            chunks.append(waveform)
    if not chunks:
        raise RuntimeError(f"TTS returned no audio for {lang}: {text!r}")
    return np.concatenate(chunks)


def render_entry(entry: dict, destination: Path, ffmpeg: str, pipelines: dict[str, KPipeline]) -> None:
    pieces = []
    for index, segment in enumerate(entry["segments"]):
        audio = synthesize(segment["text"], segment["lang"], pipelines)
        repeats = segment.get("repeats", 1)
        for repeat in range(repeats):
            if pieces:
                pieces.append(silence(1.0 if entry["kind"] == "passage" and repeat else 0.45))
            pieces.append(audio)
    waveform = np.concatenate(pieces)
    if waveform.size < SAMPLE_RATE // 4 or not np.isfinite(waveform).all():
        raise RuntimeError(f"Invalid waveform: {entry['id']}")
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="reading-audio-", dir=ROOT / "audio-work") as temp:
        wav = Path(temp) / "source.wav"
        encoded = Path(temp) / "output.mp3"
        sf.write(wav, waveform, SAMPLE_RATE, subtype="PCM_16")
        subprocess.run(
            [ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-i", str(wav),
             "-af", "loudnorm=I=-18:TP=-2:LRA=11", "-ar", str(SAMPLE_RATE),
             "-ac", "1", "-c:a", "libmp3lame", "-b:a", "96k", str(encoded)],
            check=True,
        )
        if encoded.stat().st_size < 1_000:
            raise RuntimeError(f"Encoded MP3 unexpectedly small: {entry['id']}")
        encoded.replace(destination)


def main() -> None:
    args = parse_args()
    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    wanted = set(args.only.split(",")) if args.only else None
    entries = [entry for entry in manifest["entries"] if wanted is None or entry["id"] in wanted]
    if wanted is not None and len(entries) != len(wanted):
        raise ValueError(f"Unknown IDs: {sorted(wanted - {entry['id'] for entry in entries})}")
    if not entries:
        raise ValueError("No entries selected")
    args.output.mkdir(parents=True, exist_ok=True)
    pipelines: dict[str, KPipeline] = {}
    for index, entry in enumerate(entries, 1):
        destination = args.output / entry["file"]
        if args.skip_existing and destination.exists() and destination.stat().st_size >= 1_000:
            print(f"[{index}/{len(entries)}] skip {entry['id']}", flush=True)
            continue
        print(f"[{index}/{len(entries)}] {entry['id']}", flush=True)
        render_entry(entry, destination, args.ffmpeg, pipelines)
    print(f"Generated {len(entries)} selected entries in {args.output}", flush=True)


if __name__ == "__main__":
    main()
