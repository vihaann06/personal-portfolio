import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1] as const;

const Thoughts: React.FC = () => {
  const reducedMotion = useReducedMotion() === true;

  return (
    <section
      id="thoughts"
      className="flex h-full min-h-0 items-center justify-center px-4 sm:px-8 lg:px-12"
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="text-[0.55rem] uppercase tracking-[0.5em] text-black/40"
        >
          Thoughts
        </motion.p>
        <motion.div
          initial={reducedMotion ? false : { scaleX: 0 }}
          animate={reducedMotion ? undefined : { scaleX: 1 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          className="h-px w-16 origin-center bg-black/20"
          aria-hidden
        />
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
          className="text-lg text-black/70 sm:text-xl"
        >
          Blog coming soon!
        </motion.p>
      </div>
    </section>
  );
};

export default Thoughts;
