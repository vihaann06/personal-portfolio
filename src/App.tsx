import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Thoughts from './components/Thoughts';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'experience' | 'projects' | 'contact'>('home');
  const [profileMode, setProfileMode] = useState<'personal' | 'professional'>('professional');

  return (
    <div className="min-h-screen bg-[#f8f7f3] text-black overflow-hidden relative">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.08),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-50 mix-blend-multiply bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:140px_140px]" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full border border-black/5" />
      </div>

      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profileMode={profileMode}
        setProfileMode={setProfileMode}
      />

      <main className="relative">
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
      </main>
    </div>
  );
};

export default Portfolio;