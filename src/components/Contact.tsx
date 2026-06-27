import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from 'lucide-react';
import Magnetic from './Magnetic';

const easeOut = [0.16, 1, 0.3, 1] as const;
const EMAIL = 'vihaangupta@college.harvard.edu';

const Contact: React.FC = () => {
  const reducedMotion = useReducedMotion() === true;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; the mailto link still works.
    }
  };

  return (
    <section id="contact" className="flex h-full items-center pb-8">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="flex flex-col gap-2"
        >
          <p className="text-[0.5rem] uppercase tracking-[0.5em] text-black/50">Contact</p>
          <motion.div
            initial={reducedMotion ? false : { scaleX: 0 }}
            animate={reducedMotion ? undefined : { scaleX: 1 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
            className="h-px w-full origin-left bg-black/10"
          />
        </motion.div>

        {/* Statement CTA */}
        <motion.a
          href={`mailto:${EMAIL}`}
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeOut, delay: 0.15 }}
          className="group mt-8 flex items-end justify-between gap-6"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.02]">
            Let&apos;s <span className="font-serif italic font-normal">talk</span>.
          </h2>
          <Magnetic strength={0.35}>
            <span className="flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-black/20 text-black transition-colors duration-300 group-hover:bg-black group-hover:text-[#f8f7f3]">
              <ArrowUpRight
                size={28}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </Magnetic>
        </motion.a>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.3 }}
          className="mt-10 grid gap-8 border-t border-black/10 pt-8 md:grid-cols-2 md:gap-12"
        >
          <div className="space-y-3">
            <p className="text-[0.55rem] uppercase tracking-[0.5em] text-black/50">Available for</p>
            <p className="text-base font-semibold">Product + infra internships · creative collabs</p>
            <p className="text-sm text-black/65 leading-relaxed">
              I gravitate toward teams building considerate, high-leverage tools. If you&apos;re
              exploring intentional tech, community infrastructure, or just want to debate
              Kierkegaard vs. Arendt, I&apos;m game.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[0.55rem] uppercase tracking-[0.5em] text-black/50">Reach me</p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-sm text-black hover:text-black/80 transition-colors"
              >
                <Mail size={16} />
                <span className="u-underline">{EMAIL}</span>
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-md border border-black/15 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-black/60 transition-all duration-300 hover:border-black/40 hover:text-black"
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <a
              href="tel:+18578298855"
              className="flex items-center gap-3 text-sm text-black/70 hover:text-black transition-colors"
            >
              <Phone size={16} />
              <span className="u-underline">+1 (857) 829-8855</span>
            </a>
            <div className="flex items-center gap-3 text-sm text-black/70">
              <MapPin size={16} />
              <span>Cambridge, MA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
