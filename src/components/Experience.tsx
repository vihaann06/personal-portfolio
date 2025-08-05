import React from 'react';
import { ArrowUpRight, Briefcase, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "As1 Social",
      location: "Remote",
      period: "Jun 2025 - Aug 2025",
      description: [
        "Deployed a Spring Kafka library to support the messaging infrastructure for 4 options and an equities exchange",
        "Developed 16 reusable Java convenience methods to streamline offset tracking, enable offset rewind for redis caching, and prevent data loss by bringing down broker unavailability signal handling from 2 minutes to 1 second",
        "Integrated kubeLinter into Jenkins CI pipeline to automatically scan Kubernetes configuration files on pull requests and developed custom linting rules tailored to compliance policies, detecting issues in 70% of PRs"
      ],
      technologies: ["Java", "Spring Kafka", "Kubernetes", "Jenkins", "Python", "Git"]
    },
    {
      title: "Founding Software Engineer",
      company: "As1 Social",
      location: "Remote",
      period: "Mar 2025 - May 2025",
      description: [
        "Contributed to the MVP development of social media app in React Native (frontend) and PostgreSQL (backend)",
        "Implemented caption parsing and hashtag ranking for video recommendations, boosting user retention by 30% through personalised feeds based on user preferences, keyword relevance, and trend recency",
        "Optimised caching and memory usage by over 50% via implementing video prefetching and feed pagination"
      ],
      technologies: ["React Native", "PostgreSQL", "Tailwind CSS", "Git"]
    },
    {
      title: "Software Development Intern",
      company: "Avalon Infosys",
      location: "Delhi, India",
      period: "Jun 2024 - Aug 2024",
      description: [
        "Developed OpenEMIS mobile dashboard to help users locate and view details of schools in developing countries",
        "Integrated OpenStreetMap with Flutter, rendering vector-based school markers and enabling spatial exploration with custom map layers, improving accessibility of education data by 30%",
        "Focused on performance and offline usability, key for low-connectivity regions, and implemented location-based data rendering with an eye toward user privacy and lightweight geospatial UX"
      ],
      technologies: ["Flutter", "Firebase", "Dart", "Bitbucket"]
    },
    {
      title: "Software Development Intern",
      company: "SMVDU Narayana Hospital",
      location: "Jammu, India",
      period: "July 2022 - August 2022",
      description: [
        "Worked under supervision to develop an algorithm to keep track of vacant beds for admission/discharge of patients during the pandemic, reducing emergency response time by 20%",
        "Maintained a PostgreSQL database of the oxygen availability in the COVID-19 wards and Operation Theatres",
      ],
      technologies: ["Python", "SQL", "Git"]
    },
    {
        title: "Frontend Development Intern",
        company: "TA Digital",
        location: "Remote",
        period: "Dec 2021-Jan 2022",
        description: [
          "Interned as a full-stack web developer and facilitated in making the website more user-friendly/easier to navigate",
          "Conducted 3 user testing rounds and feedback sessions with accessibility checks to promote equitable web design",
        ],
        technologies: ["React", "Bootstrap", "Git"]
      }
  ];

  return (
    <section id="experience" className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
      <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.05, delay: 0.1 }}
    >
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
            Experience
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-blue-400/50 animate-gradient-x"></div>
        </div>
        </motion.div>
        
        <div>
          {experiences.map((exp, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.05, delay: 0.1 }}
              className="group rounded-[8px] p-5 hover:bg-white/5 hover:backdrop-blur-sm transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2)]"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{exp.title}</h3>
                    <div className="flex items-center space-x-4 mt-1.5">
                      <div className="flex items-center text-white/70">
                        <Briefcase size={16} className="mr-2" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center text-white/70">
                        <MapPin size={16} className="mr-2" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Calendar size={16} className="mr-2" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="list-none space-y-1.5 text-white/70">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-sm bg-white/5 rounded-[8px] text-white/70 group-hover:bg-gradient-to-r group-hover:from-purple-400/20 group-hover:to-pink-400/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: experiences.length * 0.1 }}
          className="mt-8 flex justify-center"
        >
          <a
            href="/VG_Resume (3).pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3 rounded-[8px] bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 hover:from-purple-400/30 hover:via-pink-400/30 hover:to-blue-400/30 text-white/70 hover:text-white transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2)] flex items-center gap-2"
          >
            View My Resume <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 