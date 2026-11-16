import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Magnetic from './Magnetic';

const easeOut = [0.16, 1, 0.3, 1] as const;

const Hero: React.FC = () => {
  const reducedMotion = useReducedMotion() === true;

  return (
    <>
      <section id="home" className="h-full flex items-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 text-center lg:text-left lg:-translate-y-2 lg:translate-x-2">
            <div className="space-y-4 max-w-md">
              <motion.h1
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
                className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.06] tracking-tight"
              >
                Hey, I&apos;m Vihaan
              </motion.h1>
              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
                className="text-sm md:text-base text-black/70 leading-relaxed"
              >
                I&apos;m a builder @ Harvard studying CS and Philosophy. I love studying about the intersection of technology and society. Currently, I&apos;m working as an HCI researcher @{' '}
                <a
                  href="https://glassmanlab.seas.harvard.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-underline text-black/80 hover:text-black transition-colors"
                >
                  Variation Lab
                </a>{' '}
                and incoming Member of Technical Staff @{' '}
                <a
                  href="https://www.etched.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-underline text-black/80 hover:text-black transition-colors"
                >
                  Etched
                </a>{' '}. Feel free to reach out if you&apos;d like to chat!
              </motion.p>
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.55 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5"
              >
              {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/vihaan-gupta-1595332a7', text: 'LinkedIn' },
                  { icon: Github, href: 'https://github.com/vihaann06', text: 'GitHub' },
                  { icon: Mail, href: 'mailto:vihaangupta@college.harvard.edu', text: 'Email' }
                ].map(({ icon: Icon, href, text }) => (
                  <Magnetic key={text} strength={0.2}>
                    <a
                      href={href}
                      className="group flex items-center gap-2 px-4 py-2.5 border border-black/20 bg-white/80 backdrop-blur rounded-md transition-all duration-300 hover:border-black/40 text-xs md:text-sm"
                    >
                      <Icon
                        size={16}
                        className="text-black/70 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      <span className="font-medium">{text}</span>
                    </a>
                  </Magnetic>
              ))}
            </motion.div>
          </div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.25 }}
              className="flex justify-center"
            >
              <div className="relative w-32 sm:w-40 md:w-48 lg:w-56 aspect-[3/4]">
                <motion.img
                  src="/images/my-notion-face-transparent.png"
                  alt="Vihaan Gupta"
                  className="relative w-full h-full object-cover mix-blend-multiply"
                  animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>
      </div>
    </section>
    </>
  );
};

export default Hero; 