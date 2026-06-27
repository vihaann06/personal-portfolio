import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Desktop from './components/desktop/Desktop';
import Portfolio from './components/Portfolio';

type View = 'portfolio' | 'desktop';

const App: React.FC = () => {
  const [view, setView] = useState<View>('portfolio');

  return (
    <>
      {/* The macOS desktop is always the world behind the portfolio app. */}
      <Desktop onOpenPortfolio={() => setView('portfolio')} />

      {/* initial={false} keeps the very first paint instant (it IS the landing page);
          re-opening from the desktop then genies up out of the dock. */}
      <AnimatePresence initial={false}>
        {view === 'portfolio' && (
          <motion.div
            key="portfolio"
            className="fixed inset-0 z-[80] overflow-hidden"
            style={{ transformOrigin: 'bottom center' }}
            initial={{ scale: 0.18, y: '46%', opacity: 0, borderRadius: 28 }}
            animate={{ scale: 1, y: 0, opacity: 1, borderRadius: 0 }}
            exit={{ scale: 0.18, y: '46%', opacity: 0, borderRadius: 28 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Portfolio onClose={() => setView('desktop')} onMinimize={() => setView('desktop')} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
