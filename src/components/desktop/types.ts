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

/** Each portfolio section lives in its own desktop folder. Contents come later. */
export const FOLDERS: FolderItem[] = [
  { id: 'about', label: 'About Me' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
