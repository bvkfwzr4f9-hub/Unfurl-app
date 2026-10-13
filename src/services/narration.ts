// Narration audio lives in Firebase Storage under narration/, uploaded by
// scripts/narration/upload-narration.ts — see storage.rules for the access
// model (public-read; see that file's comment for why).
const STORAGE_BUCKET = 'unfurl-b36a5.firebasestorage.app';

/** The public download URL for a step's narration audio, if it's been generated and uploaded yet. */
export function getNarrationUrl(sectionSlug: string, stepId: string): string {
  const path = encodeURIComponent(`narration/${sectionSlug}__${stepId}.m4a`);
  return `https://firebasestorage.googleapis.com/v0/b/${STORAGE_BUCKET}/o/${path}?alt=media`;
}
