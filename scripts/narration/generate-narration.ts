// Generates one narration audio file per content-library step. NOT part of
// the app — this only ever runs offline, never on-device. Run with:
//
//   cd scripts/narration
//   npx tsx generate-narration.ts ./output
//
// Re-run anytime content changes: existing files are skipped unless the
// step's text has changed since the last run (tracked via manifest.json),
// so this is cheap to re-run after an edit to a handful of pieces.
//
// NOTE: this has not been run end-to-end yet (huggingface.co is blocked in
// the sandbox this was written in — see the README in this folder). Before
// trusting the full 58-piece run, do a quick smoke test first:
//
//   npx tsx generate-narration.ts ./output --only=recognition-validation:1-1
//
// ...and listen to that one file before committing to the full batch.

import { KokoroTTS } from 'kokoro-js';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { contentLibrary, stepCompletionId } from '../../src/data/contentLibrary';

const VOICE = 'af_kore';
const OUT_DIR = process.argv[2] || './output';
const ONLY_FILTER = process.argv.find((a) => a.startsWith('--only='))?.slice('--only='.length);

mkdirSync(OUT_DIR, { recursive: true });

interface ManifestEntry {
  file: string;
  textHash: string;
  voice: string;
}
type Manifest = Record<string, ManifestEntry>;

const manifestPath = `${OUT_DIR}/manifest.json`;
const manifest: Manifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, 'utf-8'))
  : {};

function hashText(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

/** Writes a mono 16-bit PCM WAV file from concatenated float samples. */
function writeWav(path: string, samples: Float32Array, sampleRate: number) {
  const bytesPerSample = 2;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // fmt chunk size
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * bytesPerSample, 28); // byte rate
  buffer.writeUInt16LE(bytesPerSample, 32); // block align
  buffer.writeUInt16LE(16, 34); // bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(clamped * 32767), 44 + i * bytesPerSample);
  }

  writeFileSync(path, buffer);
}

console.log('Loading Kokoro-82M (q8 quantized)...');
const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-ONNX', {
  dtype: 'q8',
});

let generated = 0;
let skipped = 0;

for (const section of contentLibrary) {
  for (const step of section.steps) {
    const id = stepCompletionId(section.slug, step.id); // "slug:id"
    if (ONLY_FILTER && id !== ONLY_FILTER) continue;

    const text = step.body.join('\n\n');
    const textHash = hashText(text);
    const fileName = `${id.replace(':', '__')}.wav`;
    const existing = manifest[id];

    if (existing && existing.textHash === textHash && existing.voice === VOICE && existsSync(`${OUT_DIR}/${existing.file}`)) {
      skipped++;
      continue;
    }

    console.log(`Generating ${fileName} (${step.body.length} paragraphs, ${text.length} chars)...`);

    // Generate per paragraph and concatenate — safer than one huge call for
    // long pieces, in case the model/phonemizer has a practical length limit.
    const chunks: Float32Array[] = [];
    let sampleRate: number | null = null;
    for (const paragraph of step.body) {
      const result = await tts.generate(paragraph, { voice: VOICE });
      // kokoro-js returns a RawAudio-like object: { audio: Float32Array, sampling_rate: number }
      const audioArray: Float32Array = (result as any).audio;
      const rate: number = (result as any).sampling_rate;
      if (sampleRate === null) sampleRate = rate;
      else if (sampleRate !== rate) {
        throw new Error(`Sample rate changed mid-step (${sampleRate} -> ${rate}) — unexpected, stopping.`);
      }
      chunks.push(audioArray);
      // Small silence between paragraphs so they don't run together.
      chunks.push(new Float32Array(Math.round(rate * 0.35)));
    }
    const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
    const combined = new Float32Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }

    writeWav(`${OUT_DIR}/${fileName}`, combined, sampleRate!);
    manifest[id] = { file: fileName, textHash, voice: VOICE };
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    generated++;
  }
}

console.log(`Done. Generated ${generated}, skipped ${skipped} (already up to date).`);
