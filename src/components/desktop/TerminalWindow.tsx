import React, { useEffect, useMemo, useRef, useState } from 'react';
import { formatPath, resolve, VNode } from './filesystem';

const PROMPT_USER = 'vihaan@portfolio';

const loginStamp = () =>
  new Date().toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

const Prompt: React.FC<{ path: string[] }> = ({ path }) => (
  <span className="whitespace-pre">
    <span className="text-[#37d67a]">{PROMPT_USER}</span>
    <span className="text-white/55">:</span>
    <span className="text-[#7aa2f7]">{formatPath(path)}</span>
    <span className="text-white/80"> % </span>
  </span>
);

interface Line {
  id: number;
  node: React.ReactNode;
}

const HelpBlock: React.FC = () => (
  <div className="text-white/80">
    <p className="text-white/50">Available commands:</p>
    {[
      ['ls [path]', 'list directory contents'],
      ['cd [path]', 'change directory (cd .. , cd ~)'],
      ['pwd', 'print working directory'],
      ['cat <file>', 'show a file'],
      ['open <name>', 'open a project / link in a new tab'],
      ['echo <text>', 'print text'],
      ['whoami', 'a quick intro'],
      ['date', 'current date & time'],
      ['clear', 'clear the screen'],
      ['help', 'show this help'],
    ].map(([cmd, desc]) => (
      <p key={cmd}>
        <span className="inline-block w-32 text-[#37d67a]">{cmd}</span>
        <span className="text-white/55">{desc}</span>
      </p>
    ))}
    <p className="mt-1 text-white/40">tip: use ↑ / ↓ to scroll through past commands.</p>
  </div>
);

const Listing: React.FC<{ entries: VNode[] }> = ({ entries }) => (
  <div className="flex flex-wrap gap-x-5 gap-y-0.5">
    {entries.map((entry) => {
      if (entry.type === 'dir') {
        return (
          <span key={entry.name} className="text-[#7aa2f7]">
            {entry.name}/
          </span>
        );
      }
      if (entry.type === 'link') {
        return (
          <span key={entry.name} className="text-[#37d67a]">
            {entry.name}
          </span>
        );
      }
      return (
        <span key={entry.name} className="text-[#e6e6e6]">
          {entry.name}
        </span>
      );
    })}
  </div>
);

const TerminalWindow: React.FC = () => {
  const [cwd, setCwd] = useState<string[]>([]);
  const keyRef = useRef(0);
  const nextKey = () => keyRef.current++;

  const initialLines = useMemo<Line[]>(
    () => [
      { id: nextKey(), node: <span className="text-white/45">Last login: {loginStamp()} on ttys000</span> },
      {
        id: nextKey(),
        node: (
          <span className="text-white/70">
            Welcome to vihaanOS — type <span className="text-[#37d67a]">help</span> to get started.
          </span>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [lines, setLines] = useState<Line[]>(initialLines);
  const [input, setInput] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [logIdx, setLogIdx] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    const out: React.ReactNode[] = [];
    const cmd = trimmed.split(/\s+/)[0] ?? '';
    const argStr = trimmed.slice(cmd.length).trim();
    let nextCwd: string[] | null = null;

    const err = (msg: string) => out.push(<span className="text-[#ff6b6b]">{msg}</span>);

    switch (cmd) {
      case '':
        break;
      case 'help':
        out.push(<HelpBlock />);
        break;
      case 'clear':
        setLines([]);
        setInput('');
        return;
      case 'pwd':
        out.push(<span>{formatPath(cwd)}</span>);
        break;
      case 'echo':
        out.push(<span>{argStr}</span>);
        break;
      case 'date':
        out.push(<span>{new Date().toString()}</span>);
        break;
      case 'whoami':
        out.push(
          <span className="text-white/80">
            Vihaan Gupta — builder @ Harvard (CS + Philosophy). Try <span className="text-[#37d67a]">cat about.txt</span>.
          </span>,
        );
        break;
      case 'ls': {
        const res = resolve(cwd, argStr || '.');
        if ('error' in res) {
          err(`ls: ${res.error}`);
          break;
        }
        if (res.node.type === 'dir') {
          if (res.node.children.length > 0) out.push(<Listing entries={res.node.children} />);
        } else {
          out.push(<span>{res.node.name}</span>);
        }
        break;
      }
      case 'cd': {
        if (!argStr || argStr === '~') {
          nextCwd = [];
          break;
        }
        const res = resolve(cwd, argStr);
        if ('error' in res) {
          err(`cd: ${res.error}`);
          break;
        }
        if (res.node.type !== 'dir') {
          err(`cd: not a directory: ${res.node.name}`);
          break;
        }
        nextCwd = res.path;
        break;
      }
      case 'cat': {
        if (!argStr) {
          err('cat: missing file name');
          break;
        }
        const res = resolve(cwd, argStr);
        if ('error' in res) {
          err(`cat: ${res.error}`);
          break;
        }
        if (res.node.type === 'dir') {
          err(`cat: ${res.node.name}: is a directory`);
        } else if (res.node.type === 'link') {
          out.push(
            <span className="text-white/70">
              {res.node.name} → {res.node.url} (use <span className="text-[#37d67a]">open</span> to visit)
            </span>,
          );
        } else {
          res.node.content.split('\n').forEach((text) =>
            out.push(<span className="whitespace-pre-wrap">{text || '\u00A0'}</span>),
          );
        }
        break;
      }
      case 'open': {
        if (!argStr) {
          err('open: missing target');
          break;
        }
        const res = resolve(cwd, argStr);
        if ('error' in res) {
          err(`open: ${res.error}`);
          break;
        }
        if (res.node.type === 'link') {
          window.open(res.node.url, '_blank', 'noopener,noreferrer');
          out.push(<span className="text-white/60">Opening {res.node.name}…</span>);
        } else if (res.node.type === 'dir') {
          err(`open: ${res.node.name} is a folder — use \`cd ${res.node.name}\``);
        } else {
          err(`open: cannot open ${res.node.name} — try \`cat ${res.node.name}\``);
        }
        break;
      }
      case 'sudo':
        out.push(<span className="text-white/60">You're already root in spirit. Permission granted (to nothing).</span>);
        break;
      case 'rm':
        out.push(<span className="text-white/60">Nice try. This filesystem is read-only.</span>);
        break;
      default:
        err(`command not found: ${cmd} — type \`help\``);
    }

    const echo = (
      <div>
        <Prompt path={cwd} />
        <span className="text-[#e6e6e6]">{raw}</span>
      </div>
    );

    setLines((prev) => [
      ...prev,
      { id: nextKey(), node: echo },
      ...out.map((node) => ({ id: nextKey(), node })),
    ]);
    if (nextCwd) setCwd(nextCwd);
    setInput('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = input;
      if (value.trim()) setLog((prev) => [...prev, value]);
      setLogIdx(null);
      run(value);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (log.length === 0) return;
      const idx = logIdx === null ? log.length - 1 : Math.max(0, logIdx - 1);
      setLogIdx(idx);
      setInput(log[idx]);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (logIdx === null) return;
      const idx = logIdx + 1;
      if (idx >= log.length) {
        setLogIdx(null);
        setInput('');
      } else {
        setLogIdx(idx);
        setInput(log[idx]);
      }
    }
  };

  return (
    <div
      className="min-h-full bg-[#1b1b1d]/95 px-4 py-3 font-mono text-[13px] leading-relaxed text-[#e6e6e6]"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line) => (
        <div key={line.id}>{line.node}</div>
      ))}

      <div className="flex">
        <Prompt path={cwd} />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          className="flex-1 bg-transparent text-[#e6e6e6] caret-[#e6e6e6] outline-none"
          aria-label="terminal input"
        />
      </div>

      <div ref={endRef} />
    </div>
  );
};

export default TerminalWindow;
