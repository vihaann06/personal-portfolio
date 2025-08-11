import React from 'react';
import { ChevronDown, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="h-[calc(100vh-6rem)] flex items-center relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="flex items-center justify-between gap-24 lg:gap-32">
          {/* Text Content - Left Side */}
          <div className="flex-1 space-y-8 relative z-10 text-left">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x leading-tight">
                Vihaan Gupta
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-white/50 max-w-2xl leading-relaxed font-sans">
                Hi! I'm Vihaan, a rising Junior at Harvard College, studying Computer Science and Philosophy. 
                I'm passionate about human-centered design and creating social impact through technology.
                In my free time, I love reading philosophy, going to the gym, and exploring new restaurants. Happy to connect!
              </p>
            </div>
            
            <div className="flex space-x-4 pt-4">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/vihaan-gupta-1595332a7", text: "LinkedIn" },
                { icon: Mail, href: "mailto:vihaangupta@college.harvard.edu", text: "Contact" }
              ].map(({ icon: Icon, href, text }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                >
                  <Icon size={20} className="group-hover:text-purple-400 transition-colors duration-300" />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">{text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Profile Picture - Right Side */}
          <div className="flex-shrink-0 relative">
            <div className="relative group">
              <div className="absolute"></div>
              
              <div className="relative w-56 h-56 md:w-[20rem] md:h-[20rem] lg:w-[24rem] lg:h-[24rem] group">
                <img 
                  src="/images/Group 3.png"
                  alt="Vihaan Gupta" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                <div className="absolute top-4 right-4 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute bottom-8 left-8 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-1/3 left-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-80"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-purple-400" onClick={() => {
            const experienceSection = document.getElementById('experience');
            if (experienceSection) {
              experienceSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}/>
        </div>
      </div>
    </section>
  );
};

export default Hero; 