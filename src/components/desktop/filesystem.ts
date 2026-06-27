import { PROJECTS } from './projects';

export type VNode =
  | { type: 'dir'; name: string; children: VNode[] }
  | { type: 'file'; name: string; content: string }
  | { type: 'link'; name: string; url: string };

const ABOUT = `Vihaan Gupta — builder @ Harvard studying CS + Philosophy.

Currently:
  - SDE Intern @ Amazon Web Services
  - TF for CS 1200 (Data Structures & Algorithms)
  - HCI researcher @ Variation Lab

Interests: distributed systems, human-centered tools, and philosophy.
Run \`ls Projects\` to see what I've been building.`;

const README = `vihaanOS — interactive shell

This is a tiny in-browser shell. A few things to try:
  ls                 list what's here
  cd Projects        enter the Projects folder
  open <project>     open a project on GitHub
  cat about.txt      read more about me
  help               see every command`;

const CONTACT = `Email   vihaangupta@college.harvard.edu
Phone   +1 (857) 829-8855
Place   Cambridge, MA`;

/** The virtual filesystem rooted at home (~). Mirrors the desktop. */
export const ROOT: VNode = {
  type: 'dir',
  name: '~',
  children: [
    {
      type: 'dir',
      name: 'Projects',
      children: PROJECTS.map((p) => ({ type: 'link', name: p.name, url: p.github } as VNode)),
    },
    {
      type: 'dir',
      name: 'My Books',
      children: [
        { type: 'dir', name: 'Computer Science', children: [] },
        { type: 'dir', name: 'Philosophy', children: [] },
        { type: 'dir', name: 'Productivity', children: [] },
      ],
    },
    {
      type: 'dir',
      name: 'Papers',
      children: [
        { type: 'link', name: 'Replicated Editor.pdf', url: '/papers/cs2620-final-paper.pdf' },
        { type: 'link', name: 'Lumi.pdf', url: '/papers/cs2780-final-paper.pdf' },
        { type: 'link', name: 'Differentially Private Consensus.pdf', url: '/papers/cs286-final-paper.pdf' },
        { type: 'link', name: 'Privacy Optimizer.pdf', url: '/papers/cs2080-final-paper.pdf' },
        { type: 'link', name: 'COMPASS.pdf', url: '/papers/cs279-final-project.pdf' },
        { type: 'link', name: 'Fantasy World.pdf', url: '/papers/cs175-final-project.pdf' },
      ],
    },
    { type: 'file', name: 'about.txt', content: ABOUT },
    { type: 'file', name: 'README.txt', content: README },
    { type: 'file', name: 'contact.txt', content: CONTACT },
    { type: 'link', name: 'resume.pdf', url: '/Resume-Final-Vihaan-Gupta.pdf' },
  ],
};

/** Walk the tree by canonical path segments. Returns null if any segment misses. */
export function nodeAtPath(path: string[]): VNode | null {
  let node: VNode = ROOT;
  for (const seg of path) {
    if (node.type !== 'dir') return null;
    const next = node.children.find((c) => c.name === seg);
    if (!next) return null;
    node = next;
  }
  return node;
}

export type ResolveResult = { path: string[]; node: VNode } | { error: string };

/** Resolve an argument (absolute, ~, relative, with `.`/`..`) against the cwd. */
export function resolve(cwd: string[], arg: string): ResolveResult {
  const trimmed = arg.trim().replace(/^["']|["']$/g, '');
  const absolute = /^[~/]/.test(trimmed);
  const path = absolute ? [] : [...cwd];
  const cleaned = trimmed.replace(/^~/, '').replace(/^\//, '');
  const parts = cleaned
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (part === '.') continue;
    if (part === '..') {
      path.pop();
      continue;
    }
    const dir = nodeAtPath(path);
    if (!dir || dir.type !== 'dir') return { error: `not a directory: ${part}` };
    const child = dir.children.find((c) => c.name.toLowerCase() === part.toLowerCase());
    if (!child) return { error: `no such file or directory: ${part}` };
    path.push(child.name);
  }

  const node = nodeAtPath(path);
  if (!node) return { error: 'no such file or directory' };
  return { path, node };
}

/** Pretty path for the prompt: `~` or `~/Projects`. */
export function formatPath(path: string[]): string {
  return path.length ? `~/${path.join('/')}` : '~';
}
