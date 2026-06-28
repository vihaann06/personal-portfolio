import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Dock from './Dock';
import DesktopIcon from './DesktopIcon';
import WindowFrame from './WindowFrame';
import TerminalWindow from './TerminalWindow';
import FinderWindow from './FinderWindow';
import SpotifyWindow from './SpotifyWindow';
import { DesktopWindow, FOLDERS, WindowKind } from './types';

const WINDOW_SIZES: Record<WindowKind, { width: number; height: number }> = {
  finder: { width: 660, height: 440 },
  terminal: { width: 640, height: 400 },
  spotify: { width: 680, height: 360 },
};


interface DesktopProps {
  /** Re-opens the portfolio app (the desktop is the meta-world it lives in). */
  onOpenPortfolio: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ onOpenPortfolio }) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const spawnCounter = useRef(0);

  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [minimizedIds, setMinimizedIds] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [spotifyFetchKey, setSpotifyFetchKey] = useState(0);

  const focusWindow = useCallback((id: string) => {
    setFocusedId(id);
    setWindows((prev) => {
      const target = prev.find((w) => w.id === id);
      if (!target || prev[prev.length - 1]?.id === id) return prev;
      return [...prev.filter((w) => w.id !== id), target];
    });
  }, []);

  const openWindow = useCallback(
    (id: string, kind: WindowKind, title: string, folderId?: string) => {
      setMinimizedIds((prev) => prev.filter((m) => m !== id));
      setWindows((prev) => {
        if (prev.some((w) => w.id === id)) return prev;
        return [...prev, { id, kind, title, folderId, spawnIndex: spawnCounter.current++ % 6 }];
      });
      setFocusedId(id);
    },
    [],
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setMinimizedIds((prev) => prev.filter((m) => m !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setMinimizedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setFocusedId((prev) => (prev === id ? null : prev));
  }, []);

  const restoreWindow = useCallback(
    (id: string) => {
      setMinimizedIds((prev) => prev.filter((m) => m !== id));
      focusWindow(id);
    },
    [focusWindow],
  );

  const openFolder = (folderId: string, label: string) =>
    openWindow(`finder-${folderId}`, 'finder', label, folderId);

  const openTerminal = () => openWindow('terminal', 'terminal', 'vihaan — -zsh — 80×24');

  const openSpotify = () => {
    const id = 'spotify';
    setSpotifyFetchKey((key) => key + 1);

    if (windows.some((w) => w.id === id)) {
      if (minimizedIds.includes(id)) restoreWindow(id);
      else focusWindow(id);
      return;
    }

    openWindow(id, 'spotify', "Vihaan's Recently Played");
  };

  const windowVariant = (kind: WindowKind): 'light' | 'terminal' | 'spotify' => {
    if (kind === 'terminal') return 'terminal';
    if (kind === 'spotify') return 'spotify';
    return 'light';
  };

  return (
    <div
      className="desktop-root fixed inset-0 overflow-hidden select-none bg-cover bg-center"
      style={{ backgroundImage: 'url("/27-Golden-Gate.png")' }}
      onMouseDown={(event) => {
        if (event.target !== event.currentTarget) return;
        setSelectedIcon(null);
        setFocusedId(null);
      }}
    >
      {/* Desktop icons — anchored top-left */}
      <div className="absolute left-3 top-4 z-10 flex flex-col items-center gap-2.5">
        {FOLDERS.map((folder) => (
          <DesktopIcon
            key={folder.id}
            label={folder.label}
            selected={selectedIcon === folder.id}
            onSelect={() => setSelectedIcon(folder.id)}
            onOpen={() => openFolder(folder.id, folder.label)}
          />
        ))}
      </div>

      {/* Window layer */}
      <div ref={constraintsRef} className="pointer-events-none absolute inset-0 z-20">
        <AnimatePresence>
          {windows.map((win, index) => (
            <WindowFrame
              key={win.id}
              title={win.title}
              spawnIndex={win.spawnIndex}
              zIndex={(focusedId === win.id ? 100 : 30) + index}
              isFocused={focusedId === win.id}
              width={WINDOW_SIZES[win.kind].width}
              height={WINDOW_SIZES[win.kind].height}
              variant={windowVariant(win.kind)}
              minimized={minimizedIds.includes(win.id)}
              constraintsRef={constraintsRef}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              {win.kind === 'terminal' ? (
                <TerminalWindow />
              ) : win.kind === 'spotify' ? (
                <SpotifyWindow key={spotifyFetchKey} />
              ) : (
                <FinderWindow folderId={win.folderId} />
              )}
            </WindowFrame>
          ))}
        </AnimatePresence>
      </div>

      <Dock
        onOpenFinder={() => openFolder('home', 'Finder')}
        onOpenTerminal={openTerminal}
        onOpenSpotify={openSpotify}
        spotifyActive={windows.some((w) => w.id === 'spotify')}
        onOpenPortfolio={onOpenPortfolio}
        minimized={windows.filter((w) => minimizedIds.includes(w.id))}
        onRestore={restoreWindow}
      />
    </div>
  );
};

export default Desktop;
