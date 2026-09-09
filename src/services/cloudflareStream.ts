/**
 * Cloudflare Stream config. PASTE YOUR CUSTOMER CODE HERE once you have a
 * Cloudflare Stream account — find it in the dashboard under Stream > any
 * video > the embed/HLS URL, as the <code> in
 * customer-<code>.cloudflarestream.com.
 *
 * Safe to commit — this only identifies your account for playback URLs,
 * it isn't a secret. Uploading/managing videos needs a separate API token
 * that must never live in this app (server-side only).
 */
const CLOUDFLARE_STREAM_CUSTOMER_CODE = 'REPLACE_ME';

export function isCloudflareStreamConfigured(): boolean {
  return CLOUDFLARE_STREAM_CUSTOMER_CODE !== 'REPLACE_ME';
}

/** Builds the HLS manifest URL for a Cloudflare Stream video ID, playable via expo-video. */
export function getStreamPlaybackUrl(videoId: string): string {
  return `https://customer-${CLOUDFLARE_STREAM_CUSTOMER_CODE}.cloudflarestream.com/${videoId}/manifest/video.m3u8`;
}
