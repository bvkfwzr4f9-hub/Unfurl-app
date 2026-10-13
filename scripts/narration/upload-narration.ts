// Compresses each generated WAV to AAC (.m4a — much smaller, fine for voice)
// and uploads it to Firebase Storage under narration/. NOT part of the app.
//
// One-time setup, before the first run:
//   1. Firebase Console → Project Settings → Service Accounts → Generate
//      new private key. Save the downloaded JSON somewhere OUTSIDE the repo
//      (e.g. ~/unfurl-service-account.json) — never commit this file, it's
//      a real credential with full project access.
//   2. export GOOGLE_APPLICATION_CREDENTIALS=~/unfurl-service-account.json
//   3. Publish storage.rules from the Firebase Console first (see that
//      file's header comment) — this script's uploads work either way
//      since the Admin SDK bypasses rules, but playback in the app won't
//      until the rules are published.
//
// Then, from scripts/narration/:
//   npm install
//   npx tsx upload-narration.ts ./output
//
// Requires ffmpeg on PATH (already present on most dev machines and
// Codespaces' default image — `ffmpeg -version` to check).

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

const SOURCE_DIR = process.argv[2] || './output';
const COMPRESSED_DIR = './compressed';
const BUCKET = 'unfurl-b36a5.firebasestorage.app';

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error(
    'GOOGLE_APPLICATION_CREDENTIALS is not set — see the setup steps at the top of this file.'
  );
  process.exit(1);
}

try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
} catch {
  console.error(
    'ffmpeg not found on PATH. Install it (e.g. `sudo apt-get install -y ffmpeg` on most Codespaces images) and try again.'
  );
  process.exit(1);
}

initializeApp({
  credential: applicationDefault(),
  storageBucket: BUCKET,
});
const bucket = getStorage().bucket();

mkdirSync(COMPRESSED_DIR, { recursive: true });

const manifestPath = join(SOURCE_DIR, 'manifest.json');
if (!existsSync(manifestPath)) {
  console.error(`No manifest.json in ${SOURCE_DIR} — run generate-narration.ts first.`);
  process.exit(1);
}
const manifest: Record<string, { file: string }> = JSON.parse(readFileSync(manifestPath, 'utf-8'));

let uploaded = 0;

for (const [stepId, entry] of Object.entries(manifest)) {
  const wavPath = join(SOURCE_DIR, entry.file);
  if (!existsSync(wavPath)) {
    console.warn(`Skipping ${stepId} — ${wavPath} missing.`);
    continue;
  }

  const m4aName = entry.file.replace(/\.wav$/, '.m4a');
  const m4aPath = join(COMPRESSED_DIR, m4aName);
  const destPath = `narration/${stepId.replace(':', '__')}.m4a`;

  // Only re-encode/re-upload if the source WAV is newer than what we already
  // compressed — keeps re-runs after a partial failure cheap.
  const needsEncode =
    !existsSync(m4aPath) || statSync(wavPath).mtimeMs > statSync(m4aPath).mtimeMs;

  if (needsEncode) {
    console.log(`Encoding ${entry.file} -> ${m4aName} ...`);
    execFileSync('ffmpeg', [
      '-y',
      '-i', wavPath,
      '-c:a', 'aac',
      '-b:a', '48k', // plenty for spoken voice, keeps files small
      '-movflags', '+faststart', // lets playback start before the whole file downloads
      m4aPath,
    ], { stdio: 'inherit' });
  }

  console.log(`Uploading ${destPath} ...`);
  await bucket.upload(m4aPath, {
    destination: destPath,
    metadata: { contentType: 'audio/mp4' },
  });
  uploaded++;
}

console.log(`Done. Uploaded ${uploaded} files to gs://${BUCKET}/narration/.`);
