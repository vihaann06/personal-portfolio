import type { Handler } from '@netlify/functions';
import { getSpotifyTrack } from '../../shared/spotify/getSpotifyTrack';

function json(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async () => {
  try {
    const track = await getSpotifyTrack();
    return json(200, track);
  } catch (error) {
    console.error('[spotify]', error);
    const message = error instanceof Error ? error.message : 'Unable to fetch Spotify playback data';
    const statusCode = message.includes('not configured') ? 500 : message.includes('No Spotify') ? 404 : 502;
    return json(statusCode, { error: message });
  }
};
