import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen pt-10 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-2">
            <p className="text-[0.5rem] uppercase tracking-[0.5em] text-black/50">Contact</p>
            <div className="h-px w-full bg-black/10" />
            <h2 className="text-3xl font-semibold leading-tight max-w-2xl">
              Always open to new opportunities or chatting!
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-black/15 bg-white/80 backdrop-blur px-6 py-8 space-y-6"
          >
            <div className="flex flex-col gap-1">
              <p className="text-[0.55rem] uppercase tracking-[0.5em] text-black/50">Available for</p>
              <p className="text-lg font-semibold">Product + infra internships · creative collabs</p>
              </div>

            <p className="text-sm text-black/70 leading-relaxed">
              I gravitate toward teams building considerate, high-leverage tools. If you&apos;re exploring
              intentional tech, community infrastructure, or just want to debate Kierkegaard vs. Arendt,
              I&apos;m game.
            </p>

              <div className="space-y-3">
              <a
                href="mailto:vihaangupta@college.harvard.edu"
                className="flex items-center gap-3 text-black text-sm hover:text-black/80 transition-colors"
              >
                  <Mail size={18} />
                  <span>vihaangupta@college.harvard.edu</span>
                </a>
              <a href="tel:+18578298855" className="flex items-center gap-3 text-black/70 text-sm hover:text-black transition-colors">
                  <Phone size={18} />
                  <span>+1 (857) 829-8855</span>
                </a>
              <div className="flex items-center gap-3 text-black/70 text-sm">
                  <MapPin size={18} />
                  <span>Cambridge, MA</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="rounded-xl border border-black/15 bg-white/80 backdrop-blur px-6 py-6 space-y-5">
              <div className="space-y-2">
                <p className="text-[0.55rem] uppercase tracking-[0.5em] text-black/50">Next conversation</p>
                <h3 className="text-base font-semibold">Tell me what you&apos;re building.</h3>
                <p className="text-sm text-black/65">
                  Drop a note with a problem statement, a figma link, or a story—promise to respond.
                </p>
              </div>
              <a
                href="mailto:vihaangupta@college.harvard.edu?subject=Let%27s%20Collaborate"
                className="inline-flex items-center justify-center border border-black/15 rounded-md px-5 py-2.5 text-xs font-medium tracking-[0.35em] uppercase hover:border-black/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Email Vihaan
              </a>
              </div>

            <div className="rounded-xl border border-black/15 bg-white/75 backdrop-blur px-6 py-5 space-y-2">
              <p className="text-[0.55rem] uppercase tracking-[0.5em] text-black/50">Elsewhere</p>
              <a
                href="https://www.linkedin.com/in/vihaan-gupta-1595332a7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-black/70 text-sm hover:text-black transition-colors"
              >
                  <Linkedin size={18} />
                  <span>linkedin.com/in/vihaangupta</span>
                </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
