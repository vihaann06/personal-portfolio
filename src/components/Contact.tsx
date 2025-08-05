import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-8 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.05, delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              Contact
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-blue-400/50 animate-gradient-x"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.05, delay: 0.1 }}
            className="group rounded-[8px] p-5 transition-all duration-300"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Get in Touch
                </h3>
                <p className="mt-2 text-white/70">
                  I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>

              <div className="space-y-4">
                <a href="mailto:vihaangupta06@gmail.com" className="flex items-center gap-3 text-white/70  transition-colors duration-300">
                  <Mail size={20} />
                  <span>vihaangupta@college.harvard.edu</span>
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-3 text-white/70 transition-colors duration-300">
                  <Phone size={20} />
                  <span>+1 (857) 829-8855</span>
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin size={20} />
                  <span>Cambridge, MA</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.05, delay: 0.2 }}
            className="group rounded-[8px] p-5 transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0)]"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Connect
                </h3>
                <p className="mt-2 text-white/70">
                  Feel free to connect with me on social media or check out my work on GitHub.
                </p>
              </div>

              <div className="space-y-4">
                <a href="https://github.com/vihaann06" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70  transition-colors duration-300">
                  <Github size={20} />
                  <span>github.com/vihaann06</span>
                </a>
                <a href="https://www.linkedin.com/in/vihaan-gupta-1595332a7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 transition-colors duration-300">
                  <Linkedin size={20} />
                  <span>linkedin.com/in/vihaangupta</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
