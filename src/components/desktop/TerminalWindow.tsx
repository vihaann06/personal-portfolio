import React from 'react';

const loginStamp = () =>
  new Date().toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

/** Template terminal body — chrome and a live prompt, no command handling yet. */
const TerminalWindow: React.FC = () => (
  <div className="h-full bg-[#1b1b1d]/95 px-4 py-3 font-mono text-[13px] leading-relaxed text-[#e6e6e6]">
    <p className="text-white/45">Last login: {loginStamp()} on ttys000</p>
    <div className="mt-1 flex items-center">
      <span className="text-[#7aa2f7]">vihaan@portfolio</span>
      <span className="text-white/55">:</span>
      <span className="text-[#37d67a]">~</span>
      <span className="text-white/80">&nbsp;%&nbsp;</span>
      <span className="terminal-cursor inline-block h-[15px] w-[7px] translate-y-[2px] bg-[#e6e6e6]" />
    </div>
    <p className="mt-4 text-[12px] text-white/30">
      {/* command interpreter wires up later */}
      portfolio shell — type a command to navigate (coming soon)
    </p>
  </div>
);

export default TerminalWindow;
