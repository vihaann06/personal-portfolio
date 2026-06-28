import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import Navigation from './Navigation';
import Hero from './Hero';
import Projects from './Projects';
import Contact from './Contact';
import Experience from './Experience';
import Intro from './Intro';

const easeOut = [0.16, 1, 0.3, 1] as const;

interface PortfolioProps {
  /** Red traffic light — sends the app back to the desktop. */
  onClose: () => void;
  /** Yellow traffic light — minimises the app to the desktop. */
  onMinimize: () => void;
}

/** The macOS window chrome that reveals near the top edge, selling the "app" illusion. */
const WindowChrome: React.FC<PortfolioProps> = ({ onClose, onMinimize }) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setShown(e.clientY < 60);
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const Light: React.FC<{ color: string; glyph: string; title: string; onClick?: () => void }> = ({
    color,
    glyph,
    title,
    onClick,
  }) => (
    <button
      title={title}
      onClick={onClick}
      className={`group/light flex h-3.5 w-3.5 items-center justify-center rounded-full ${color}`}
    >
      <span className="text-[9px] font-bold leading-none text-black/55 opacity-0 transition-opacity group-hover/light:opacity-100">
        {glyph}
      </span>
    </button>
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[70]">
      <motion.div
        initial={false}
        animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : -12 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="pointer-events-auto absolute left-4 top-3 flex items-center gap-2 rounded-full border border-white/40 bg-white/55 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md"
      >
        <Light color="bg-[#ff5f57]" glyph="×" title="Close — back to desktop" onClick={onClose} />
        <Light color="bg-[#febc2e]" glyph="−" title="Minimise to desktop" onClick={onMinimize} />
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#28c840]" />
        <span className="ml-1.5 select-none text-[11px] font-medium tracking-tight text-black/55">
          Vihaan Gupta — Portfolio.app
        </span>
      </motion.div>
    </div>
  );
};

const Portfolio: React.FC<PortfolioProps> = ({ onClose, onMinimize }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'experience' | 'projects' | 'contact'>('home');
  const reducedMotion = useReducedMotion() === true;
  const scrollRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.4 });

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#f8f7f3] text-black">
      <Intro />
      <WindowChrome onClose={onClose} onMinimize={onMinimize} />

      {/* Reading progress hairline */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-black/80"
        style={{ scaleX: progress }}
        aria-hidden
      />
      <div className="grain-overlay" aria-hidden />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.08),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-50 mix-blend-multiply bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:140px_140px]" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full border border-black/5" />
        <motion.div
          className="absolute top-[10%] left-[6%] h-72 w-72 rounded-full bg-black/[0.04] blur-3xl"
          animate={reducedMotion ? undefined : { x: [0, 48, -24, 0], y: [0, -32, 24, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[16%] right-[8%] h-80 w-80 rounded-full bg-black/[0.05] blur-3xl"
          animate={reducedMotion ? undefined : { x: [0, -36, 22, 0], y: [0, 26, -20, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main ref={scrollRef} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => scrollRef.current?.scrollTo({ top: 0 })}
        >
          <motion.div
            key={activeTab}
            initial={reducedMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={
              reducedMotion
                ? undefined
                : { opacity: 0, y: -16, filter: 'blur(6px)', transition: { duration: 0.28, ease: 'easeIn' } }
            }
            transition={{ duration: 0.55, ease: easeOut }}
          >
            {activeTab === 'home' && (
              <div className="h-[calc(100vh-6.3rem)] overflow-hidden">
                <Hero />
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="pb-16">
                <Experience scrollContainerRef={scrollRef} />
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="pb-16">
                <Projects scrollContainerRef={scrollRef} />
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="h-[calc(100vh-5.5rem)] overflow-hidden">
                <Contact />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Portfolio;
