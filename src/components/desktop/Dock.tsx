import React from 'react';
import { motion } from 'framer-motion';
import { DesktopWindow } from './types';

interface DockProps {
  onOpenFinder: () => void;
  onOpenTerminal: () => void;
  onOpenPortfolio: () => void;
  minimized: DesktopWindow[];
  onRestore: (id: string) => void;
}

const APP_ICONS = [
  { id: 'finder', label: 'Finder', src: '/finder-icon.png' },
  { id: 'notes', label: 'Notes', src: '/notes-icon.png' },
  { id: 'spotify', label: 'Music', src: '/spotify-icon.png' },
  { id: 'photos', label: 'Photos', src: '/photos-icon.png' },
  { id: 'reminders', label: 'Reminders', src: '/reminders-icon.png' },
  { id: 'terminal', label: 'Terminal', src: '/terminal-icon.png' },
];

const DockButton: React.FC<{
  label: string;
  src: string;
  onClick?: () => void;
  showIndicator?: boolean;
}> = ({ label, src, onClick, showIndicator }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.32, y: -10 }}
    whileTap={{ scale: 1.12 }}
    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
    className="group relative h-16 w-16 origin-bottom"
    aria-label={label}
  >
    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/70 px-2 py-0.5 text-[11px] text-white opacity-0 backdrop-blur transition-opacity duration-150 group-hover:opacity-100">
      {label}
    </span>
    <img src={src} alt="" className="h-full w-full object-contain" draggable={false} />
    {showIndicator && (
      <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-black/55" />
    )}
  </motion.button>
);

const Dock: React.FC<DockProps> = ({
  onOpenFinder,
  onOpenTerminal,
  onOpenPortfolio,
  minimized,
  onRestore,
}) => {
  const onAppClick: Record<string, (() => void) | undefined> = {
    finder: onOpenFinder,
    terminal: onOpenTerminal,
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-[55] flex justify-center">
      <div className="pointer-events-auto flex items-end gap-2.5 rounded-2xl border border-white/25 bg-white/15 px-3 py-2 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <DockButton label="Portfolio" src="/safari-icon.png" onClick={onOpenPortfolio} />
        <span className="mx-0.5 h-14 w-px self-center bg-white/25" />
        {APP_ICONS.map((app) => (
          <DockButton key={app.id} label={app.label} src={app.src} onClick={onAppClick[app.id]} />
        ))}

        {minimized.length > 0 && (
          <>
            <span className="mx-0.5 h-14 w-px self-center bg-white/25" />
            {minimized.map((win) => (
              <DockButton
                key={win.id}
                label={win.title}
                src={win.kind === 'terminal' ? '/terminal-icon.png' : '/finder-icon.png'}
                onClick={() => onRestore(win.id)}
                showIndicator
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Dock;
