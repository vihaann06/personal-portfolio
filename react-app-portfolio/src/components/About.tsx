import React from 'react';
import { Code, Palette, Zap } from 'lucide-react';

const About = () => {
  const skills = [
    { name: "Frontend Development", icon: Code, level: 95 },
    { name: "UI/UX Design", icon: Palette, level: 88 },
    { name: "Backend Development", icon: Zap, level: 85 }
  ];

  return (
    <section id="experience" className="py-20 px-8 sm:px-12 lg:px-16 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My professional journey and the skills I've developed along the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg text-gray-300">
              <p>
                I specialize in modern web technologies and have a keen eye for design. 
                My journey started with curiosity about how things work, and evolved into 
                a passion for creating seamless user experiences.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open source projects, or mentoring aspiring developers in the community.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {skills.map(({ name, icon: Icon, level }) => (
              <div key={name} className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Icon size={20} className="text-purple-400" />
                  <span className="font-medium">{name}</span>
                  <span className="text-sm text-gray-400">{level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 