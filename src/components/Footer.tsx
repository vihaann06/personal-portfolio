import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

    return (
    <footer className="border-t border-black/10 bg-white/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-4 text-sm text-black/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.5em] text-black/50">Staying monochrome</p>
          <p className="text-xs uppercase tracking-[0.4em] text-black/50">© {year} Vihaan Gupta</p>
        </div>
        <p>
          Built with curiosity, a minimalist palette, and a steady stream of espresso.
          </p>
        </div>
      </footer>
  );
};

export default Footer;