import React from 'react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Education: React.FC = () => {
  const education = [
    {
        degree: "High School Diploma",
        school: "KC Public School",
        location: "Jammu, India",
        period: "2008 - 2023",
        description: [
          "Activities and Societies: Student Council, Debating Club, IT Club, Secretary General of KCMUN, Squash",
        ],
        achievements: ["GPA: 97/100"]
    },
    {
      degree: "Bachelor of Arts in Computer Science and Philosophy",
      school: "Harvard University",
      location: "Cambridge, MA",
      period: "2023 - 2027",
      description: [
        "Relevant Coursework: Data Structures and Algorithms, Algorithmic Limitations,Systems Programming, Computer Graphics, Artificial and Natural Intelligence, Differential Privacy, Probability, Real Analysis, Linear and Abstract Algebra",
        "Activities and Societies: Executive Director of HCS Tech for Social Good, Teaching Assistant for CS175 (Computer Graphics), Digital Media Chair for Harvard College Dbeating Union, Tour Guide for Harvard Student Agencies",
      ],
      achievements: ["GPA: 3.88"]
    }
  ];

  return (
    <section id="education" className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.05, delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              Education
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-blue-400/50 animate-gradient-x"></div>
          </div>
        </motion.div>
        
        <div>
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.05, delay: 0.1 }}
              className="group rounded-[8px] p-5 hover:bg-white/5 hover:backdrop-blur-sm transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2)]"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{edu.degree}</h3>
                    <div className="flex items-center space-x-4 mt-1.5">
                      <div className="flex items-center text-white/70">
                        <GraduationCap size={16} className="mr-2" />
                        <span>{edu.school}</span>
                      </div>
                      <div className="flex items-center text-white/70">
                        <MapPin size={16} className="mr-2" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Calendar size={16} className="mr-2" />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="list-none space-y-1.5 text-white/70">
                  {edu.description.map((item, i) => (
                    <li key={i} className="flex">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-1">
                  {edu.achievements.map((achievement, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-sm bg-white/5 rounded-[8px] text-white/70 group-hover:bg-gradient-to-r group-hover:from-purple-400/20 group-hover:to-pink-400/20 transition-all duration-300"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education; 