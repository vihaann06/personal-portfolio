import React from 'react';
import { AirVent, Clock, Folder, LayoutGrid, Monitor } from 'lucide-react';

const SIDEBAR = [
  { label: 'AirDrop', icon: AirVent },
  { label: 'Recents', icon: Clock },
  { label: 'Applications', icon: LayoutGrid },
  { label: 'Desktop', icon: Monitor },
  { label: 'Documents', icon: Folder },
];

interface FinderWindowProps {
  label: string;
}

/** Template Finder body — sidebar chrome plus an empty content pane. */
const FinderWindow: React.FC<FinderWindowProps> = ({ label }) => (
  <div className="flex h-full bg-[#ececec]/95">
    <aside className="w-44 shrink-0 border-r border-black/10 bg-black/[0.04] p-3">
      <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-black/35">
        Favorites
      </p>
      <ul className="space-y-0.5">
        {SIDEBAR.map(({ label: item, icon: Icon }) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-md px-2 py-1 text-[13px] text-black/65 hover:bg-black/5"
          >
            <Icon size={14} className="text-[#1f7ae0]" />
            {item}
          </li>
        ))}
      </ul>
    </aside>

    <div className="flex flex-1 flex-col">
      <div className="flex h-7 shrink-0 items-center border-b border-black/10 px-3 text-[12px] font-medium text-black/55">
        {label}
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-black/30">
        <Folder size={40} className="text-black/15" />
        <p className="text-[13px]">This folder is empty</p>
      </div>
    </div>
  </div>
);

export default FinderWindow;
