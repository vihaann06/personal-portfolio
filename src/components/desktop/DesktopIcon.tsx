import React from 'react';

interface DesktopIconProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  /** Optional — folders without a handler are inert placeholders for now. */
  onOpen?: () => void;
}

/** A desktop folder: a click selects and opens it (if wired). */
const DesktopIcon: React.FC<DesktopIconProps> = ({ label, selected, onSelect, onOpen }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onSelect();
      onOpen?.();
    }}
    className="group flex w-24 flex-col items-center gap-1 rounded-lg p-1.5 text-center outline-none"
  >
    <span
      className={`rounded-lg p-1 transition-colors ${
        selected ? 'bg-white/20' : 'group-hover:bg-white/10'
      }`}
    >
      <img
        src="/folder-icon.png"
        alt=""
        className="h-16 w-16 object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]"
        draggable={false}
      />
    </span>
    <span
      className={`max-w-[6rem] rounded px-1.5 text-[13px] font-medium leading-tight text-white ${
        selected ? 'bg-[#1f7ae0]' : ''
      }`}
      style={{ textShadow: selected ? 'none' : '0 1px 2px rgba(0,0,0,0.5)' }}
    >
      {label}
    </span>
  </button>
);

export default DesktopIcon;
