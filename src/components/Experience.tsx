import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1] as const;

type ExperienceEntry = {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  /** Public URL under `/public` (e.g. `/MIAX.png`). Omit when no logo. */
  logoSrc?: string;
};

interface ExperienceProps {
  profileMode: 'personal' | 'professional';
}

function CompanyLogo({ company, logoSrc }: { company: string; logoSrc?: string }) {
  if (!logoSrc) return null;

  const label = `${company} logo`;

  return (
    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl sm:h-14 sm:w-14">
      <img
        src={logoSrc}
        alt={label}
        className="size-full object-cover"
        width={56}
        height={56}
        decoding="async"
      />
    </div>
  );
}

function timelineItemMotionProps(
  reduced: boolean,
  stagger: number,
  viewport: { once: boolean; margin: string; amount?: number },
) {
  if (reduced) {
    return { initial: false as const, viewport };
  }
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: { duration: 0.55, ease: easeOut, delay: stagger },
  };
}

function usePrefersHover() {
  const [hoverCapable, setHoverCapable] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    const update = () => setHoverCapable(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return hoverCapable;
}

function ExperienceCardBody({
  exp,
  expanded,
  reducedMotion,
}: {
  exp: ExperienceEntry;
  expanded: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="relative">
      <div className={`flex ${exp.logoSrc ? 'gap-4' : ''}`}>
        <CompanyLogo company={exp.company} logoSrc={exp.logoSrc} />
        <div className={`min-w-0 space-y-2 ${exp.logoSrc ? 'flex-1' : ''}`}>
          <h3 className="text-xl font-semibold text-black">{exp.title}</h3>
          <p className="text-sm text-black/60">{exp.company}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/55">
            <div className="flex items-center gap-2">
              <Calendar size={12} className="shrink-0 opacity-70" aria-hidden />
              <span>{exp.period}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={12} className="shrink-0 opacity-70" aria-hidden />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`grid ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} ${reducedMotion ? '' : 'transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'}`}
        aria-hidden={!expanded}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`space-y-5 border-t border-black/10 pt-5 mt-5 ${reducedMotion ? '' : `transition-opacity duration-300 ease-out ${expanded ? 'opacity-100 delay-100' : 'opacity-0'}`}`}
          >
            <div className="space-y-3 text-sm text-black/70 leading-relaxed">
              {exp.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <span
                  key={tech + i}
                  className="px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] border border-black/15 rounded-md text-black/60 transition-colors duration-200 ease-out hover:border-black/25"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function articleShellClassName(extra?: string) {
  return [
    'relative overflow-hidden rounded-xl border border-black/15 bg-white/80 backdrop-blur px-5 py-5 sm:px-6 sm:py-6 shadow-sm shadow-black/[0.02]',
    'transition-[box-shadow,border-color] duration-300 ease-out hover:border-black/25 hover:shadow-md hover:shadow-black/[0.04]',
    'outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f7f3]',
    'group/card',
    extra ?? '',
  ]
    .filter(Boolean)
    .join(' ');
}

function ExperienceTimelineRow({
  exp,
  index,
  reducedMotion,
  hoverCapable,
}: {
  exp: ExperienceEntry;
  index: number;
  reducedMotion: boolean;
  hoverCapable: boolean;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touchOpen, setTouchOpen] = useState(false);

  const expanded = hoverCapable ? hovered || focused : touchOpen;

  const onBlur = useCallback((e: React.FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && e.currentTarget.contains(next)) return;
    setFocused(false);
  }, []);

  useEffect(() => {
    if (hoverCapable || !touchOpen) return;

    const onDocPointer = (ev: PointerEvent) => {
      const el = articleRef.current;
      if (el && !el.contains(ev.target as Node)) setTouchOpen(false);
    };

    document.addEventListener('pointerdown', onDocPointer, true);
    return () => document.removeEventListener('pointerdown', onDocPointer, true);
  }, [hoverCapable, touchOpen]);

  const isLeft = index % 2 === 0;
  const stagger = reducedMotion ? 0 : Math.min(index * 0.06, 0.24);

  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-x-4 items-start pb-12 md:grid-cols-[1fr_auto_1fr] md:gap-x-10 md:pb-16 last:pb-8 md:last:pb-8">
      {/* Dot centered on the global timeline rail (see parent wrapper) */}
      <div className="relative z-[2] col-start-1 row-start-1 flex w-5 shrink-0 justify-center md:col-start-2 md:w-10">
        <span
          className="relative z-[3] mt-1.5 size-2.5 shrink-0 rounded-full border-2 border-black/25 bg-[#f8f7f3] shadow-[0_0_0_3px_#f8f7f3] ring-1 ring-black/[0.06] md:mt-7 md:size-3 md:shadow-[0_0_0_5px_#f8f7f3]"
          aria-hidden
        />
      </div>

      <motion.article
        ref={articleRef}
        tabIndex={0}
        aria-label={`${exp.title} at ${exp.company}`}
        onMouseEnter={() => hoverCapable && setHovered(true)}
        onMouseLeave={() => hoverCapable && setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={onBlur}
        onClick={() => {
          if (!hoverCapable) setTouchOpen((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && expanded) {
            e.stopPropagation();
            setHovered(false);
            setFocused(false);
            setTouchOpen(false);
            articleRef.current?.blur();
          }
        }}
        {...timelineItemMotionProps(reducedMotion, stagger, {
          once: true,
          margin: '-12% 0px -8% 0px',
          amount: 0.2,
        })}
        className={articleShellClassName(
          [
            'col-start-2 row-start-1 min-w-0 w-full max-w-lg cursor-default',
            isLeft
              ? 'md:col-start-1 md:justify-self-end md:origin-right'
              : 'md:col-start-3 md:justify-self-start md:origin-left',
          ].join(' '),
        )}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover/card:opacity-100 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_65%)]" />
        <ExperienceCardBody exp={exp} expanded={expanded} reducedMotion={reducedMotion} />
      </motion.article>
    </li>
  );
}

const Experience: React.FC<ExperienceProps> = ({ profileMode }) => {
  const reducedMotion = useReducedMotion() === true;
  const hoverCapable = usePrefersHover();

  const professionalExperiences: ExperienceEntry[] = [
    {
      title: 'Founding Software Engineer',
      company: 'Stealth Startup',
      location: 'Remote',
      period: 'Nov 2025 - Jan 2026',
      logoSrc: '/stealth-startup.png',
      description: [
        'Built the MVP of RevCenter, an AI voice agent platform for home service businesses.',
      ],
      technologies: ['Node.js', 'Supabase (RLS)', 'ElevenLabs'],
    },
    {
      title: 'Software Engineering Intern',
      company: 'Miami International Holdings',
      location: 'Princeton, NJ',
      period: 'Jun 2025 - Aug 2025',
      logoSrc: '/MIAX.png',
      description: [
        'Deployed a Spring Kafka library to support the messaging infrastructure for 4 options and an equities exchange.',
      ],
      technologies: ['Java', 'Spring Kafka', 'Kubernetes', 'Jenkins'],
    },
    {
      title: 'Founding Software Engineer',
      company: 'As1 Social',
      location: 'Remote',
      period: 'Mar 2025 - May 2025',
      logoSrc: '/as1-social.png',
      description: [
        'Spearheaded the end-to-end development of 15+ MVP features for a social media app.',
      ],
      technologies: ['React Native', 'PostgreSQL', 'Tailwind CSS', 'Git'],
    },
    {
      title: 'Software Engineering Intern',
      company: 'Avalon Infosys',
      location: 'Delhi, India',
      period: 'Jun 2024 - Aug 2024',
      logoSrc: '/avalon-infosys.png',
      description: [
        'Developed OpenEMIS mobile dashboard to help users locate schools in developing countries.',
      ],
      technologies: ['Flutter', 'Firebase', 'Dart'],
    }
  ];

  const personalExperiences: ExperienceEntry[] = [
    {
      title: 'Founding Software Engineer',
      company: 'Stealth Startup',
      location: 'Remote',
      period: 'Nov 2025 - Jan 2026',
      logoSrc: '/stealth-startup.png',
      description: [
        'Built for an interesting problem space with a user base that I had little experience with.',
      ],
      technologies: ['Node.js', 'Supabase (RLS)', 'ElevenLabs'],
    },
    {
      title: 'Software Engineering Intern',
      company: 'Miami International Holdings',
      location: 'Princeton, NJ',
      period: 'Jun 2025 - Aug 2025',
      logoSrc: '/MIAX.png',
      description: [
        'Learnt how to ship technology for scale in a regulated environment.',
      ],
      technologies: ['Java', 'Spring Kafka', 'Kubernetes', 'Jenkins'],
    },
    {
      title: 'Founding Software Engineer',
      company: 'As1 Social',
      location: 'Remote',
      period: 'Mar 2025 - May 2025',
      logoSrc: '/as1-social.png',
      description: [
        'Fast product cycles in a small team with high ownership and direct user feedback.',
      ],
      technologies: ['React Native', 'PostgreSQL', 'Tailwind CSS', 'Git'],
    },
    {
      title: 'Software Engineering Intern',
      company: 'Avalon Infosys',
      location: 'Delhi, India',
      period: 'Jun 2024 - Aug 2024',
      logoSrc: '/avalon-infosys.png',
      description: [
        'Introduced me to the world of mobile development and the challenges of building for a global audience.',
      ],
      technologies: ['Flutter', 'Firebase', 'Dart'],
    },
  ];

  const experiences = profileMode === 'professional' ? professionalExperiences : personalExperiences;

  return (
    <section id="experience" className="min-h-screen pt-10 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mb-10 pt-6"
        >
          <div className="flex flex-col gap-2">
            <p className="text-[0.5rem] uppercase tracking-[0.5em] text-black/50">Experience</p>
            <div className="h-px w-full bg-black/10" />
            <h2 className="text-3xl md:text-3xl font-semibold leading-tight">
              {profileMode === 'professional'
                ? 'Places where I learned to ship clearly under pressure.'
                : 'Moments that changed how I think and build.'}
            </h2>
          </div>
        </motion.div>

        <div className="relative">
          {/* Single continuous rail; dots sit on top (higher z-index) */}
          <div
            className="pointer-events-none absolute z-0 left-[10px] top-3 bottom-3 w-px -translate-x-1/2 bg-black/20 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />
          <ol className="relative z-[1] list-none m-0 p-0 space-y-0">
            {experiences.map((exp, index) => (
              <ExperienceTimelineRow
                key={`${exp.company}-${index}`}
                exp={exp}
                index={index}
                reducedMotion={reducedMotion}
                hoverCapable={hoverCapable}
              />
            ))}
          </ol>
        </div>

        {profileMode === 'professional' && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mt-4 flex justify-center md:mt-8"
          >
            <a
              href="/Resume-Final-Vihaan-Gupta.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-black/15 rounded-md px-8 py-3 text-xs font-medium tracking-[0.35em] uppercase transition-all duration-300 ease-out hover:border-black/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              View résumé
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Experience;
