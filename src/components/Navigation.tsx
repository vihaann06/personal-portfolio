import React from 'react';

interface NavigationProps {
  activeTab: 'home' | 'experience' | 'projects' | 'contact';
  setActiveTab: (tab: 'home' | 'experience' | 'projects' | 'contact') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home' as const, label: 'Home' },
    { id: 'experience' as const, label: 'Experience' },
    { id: 'projects' as const, label: 'Projects' },
    { id: 'contact' as const, label: 'Contact' }
  ];

  return (
    <nav className="bg-transparent mt-5">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-4 lg:translate-x-16">
        <div className="flex items-center h-16">
          <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-black/10 bg-white/55 backdrop-blur">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-black text-white shadow-[0_10px_25px_rgba(0,0,0,0.2)]'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 