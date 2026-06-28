import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useSpotify } from '../../hooks/useSpotify';

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.max(0, Math.floor(diffMs / 60_000));

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

function formatMs(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function useLiveProgress(
  isPlaying: boolean,
  progressMs: number | undefined,
  durationMs: number | undefined,
  trackKey: string,
) {
  const [progress, setProgress] = useState(progressMs ?? 0);

  useEffect(() => {
    if (!isPlaying || progressMs == null || durationMs == null) {
      setProgress(progressMs ?? 0);
      return;
    }

    const startedAt = Date.now();
    const baseProgress = progressMs;

    const tick = () => {
      const elapsed = Date.now() - startedAt;
      setProgress(Math.min(baseProgress + elapsed, durationMs));
    };

    tick();
    const intervalId = window.setInterval(tick, 500);
    return () => window.clearInterval(intervalId);
  }, [isPlaying, progressMs, durationMs, trackKey]);

  return progress;
}

const SpotifyWindow: React.FC = () => {
  const { song, loading, error } = useSpotify();
  const trackKey = song ? `${song.title}-${song.artists}` : '';
  const liveProgress = useLiveProgress(
    song?.isPlaying ?? false,
    song?.progressMs,
    song?.durationMs,
    trackKey,
  );

  const progressRatio =
    song?.isPlaying && song.durationMs
      ? Math.min(100, (liveProgress / song.durationMs) * 100)
      : 0;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#121212] text-white">
      {/* App header */}
      <div className="flex shrink-0 items-center gap-3.5 border-b border-white/10 px-6 py-4">
        <img src="/spotify-icon.png" alt="" className="h-7 w-7 object-contain" draggable={false} />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
            Vihaan&apos;s Recently Played
          </p>
          <p className="mt-0.5 truncate text-[13px] font-medium text-white/75">
            {loading ? 'Loading…' : song?.isPlaying ? 'Now playing on Spotify' : 'Last played on Spotify'}
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 items-center overflow-hidden px-7 py-6">
        {loading && !song && (
          <div className="flex w-full items-center gap-8 animate-pulse">
            <div className="h-[12.5rem] w-[12.5rem] shrink-0 rounded-xl bg-white/10" />
            <div className="min-w-0 flex-1 space-y-4">
              <div className="h-5 w-3/5 rounded bg-white/10" />
              <div className="h-4 w-2/5 rounded bg-white/10" />
              <div className="h-3 w-1/3 rounded bg-white/10" />
            </div>
          </div>
        )}

        {error && (
          <div className="flex w-full items-center gap-6">
            <img src="/spotify-icon.png" alt="" className="h-16 w-16 shrink-0 opacity-30" draggable={false} />
            <div className="min-w-0">
              <p className="text-[15px] font-medium text-white/85">Couldn&apos;t load Vihaan&apos;s music</p>
              <p className="mt-1.5 text-[13px] text-white/45">
                {error === 'Not found' ? 'Music service unavailable — restart with npm start' : error}
              </p>
            </div>
          </div>
        )}

        {!loading && !error && !song && (
          <div className="flex w-full items-center gap-6">
            <img src="/spotify-icon.png" alt="" className="h-16 w-16 shrink-0 opacity-30" draggable={false} />
            <div className="min-w-0">
              <p className="text-[15px] font-medium text-white/85">Nothing in Vihaan&apos;s recent rotation</p>
              <p className="mt-1.5 text-[13px] text-white/45">Play something on Spotify and check back.</p>
            </div>
          </div>
        )}

        {song && (
          <div className="flex w-full min-w-0 items-center gap-8">
            {song.albumArtUrl ? (
              <img
                src={song.albumArtUrl}
                alt={`${song.album} cover art`}
                className="h-[12.5rem] w-[12.5rem] shrink-0 rounded-xl object-cover shadow-[0_16px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
                draggable={false}
              />
            ) : (
              <div className="flex h-[12.5rem] w-[12.5rem] shrink-0 items-center justify-center rounded-xl bg-white/10 text-4xl">
                ♪
              </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
              <div className="min-w-0">
                <h2 className="truncate text-[22px] font-semibold leading-tight text-white">{song.title}</h2>
                <p className="mt-1.5 truncate text-[15px] text-white/60">{song.artists}</p>
                <p className="mt-1 truncate text-[13px] text-white/40">{song.album}</p>
                {!song.isPlaying && song.playedAt && (
                  <p className="mt-2.5 text-[12px] text-white/35">
                    Vihaan played this {formatRelativeTime(song.playedAt)}
                  </p>
                )}
              </div>

              {song.isPlaying && song.durationMs != null && (
                <div className="w-full max-w-md">
                  <div className="h-1 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-[#1db954] transition-[width] duration-500 ease-linear"
                      style={{ width: `${progressRatio}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] tabular-nums text-white/35">
                    <span>{formatMs(liveProgress)}</span>
                    <span>{formatMs(song.durationMs)}</span>
                  </div>
                </div>
              )}

              <a
                href={song.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-[12px] font-medium text-white/80 transition-colors hover:border-white/25 hover:bg-white/15"
              >
                Open in Spotify
                <ExternalLink size={13} className="opacity-60" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyWindow;
