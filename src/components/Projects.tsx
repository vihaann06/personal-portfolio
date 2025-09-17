import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, FileText, Figma } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Prodspace",
      description: "Developed a productivity-enhancing web application, featuring tools like a habit tracker and calendar that attract active users from over 63 countries within two years",
      technologies: ["React", "Tailwind CSS"],
      live: "https://prodspace.app",
      github: "https://github.com/vihaann06/prodspace"
    },
    {
      title: "Privacy Loss Parameter Optimization",
      description: "Modeled the theoretical privacy-utility trade-off for individual privacy preferences and developed a Flask-based web application to optimize the privacy loss parameter",
      technologies: ["Python", "Flask"],
      github: "https://github.com/vihaann06/cs208-optimiser/tree/main",
      live: "https://drive.google.com/file/d/1zGXTEXnf2FfZM-pP07fQjHhtTW0M8zHv/view?usp=sharing",
      linkType: "paper"
    },
    {
      title: "Quiz Generator",
      description: "Developed a quiz generator that tests user based on an uploaded PDF, using LLMs to generate questions and grade answers. Upon quiz completion, user is redirected to resources online based on their performance.",
      technologies: ["Python", "Node.js", "LLM API"],
      live: "https://cs1060-itsjackfan-hw1.vercel.app",
      github: "https://github.com/itsjackfan/cs1060-itsjackfan-hw1"
    },
    {
      title: "Ersilia LLM PDF Extractor",
      description: "Developed a Python-based parser tool that extracts desired metadata from research papers using LLMs to help train Machine Learning models",
      technologies: ["Python", "LLM API"],
      github: "https://github.com/ersilia-os/ersilia/blob/master/.github/scripts/summarize_publication_with_llm.py",
    },
    {
      title: "Random Philosophy Quote Generator",
      description: "Developed a Flask-based web application that generates a random philosophy quote by parsing the goodreads philosophy quotes website from over 3000 quotes",
      technologies: ["Flask", "BeautifulSoup", "CSS"],
      github: "https://github.com/vihaann06/Random-Philosopy-Quote",
      live: "https://www.randomphilosophyquote.com/"
    },
    {
      title: "Fantasy World",
      description: "Built a Minecraft-style voxel engine in Unity with C#, featuring chunk-based world generation, real-time terrain modification, and optimized mesh rendering for performance and scalability",
      technologies: ["Unity", "C#", "Binary I/O"],
      github: "https://github.com/vihaann06/fantasyworld",
    },
    {
      title: "Multi-Asset Alert System",
      description: "Built a Python-based portfolio monitoring tool that tracked 20+ crypto and stock assets using CoinGecko and Alpha Vantage APIs, with custom Twilio SMS alerts for threshold-based notifications across multiple markets.",
      technologies: ["Python", "Twilio API"],
    },
    {
      title: "Portfolio Website",
      description: "Developed this portfolio website in React and Tailwind CSS to showcase past experiences and projects",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "Saving Mothers Website Hi-Fidelity Prototype",
      description: "Developed a hi-fidelity prototype for the Saving Mothers website using Figma based on user interviews and competitor analysis",
      technologies: ["Figma"],
      live: "https://www.figma.com/proto/QfCYEngqe0SQs4dB0G1a7k/Saving-Mothers-Hi-Fi-design?node-id=43-130&starting-point-node-id=43%3A130&t=kPqpw26VuqBcPDh0-1",
      linkType: "figma"
    }
  ];

  return (
    <section id="projects" className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.05, delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              Projects
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-blue-400/50 animate-gradient-x"></div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 -mb-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.05, delay: 0.1 }}
              className="group rounded-[8px] p-5 hover:bg-white/5 hover:backdrop-blur-sm transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2)] relative"
            >
              {/* Link Icons */}
              <div className="absolute top-3 right-3 flex items-center space-x-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group/link"
                    title="View on GitHub"
                  >
                    <Github 
                      size={16} 
                      className="text-white/70 group-hover/link:text-purple-400 transition-colors duration-300" 
                    />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group/link"
                    title={project.linkType === "paper" ? "View Paper" : project.linkType === "figma" ? "View Figma Prototype" : "View Live Demo"}
                  >
                    {project.linkType === "paper" ? (
                      <FileText 
                        size={16} 
                        className="text-white/70 group-hover/link:text-purple-400 transition-colors duration-300" 
                      />
                    ) : project.linkType === "figma" ? (
                      <Figma 
                        size={16} 
                        className="text-white/70 group-hover/link:text-purple-400 transition-colors duration-300" 
                      />
                    ) : (
                      <ExternalLink 
                        size={16} 
                        className="text-white/70 group-hover/link:text-purple-400 transition-colors duration-300" 
                      />
                    )}
                  </a>
                )}
              </div>

              <div className="flex flex-col space-y-3">
                <div>
                  <h3 className="text-2xl font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 pr-16">{project.title}</h3>
                  <p className="mt-2 text-white/70">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.map((tech, i) => (
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
      </div>
    </section>
  );
};

export default Projects; 