import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="relative top-12 left-0 right-0 z-50 bottom-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-10">
            {['Experience', 'Projects', 'Education', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-500 hover:text-white hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] transition-all duration-300 relative group text-lg font-medium"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 