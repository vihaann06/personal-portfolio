import http from 'node:http';
import { config } from 'dotenv';
import { getSpotifyTrack } from '../shared/spotify/getSpotifyTrack';

config();

const PORT = Number(process.env.SPOTIFY_DEV_PORT ?? 3001);

const server = http.createServer(async (req, res) => {
  const path = req.url?.split('?')[0] ?? '';
  const isSpotifyRoute = path === '/api/spotify' || path === '/api/spotify/' || path === '/' || path === '';

  if (!isSpotifyRoute) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  try {
    const track = await getSpotifyTrack();
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    });
    res.end(JSON.stringify(track));
  } catch (error) {
    console.error('[spotify-dev]', error);
    const message = error instanceof Error ? error.message : 'Unable to fetch Spotify playback data';
    const statusCode = message.includes('not configured') ? 500 : message.includes('No Spotify') ? 404 : 502;
    res.writeHead(statusCode, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    });
    res.end(JSON.stringify({ error: message }));
  }
});

server.listen(PORT, () => {
  console.log(`Spotify dev API listening on http://localhost:${PORT}/api/spotify`);
});
