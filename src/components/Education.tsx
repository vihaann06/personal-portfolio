import React from 'react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Education: React.FC = () => {
  const education = [
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
    },
    {
        degree: "High School Diploma",
        school: "KC Public School",
        location: "Jammu, India",
        period: "2008 - 2023",
        description: [
          "Activities and Societies: Student Council, Debating Club, IT Club, Secretary General of KCMUN, Squash",
        ],
        achievements: ["GPA: 97/100"]
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
            <h2 className="text-4xl font-bold text-black">
              Education
            </h2>
            <div className="h-[1px] flex-1 bg-black/20"></div>
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
              className="group rounded-sm p-5 border border-black/10 hover:border-black/30 transition-all duration-300"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-black group-hover:text-black transition-all duration-300">{edu.degree}</h3>
                    <div className="flex items-center space-x-4 mt-1.5">
                      <div className="flex items-center text-black/60">
                        <GraduationCap size={16} className="mr-2" />
                        <span>{edu.school}</span>
                      </div>
                      <div className="flex items-center text-black/60">
                        <MapPin size={16} className="mr-2" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center text-black/60">
                        <Calendar size={16} className="mr-2" />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="list-none space-y-1.5 text-black/60">
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
                      className="px-3 py-1 text-sm border border-black/10 rounded-sm text-black/60 group-hover:border-black/20 transition-all duration-300"
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