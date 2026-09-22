# RAZ reading-test MP3s

The current reading-test data is the text source. Run `node scripts/audio/buildReadingManifest.mjs` after any A–F text change; the script checks the C/E upgrade and placement routes share identical spoken questions.

| Content | Reading rule | Files |
| --- | --- | ---: |
| A titles | English once | 4 |
| A passages | English twice, one-second pause | 4 |
| A–F question stems | English once, then Chinese once | 120 |
| A answer choices | English once | 54 |

The six A-level dot pictures have no audio or playback button. G and above have no reading audio. The standalone listening-test module is outside this batch.

`generateReadingAudio.py` uses local Kokoro models: `hexgrad/Kokoro-82M` with `af_heart` for American English, and `hexgrad/Kokoro-82M-v1.1-zh` with `zf_001` for Mandarin. Both models are published under Apache-2.0. The Chinese pipeline includes an English grapheme-to-phoneme callback, so embedded words such as “party” and “tunnel” are not dropped. Five cloze stems have explicit audio-only phrasing in `buildReadingManifest.mjs`; their displayed text and answers are unchanged.

Regenerate from a Python environment with `kokoro==0.9.4`, `misaki[zh]==0.9.4`, `soundfile`, `numpy`, and spaCy's `en_core_web_sm` 3.8.0 model installed; FFmpeg and FFprobe must also be available:

```powershell
node scripts/audio/buildReadingManifest.mjs
python scripts/audio/generateReadingAudio.py --ffmpeg <ffmpeg-path>
python scripts/audio/verifyReadingAudio.py --ffprobe <ffprobe-path> --ffmpeg <ffmpeg-path>
```

After verification, copy `audio-work/generated/reading/v1/` to `public/audio/reading/v1/` and rerun the verifier with `--audio-root public/audio`. The player in `src/utils/readingAudio.js` resolves URLs using Vite's `BASE_URL`. Do not commit model caches or the intermediate generated copy. Review the sample clips in `audio-work/samples/` by ear before publishing, especially A1 passage repetition, a Chinese-English mixed stem, and a cloze stem. Automated decoding cannot judge pronunciation or teaching suitability.
