// One-off sample generator — NOT part of the app. Run with:
//   cd scripts/narration && node generate-samples.mjs
//
// Produces a few short audio clips using real text from the content
// library, in a few different Kokoro voices, so we can judge quality and
// pick a voice before building the real pre-generation pipeline.

import { KokoroTTS } from 'kokoro-js';
import { mkdirSync } from 'node:fs';

const OUT_DIR = process.argv[2] || '../../../narration-samples';
mkdirSync(OUT_DIR, { recursive: true });

// Real excerpt from src/data/contentLibrary.ts (1.1) — one text, run across
// many voices, so comparing timbre isn't also comparing content.
const SAMPLES = {
  'recognition-1-1': [
    "There is a particular kind of loneliness that comes from being told, again and again, that what you feel isn't real.",
    "The doctor who nodded without hearing. The friend who changed the subject.",
    "It isn't.",
    "What you are feeling has a name, a cause, and a history far longer than your own.",
  ].join(' '),
};

// af_bella, af_heart, af_nicole already tried and rejected — skipped here.
// Rest of Kokoro's American + British female voices, for a wider pass.
const VOICES = [
  'af_alloy',
  'af_aoede',
  'af_jessica',
  'af_kore',
  'af_nova',
  'af_river',
  'af_sarah',
  'af_sky',
  'bf_alice',
  'bf_emma',
  'bf_isabella',
  'bf_lily',
];

console.log('Loading Kokoro-82M (q8 quantized)...');
const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-ONNX', {
  dtype: 'q8',
});

console.log('Available voices:', Object.keys(tts.voices ?? {}).join(', ') || '(see tts.list_voices())');

for (const voice of VOICES) {
  for (const [name, text] of Object.entries(SAMPLES)) {
    const outPath = `${OUT_DIR}/${name}__${voice}.wav`;
    console.log(`Generating ${outPath} ...`);
    const audio = await tts.generate(text, { voice });
    await audio.save(outPath);
  }
}

console.log('Done.');
