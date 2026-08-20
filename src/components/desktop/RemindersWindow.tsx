import React, { useState } from 'react';

interface ReminderItem {
  id: string;
  title: string;
  note?: string;
}

const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 'phil-paper',
    title: 'Read research paper for PHIL 166AI',
    note: 'Philosophy of Artificial Intelligence',
  },
  {
    id: 'cs-grading',
    title: 'Grade problem sets for CS 1066',
    note: 'Software Engineering with AI',
  },
  {
    id: 'lunch',
    title: 'Lunch and catch up with friends',
  },
  {
    id: 'gym',
    title: 'Evening gym session with roommate',
  },
  {
    id: 'hci-meeting',
    title: 'Attend research meeting with HCI group',
  },
];

const RemindersWindow: React.FC = () => {
  const [doneIds, setDoneIds] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const remaining = INITIAL_REMINDERS.filter((item) => !doneIds.has(item.id)).length;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#f7f7f7] text-black">
      <div className="flex shrink-0 items-end justify-between border-b border-black/10 px-5 pb-3 pt-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff9f0a]">Today</p>
          <h2 className="mt-0.5 text-[22px] font-bold tracking-tight text-black/90">Reminders</h2>
        </div>
        <p className="pb-1 text-[12px] font-medium text-black/40">
          {remaining} remaining
        </p>
      </div>

      <ul className="flex-1 overflow-auto px-2 py-1.5">
        {INITIAL_REMINDERS.map((item) => {
          const done = doneIds.has(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="group flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-black/[0.04]"
                aria-pressed={done}
                aria-label={done ? `Mark incomplete: ${item.title}` : `Mark complete: ${item.title}`}
              >
                <span
                  className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-150 ${
                    done
                      ? 'border-[#ff9f0a] bg-[#ff9f0a] text-white'
                      : 'border-black/25 bg-transparent group-hover:border-[#ff9f0a]'
                  }`}
                >
                  {done && (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden>
                      <path
                        d="M2.5 6.2 L4.8 8.5 L9.5 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[14px] leading-snug transition-colors ${
                      done ? 'text-black/35 line-through' : 'text-black/85'
                    }`}
                  >
                    {item.title}
                  </span>
                  {item.note && (
                    <span
                      className={`mt-0.5 block text-[11px] leading-snug ${
                        done ? 'text-black/25' : 'text-black/40'
                      }`}
                    >
                      {item.note}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RemindersWindow;
