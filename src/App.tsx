import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Thoughts from './components/Thoughts';
import Intro from './components/Intro';

const easeOut = [0.16, 1, 0.3, 1] as const;

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'experience' | 'projects' | 'contact'>('home');
  const [profileMode, setProfileMode] = useState<'personal' | 'professional'>('professional');
  const reducedMotion = useReducedMotion() === true;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.4 });

  return (
    <div className="min-h-screen bg-[#f8f7f3] text-black overflow-hidden relative">
      <Intro />
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

      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profileMode={profileMode}
        setProfileMode={setProfileMode}
      />

      <main className="relative">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0 })}>
          <motion.div
            key={`${activeTab}-${profileMode}`}
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
                <Hero profileMode={profileMode} />
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="min-h-[calc(100vh-5.5rem)] overflow-y-auto pb-16">
                <Experience profileMode={profileMode} />
              </div>
            )}

            {activeTab === 'projects' && (
              <div
                className={
                  profileMode === 'professional'
                    ? 'min-h-[calc(100vh-5.5rem)] overflow-y-auto pb-16'
                    : 'h-[calc(100vh-5.5rem)] overflow-hidden'
                }
              >
                {profileMode === 'professional' ? <Projects /> : <Thoughts />}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="h-[calc(100vh-5.5rem)] overflow-hidden">
                <Contact profileMode={profileMode} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Portfolio;
