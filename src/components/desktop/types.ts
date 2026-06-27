export type WindowKind = 'finder' | 'terminal';

export interface DesktopWindow {
  /** Stable id. Folder windows reuse `finder-<folderId>`; the terminal is a singleton. */
  id: string;
  kind: WindowKind;
  title: string;
  /** Index at spawn time — drives the staggered open position (stable across re-stacking). */
  spawnIndex: number;
  /** Which desktop folder this Finder window represents (e.g. `projects`). */
  folderId?: string;
}

export interface FolderItem {
  id: string;
  label: string;
}

/** Desktop folders mapped to virtual-filesystem entry points. */
export const FOLDERS: FolderItem[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'books', label: 'My Books' },
  { id: 'papers', label: 'Papers' },
];
