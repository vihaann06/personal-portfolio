export interface SpotifyTrackPayload {
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

interface SpotifyImage {
  url: string;
  width: number;
  height: number;
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyAlbum {
  name: string;
  images: SpotifyImage[];
}

interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  external_urls: { spotify: string };
}

interface CurrentlyPlayingPayload {
  is_playing: boolean;
  progress_ms: number;
  item: SpotifyTrack | null;
}

interface RecentlyPlayedPayload {
  items: Array<{ played_at: string; track: SpotifyTrack }>;
}

interface TokenResponse {
  access_token: string;
}

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const CURRENTLY_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

async function exchangeRefreshToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
): Promise<string> {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Spotify token exchange failed (${response.status})`);
  }

  const payload = (await response.json()) as TokenResponse;
  if (!payload.access_token) {
    throw new Error('Spotify token exchange returned no access token');
  }

  return payload.access_token;
}

async function spotifyGet<T>(accessToken: string, url: string): Promise<{ status: number; data: T | null }> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  if (response.status === 204) {
    return { status: 204, data: null };
  }

  if (!response.ok) {
    throw new Error(`Spotify API request failed (${response.status}) for ${url}`);
  }

  return { status: response.status, data: (await response.json()) as T };
}

function formatArtists(artists: SpotifyArtist[]): string {
  return artists.map((artist) => artist.name).join(', ');
}

function pickAlbumArt(images: SpotifyImage[]): string | null {
  if (!images.length) return null;
  const sorted = [...images].sort((a, b) => b.width - a.width);
  return sorted[0]?.url ?? null;
}

function toTrackPayload(
  track: SpotifyTrack,
  isPlaying: boolean,
  extras: Partial<SpotifyTrackPayload> = {},
): SpotifyTrackPayload {
  return {
    isPlaying,
    title: track.name,
    artists: formatArtists(track.artists),
    album: track.album.name,
    albumArtUrl: pickAlbumArt(track.album.images),
    spotifyUrl: track.external_urls.spotify,
    ...extras,
  };
}

async function fetchCurrentlyPlaying(accessToken: string): Promise<SpotifyTrackPayload | null> {
  const { status, data } = await spotifyGet<CurrentlyPlayingPayload>(
    accessToken,
    CURRENTLY_PLAYING_URL,
  );

  if (status === 204 || !data?.item) {
    return null;
  }

  return toTrackPayload(data.item, data.is_playing, {
    progressMs: data.progress_ms,
    durationMs: data.item.duration_ms,
  });
}

async function fetchRecentlyPlayed(accessToken: string): Promise<SpotifyTrackPayload | null> {
  const { data } = await spotifyGet<RecentlyPlayedPayload>(accessToken, RECENTLY_PLAYED_URL);
  const recent = data?.items?.[0];

  if (!recent?.track) {
    return null;
  }

  return toTrackPayload(recent.track, false, {
    playedAt: recent.played_at,
  });
}

/** Fetch currently playing, or fall back to the most recent track. */
export async function getSpotifyTrack(): Promise<SpotifyTrackPayload> {
  const clientId = readEnv('SPOTIFY_CLIENT_ID');
  const clientSecret = readEnv('SPOTIFY_CLIENT_SECRET');
  const refreshToken = readEnv('SPOTIFY_REFRESH_TOKEN');

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Spotify credentials are not configured');
  }

  const accessToken = await exchangeRefreshToken(clientId, clientSecret, refreshToken);

  const currentlyPlaying = await fetchCurrentlyPlaying(accessToken);
  if (currentlyPlaying) {
    return currentlyPlaying;
  }

  const recentlyPlayed = await fetchRecentlyPlayed(accessToken);
  if (recentlyPlayed) {
    return recentlyPlayed;
  }

  throw new Error('No Spotify playback data available');
}
