import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/** One-time-per-session curtain intro: name reveal, then the curtain lifts. */
const Intro: React.FC = () => {
  const reducedMotion = useReducedMotion() === true;
  const [show, setShow] = useState(() => {
    try {
      return !window.sessionStorage.getItem('vg-intro-seen');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!show) return;
    try {
      window.sessionStorage.setItem('vg-intro-seen', '1');
    } catch {
      // Private mode: the intro will just replay next visit.
    }
    const timer = window.setTimeout(() => setShow(false), 1500);
    return () => window.clearTimeout(timer);
  }, [show]);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '120%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="font-serif italic text-3xl text-[#f8f7f3] sm:text-4xl"
            >
              Vihaan Gupta
            </motion.p>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute bottom-8 text-[0.55rem] uppercase tracking-[0.5em] text-white/40"
          >
            Portfolio — 2026
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
