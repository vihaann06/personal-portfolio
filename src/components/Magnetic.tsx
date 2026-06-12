import React, { useRef } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  className?: string;
}

/** Wraps an element so it gently follows the cursor while hovered. */
const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.25, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() === true;
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.5 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.5 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
