import React from 'react';
import { motion } from 'framer-motion';

interface DockItem {
  id: string;
  label: string;
  render: React.ReactNode;
  onClick?: () => void;
  trailing?: boolean;
}

interface DockProps {
  onOpenFinder: () => void;
  onOpenTerminal: () => void;
}

const Dock: React.FC<DockProps> = ({ onOpenFinder, onOpenTerminal }) => {
  const items: DockItem[] = [
    {
      id: 'finder',
      label: 'Finder',
      onClick: onOpenFinder,
      render: (
        <img
          src="/finder-icon.png"
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      ),
    },
    {
      id: 'terminal',
      label: 'Terminal',
      onClick: onOpenTerminal,
      render: (
        <img
          src="/terminal-icon.png"
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      ),
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-[55] flex justify-center">
      <div className="pointer-events-auto flex items-end gap-2.5 rounded-2xl border border-white/25 bg-white/15 px-3 py-2 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        {items.map((item, i) => (
          <React.Fragment key={item.id}>
            {item.trailing && <span className="mx-0.5 h-12 w-px self-center bg-white/25" />}
            <motion.button
              onClick={item.onClick}
              whileHover={{ scale: 1.32, y: -10 }}
              whileTap={{ scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="group relative h-16 w-16 origin-bottom"
              aria-label={item.label}
            >
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/70 px-2 py-0.5 text-[11px] text-white opacity-0 backdrop-blur transition-opacity duration-150 group-hover:opacity-100">
                {item.label}
              </span>
              {item.render}
            </motion.button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dock;
