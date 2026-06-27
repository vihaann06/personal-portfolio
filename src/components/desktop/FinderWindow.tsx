import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Folder, Home, X } from 'lucide-react';
import { nodeAtPath, VNode } from './filesystem';

interface FinderWindowProps {
  folderId?: string;
}

/** Where each desktop entry point lands in the virtual filesystem. */
const FOLDER_PATHS: Record<string, string[]> = {
  home: [],
  projects: ['Projects'],
  books: ['My Books'],
  papers: ['Papers'],
};

const SIDEBAR: { label: string; path: string[]; home?: boolean }[] = [
  { label: 'vihaan', path: [], home: true },
  { label: 'Projects', path: ['Projects'] },
  { label: 'My Books', path: ['My Books'] },
  { label: 'Papers', path: ['Papers'] },
];

/** Links without a file extension behave like folders (e.g. project repos). */
const isFolderLink = (node: VNode) => node.type === 'link' && !node.name.includes('.');

const fileIconSrc = (name: string) => {
  const ext = name.includes('.') ? name.split('.').pop()!.toLowerCase() : '';
  return ext === 'pdf' ? '/pdf-file-icon.png' : '/text-file-icon.png';
};

const FileGlyph: React.FC<{ name: string }> = ({ name }) => (
  <img
    src={fileIconSrc(name)}
    alt=""
    className="h-14 w-14 object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
    draggable={false}
  />
);

const FinderItem: React.FC<{
  node: VNode;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}> = ({ node, selected, onSelect, onOpen }) => {
  const asFolder = node.type === 'dir' || isFolderLink(node);
  const title =
    node.type === 'link' ? `Open ${node.name}` : node.type === 'dir' ? `Open ${node.name}` : node.name;
  return (
    <button
      title={title}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      className="group flex w-[92px] flex-col items-center gap-1 rounded-lg p-1.5 text-center outline-none"
    >
      <span className={`rounded-lg p-1 transition-colors ${selected ? 'bg-black/10' : 'group-hover:bg-black/5'}`}>
        {asFolder ? (
          <img
            src="/folder-icon.png"
            alt=""
            className="h-14 w-14 object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
            draggable={false}
          />
        ) : (
          <FileGlyph name={node.name} />
        )}
      </span>
      <span
        className={`max-w-[88px] truncate rounded px-1.5 text-[12px] font-medium leading-tight ${
          selected ? 'bg-[#1f7ae0] text-white' : 'text-black/80'
        }`}
      >
        {node.name}
      </span>
    </button>
  );
};

const QuickLook: React.FC<{ node: Extract<VNode, { type: 'file' }>; onClose: () => void }> = ({
  node,
  onClose,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 p-6 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-xl border border-black/10 bg-[#fbfbfb] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex h-9 shrink-0 items-center justify-between border-b border-black/10 px-3">
          <span className="text-[12px] font-semibold text-black/70">{node.name}</span>
          <button onClick={onClose} className="rounded p-1 text-black/40 hover:bg-black/5 hover:text-black/70">
            <X size={14} />
          </button>
        </div>
        <pre className="overflow-auto whitespace-pre-wrap px-4 py-3 font-mono text-[12px] leading-relaxed text-black/75">
          {node.content}
        </pre>
      </div>
    </div>
  );
};

const FinderWindow: React.FC<FinderWindowProps> = ({ folderId }) => {
  const initial = FOLDER_PATHS[folderId ?? 'home'] ?? [];
  const [history, setHistory] = useState<string[][]>([initial]);
  const [hi, setHi] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<Extract<VNode, { type: 'file' }> | null>(null);

  const path = history[hi];
  const current = nodeAtPath(path);
  const allEntries = current && current.type === 'dir' ? current.children : [];
  // Hidden in Finder (still reachable from the terminal).
  const entries = allEntries.filter((node) => node.name !== 'README.txt');
  const folderName = path.length ? path[path.length - 1] : 'vihaan';

  const navigate = (to: string[]) => {
    setHistory((prev) => [...prev.slice(0, hi + 1), to]);
    setHi((i) => i + 1);
    setSelected(null);
  };

  const openNode = (node: VNode) => {
    if (node.type === 'dir') {
      navigate([...path, node.name]);
    } else if (node.type === 'link') {
      window.open(node.url, '_blank', 'noopener,noreferrer');
    } else {
      setPreview(node);
    }
  };

  const canBack = hi > 0;
  const canForward = hi < history.length - 1;
  const pathsEqual = (a: string[], b: string[]) => a.length === b.length && a.every((s, i) => s === b[i]);

  return (
    <div className="relative flex h-full bg-[#ececec]/95">
      <aside className="w-44 shrink-0 border-r border-black/10 bg-black/[0.04] p-3">
        <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-black/35">
          Favorites
        </p>
        <ul className="space-y-0.5">
          {SIDEBAR.map((item) => {
            const active = pathsEqual(item.path, path);
            return (
              <li key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-[13px] transition-colors ${
                    active ? 'bg-[#1f7ae0] text-white' : 'text-black/70 hover:bg-black/5'
                  }`}
                >
                  {item.home ? (
                    <Home size={14} className={active ? 'text-white' : 'text-[#1f7ae0]'} />
                  ) : (
                    <Folder size={14} className={active ? 'text-white' : 'text-[#1f7ae0]'} />
                  )}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-black/10 px-3">
          <button
            onClick={() => canBack && setHi((i) => i - 1)}
            disabled={!canBack}
            className={`rounded p-0.5 ${canBack ? 'text-black/55 hover:bg-black/5' : 'text-black/20'}`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => canForward && setHi((i) => i + 1)}
            disabled={!canForward}
            className={`rounded p-0.5 ${canForward ? 'text-black/55 hover:bg-black/5' : 'text-black/20'}`}
          >
            <ChevronRight size={16} />
          </button>
          <span className="text-[13px] font-semibold text-black/70">{folderName}</span>
          <span className="ml-auto text-[11px] text-black/35">
            {entries.length} {entries.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div
          className="flex flex-1 flex-wrap content-start gap-1 overflow-auto p-3"
          onMouseDown={() => setSelected(null)}
        >
          {entries.length === 0 ? (
            <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 text-black/30">
              <Folder size={40} className="text-black/15" />
              <p className="text-[13px]">This folder is empty</p>
            </div>
          ) : (
            entries.map((node) => (
              <FinderItem
                key={node.name}
                node={node}
                selected={selected === node.name}
                onSelect={() => setSelected(node.name)}
                onOpen={() => openNode(node)}
              />
            ))
          )}
        </div>
      </div>

      {preview && <QuickLook node={preview} onClose={() => setPreview(null)} />}
    </div>
  );
};

export default FinderWindow;
