import React from 'react';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "Miami International Holdings",
      location: "Princeton, NJ",
      period: "Jun 2025 - Aug 2025",
      description: [
        "Deployed a Spring Kafka library to support the messaging infrastructure for 4 options and an equities exchange",
        "Developed 16 reusable Java convenience methods to streamline offset tracking, enable offset rewind for redis caching, and prevent data loss by bringing down broker unavailability signal handling from 2 minutes to 1 second",
        "Integrated kubeLinter into Jenkins CI pipeline to automatically scan Kubernetes configuration files on pull requests and developed custom linting rules tailored to compliance policies, detecting issues in 70% of PRs"
      ],
      technologies: ["Java", "Spring Kafka", "Kubernetes", "Jenkins", "Python", "Git"],
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
      technologies: ["React Native", "PostgreSQL", "Tailwind CSS", "Git"],
    },
    {
      title: "Software Engineering Intern",
      company: "Avalon Infosys",
      location: "Delhi, India",
      period: "Jun 2024 - Aug 2024",
      description: [
        "Developed OpenEMIS mobile dashboard to help users locate and view details of schools in developing countries",
        "Integrated OpenStreetMap with Flutter, rendering vector-based school markers and enabling spatial exploration with custom map layers, improving accessibility of education data by 30%",
        "Focused on performance and offline usability, key for low-connectivity regions, and implemented location-based data rendering with an eye toward user privacy and lightweight geospatial UX"
      ],
      technologies: ["Flutter", "Firebase", "Dart", "Bitbucket"],
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
      technologies: ["Python", "SQL", "Git"],
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
        technologies: ["React", "Bootstrap", "Git"],
      }
  ];

  return (
    <section id="experience" className="min-h-screen pt-10 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 pt-6"
        >
          <div className="flex flex-col gap-2">
            <p className="text-[0.5rem] uppercase tracking-[0.5em] text-black/50">Experience</p>
            <div className="h-px w-full bg-black/10" />
            <h2 className="text-3xl md:text-3xl font-semibold leading-tight">
              Places where I learned to ship clearly under pressure.
            </h2>
          </div>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company + index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative overflow-hidden rounded-xl border border-black/15 bg-white/80 backdrop-blur px-5 py-6 sm:px-6 group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_65%)]" />
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-4 justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-black">{exp.title}</h3>
                    <p className="text-sm text-black/60">{exp.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-black/55">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={12} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-black/70">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1 h-1 w-1 rounded-full bg-black/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={tech + i}
                      className="px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] border border-black/15 rounded-md text-black/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: experiences.length * 0.05 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="/Vihaan_Gupta_Resume (4).pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-black/15 rounded-md px-8 py-3 text-xs font-medium tracking-[0.35em] uppercase hover:border-black/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            View résumé
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 