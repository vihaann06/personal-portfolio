export type WindowKind = 'finder' | 'terminal';

export interface DesktopWindow {
  /** Stable id. Folder windows reuse `finder-<folderId>`; the terminal is a singleton. */
  id: string;
  kind: WindowKind;
  title: string;
  /** Index at spawn time — drives the staggered open position (stable across re-stacking). */
  spawnIndex: number;
}

export interface FolderItem {
  id: string;
  label: string;
}

/** Desktop folders. Contents (projects, writing, papers) come later. */
export const FOLDERS: FolderItem[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'papers', label: 'Papers' },
];
