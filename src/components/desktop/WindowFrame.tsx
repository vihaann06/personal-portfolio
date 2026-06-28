import React from 'react';
import { motion, useDragControls } from 'framer-motion';

interface WindowFrameProps {
  title: string;
  /** Stable spawn index — drives the staggered open position. */
  spawnIndex: number;
  zIndex: number;
  isFocused: boolean;
  width: number;
  height: number;
  variant?: 'light' | 'terminal' | 'spotify';
  minimized: boolean;
  constraintsRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

const TrafficLight: React.FC<{ color: string; glyph: string; onClick?: (e: React.MouseEvent) => void }> = ({
  color,
  glyph,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex h-3 w-3 items-center justify-center rounded-full ${color} text-[8px] font-bold leading-none text-black/55`}
    style={{ textShadow: '0 0 1px rgba(0,0,0,0.2)' }}
  >
    {glyph}
  </button>
);

const WindowFrame: React.FC<WindowFrameProps> = ({
  title,
  spawnIndex,
  zIndex,
  isFocused,
  width,
  height,
  variant = 'light',
  minimized,
  constraintsRef,
  onClose,
  onMinimize,
  onFocus,
  children,
}) => {
  const dragControls = useDragControls();
  const isDark = variant === 'terminal' || variant === 'spotify';

  return (
    <motion.div
      drag={!minimized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0}
      onMouseDownCapture={onFocus}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{
        opacity: minimized ? 0 : 1,
        scale: minimized ? 0.2 : 1,
      }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: minimized ? 0.32 : 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        left: 120 + spawnIndex * 32,
        top: 64 + spawnIndex * 30,
        width,
        height,
        zIndex,
        transformOrigin: 'bottom center',
        pointerEvents: minimized ? 'none' : 'auto',
      }}
      className={`flex flex-col overflow-hidden rounded-xl backdrop-blur-2xl ${
        isDark ? 'bg-[#1b1b1d]/95' : 'bg-[#ececec]/95'
      } ${
        isFocused
          ? 'border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.45)]'
          : 'border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.30)]'
      }`}
    >
      <div
        onPointerDown={(event) => dragControls.start(event)}
        onDoubleClick={() => undefined}
        className={`flex h-9 shrink-0 cursor-default select-none items-center px-3.5 ${
          isDark ? 'bg-[#2b2b2d]/95' : 'bg-[#e2e2e2]/95'
        }`}
      >
        <div className="group/lights flex items-center gap-2">
          <TrafficLight
            color="bg-[#ff5f57]"
            glyph="×"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
          <TrafficLight
            color="bg-[#febc2e]"
            glyph="−"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
          />
          <TrafficLight color="bg-[#28c840]" glyph="+" />
        </div>

        <span
          className={`mx-auto pr-[52px] text-[13px] font-medium ${
            isDark ? 'text-white/65' : 'text-black/65'
          }`}
        >
          {title}
        </span>
      </div>

      <div className={`min-h-0 flex-1 ${variant === 'spotify' ? 'overflow-hidden' : 'overflow-auto'}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default WindowFrame;
