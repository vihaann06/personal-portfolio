import React from 'react';

interface NavigationProps {
  activeTab: 'home' | 'experience' | 'projects' | 'contact';
  setActiveTab: (tab: 'home' | 'experience' | 'projects' | 'contact') => void;
  profileMode: 'personal' | 'professional';
  setProfileMode: (mode: 'personal' | 'professional') => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  profileMode,
  setProfileMode,
}) => {
  const tabs = [
    { id: 'home' as const, label: 'Home' },
    { id: 'experience' as const, label: 'Experience' },
    { id: 'projects' as const, label: profileMode === 'professional' ? 'Projects' : 'Thoughts' },
    { id: 'contact' as const, label: 'Contact' }
  ];

  return (
    <nav className="bg-transparent mt-5">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 pt-4">
        <div className="flex items-center justify-between gap-4 h-16">
          <div className="flex items-center gap-1.5 px-2.5 py-2 border border-black/15 bg-white/70 backdrop-blur rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-[0.75rem] uppercase tracking-[0.22em] rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-black text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)]'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 px-2 py-2 border border-black/15 bg-white/70 backdrop-blur rounded-full">
            {(['personal', 'professional'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setProfileMode(mode)}
                className={`px-3 py-2 text-[0.68rem] uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
                  profileMode === mode
                    ? 'bg-black text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)]'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
                aria-pressed={profileMode === mode}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 