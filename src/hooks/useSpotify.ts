import useSWR from 'swr';
import type { SpotifyApiError, SpotifySong } from '../types/spotify';

const SPOTIFY_ENDPOINT = '/api/spotify';

async function fetchSpotify(): Promise<SpotifySong> {
  const response = await fetch(SPOTIFY_ENDPOINT, { cache: 'no-store' });

  if (!response.ok) {
    let message = 'Failed to load Spotify data';
    try {
      const payload = (await response.json()) as SpotifyApiError;
      if (payload.error) message = payload.error;
    } catch {
      // Non-JSON error body — keep generic message.
    }
    throw new Error(message);
  }

  return response.json() as Promise<SpotifySong>;
}

export function useSpotify() {
  const { data, error, isLoading } = useSWR<SpotifySong>(
    SPOTIFY_ENDPOINT,
    fetchSpotify,
    {
      refreshInterval: (latest) => (latest?.isPlaying ? 5_000 : 60_000),
      revalidateOnFocus: true,
      dedupingInterval: 2_000,
    },
  );

  return {
    song: data ?? null,
    loading: isLoading,
    error: error instanceof Error ? error.message : error ? String(error) : null,
  };
}
