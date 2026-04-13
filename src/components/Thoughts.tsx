import React from 'react';
import { motion } from 'framer-motion';

const Thoughts: React.FC = () => {
  return (
    <section
      id="thoughts"
      className="flex h-full min-h-0 items-center justify-center px-4 sm:px-8 lg:px-12"
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center text-lg text-black/70 sm:text-xl"
      >
        Blog coming soon!
      </motion.p>
    </section>
  );
};

export default Thoughts;
