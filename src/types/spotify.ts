/** Public JSON shape returned by `/api/spotify`. */
export interface SpotifySong {
  isPlaying: boolean;
  title: string;
  artists: string;
  album: string;
  albumArtUrl: string | null;
  spotifyUrl: string;
  progressMs?: number;
  durationMs?: number;
  playedAt?: string;
}

export interface SpotifyApiError {
  error: string;
}
