import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Dock from './Dock';
import DesktopIcon from './DesktopIcon';
import WindowFrame from './WindowFrame';
import TerminalWindow from './TerminalWindow';
import FinderWindow from './FinderWindow';
import { DesktopWindow, FOLDERS, WindowKind } from './types';

const WINDOW_SIZES: Record<WindowKind, { width: number; height: number }> = {
  finder: { width: 580, height: 380 },
  terminal: { width: 640, height: 400 },
};

const Desktop: React.FC = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const spawnCounter = useRef(0);

  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const focusWindow = useCallback((id: string) => {
    setFocusedId(id);
    setWindows((prev) => {
      const target = prev.find((w) => w.id === id);
      if (!target || prev[prev.length - 1]?.id === id) return prev;
      return [...prev.filter((w) => w.id !== id), target];
    });
  }, []);

  const openWindow = useCallback(
    (id: string, kind: WindowKind, title: string) => {
      setWindows((prev) => {
        if (prev.some((w) => w.id === id)) return prev;
        return [...prev, { id, kind, title, spawnIndex: spawnCounter.current++ % 6 }];
      });
      setFocusedId(id);
    },
    [],
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const openFolder = (folderId: string, label: string) =>
    openWindow(`finder-${folderId}`, 'finder', label);

  const openTerminal = () => openWindow('terminal', 'terminal', 'vihaan — -zsh — 80×24');

  return (
    <div
      className="desktop-root fixed inset-0 overflow-hidden select-none bg-cover bg-center"
      style={{ backgroundImage: 'url("/27-Golden-Gate.png")' }}
      onMouseDown={() => {
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
              variant={win.kind === 'terminal' ? 'terminal' : 'light'}
              constraintsRef={constraintsRef}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              {win.kind === 'terminal' ? (
                <TerminalWindow />
              ) : (
                <FinderWindow label={win.title} />
              )}
            </WindowFrame>
          ))}
        </AnimatePresence>
      </div>

      <Dock
        onOpenFinder={() => openFolder('about', 'About Me')}
        onOpenTerminal={openTerminal}
      />
    </div>
  );
};

export default Desktop;
