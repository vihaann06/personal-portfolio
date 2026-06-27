import React from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeTab: 'home' | 'experience' | 'projects' | 'contact';
  setActiveTab: (tab: 'home' | 'experience' | 'projects' | 'contact') => void;
}

const pillSpring = { type: 'spring', stiffness: 430, damping: 34, mass: 0.9 } as const;

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home' as const, label: 'Home' },
    { id: 'experience' as const, label: 'Experience' },
    { id: 'projects' as const, label: 'Projects' },
    { id: 'contact' as const, label: 'Contact' },
  ];

  return (
    <nav className="bg-transparent mt-5 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 pt-4">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center gap-1.5 px-2.5 py-2 border border-black/15 bg-white/70 backdrop-blur rounded-full">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 text-[0.75rem] uppercase tracking-[0.22em] rounded-full transition-colors duration-300 ${
                    isActive ? '' : 'hover:bg-black/5'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={pillSpring}
                      className="absolute inset-0 rounded-full bg-black shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
                      aria-hidden
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-black/60 hover:text-black'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
