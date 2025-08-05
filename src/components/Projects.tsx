import React from 'react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Prodspace",
      description: "Developed a productivity-enhancing web application, featuring tools like a habit tracker and calendar that attract active users from over 63 countries within two years",
      technologies: ["React", "Tailwind CSS"],
      github: "https://github.com/yourusername/portfolio",
      live: "https://yourportfolio.com"
    },
    {
      title: "Fantasy World",
      description: "Built a Minecraft-style voxel engine in Unity with C#, featuring chunk-based world generation, real-time terrain modification, and optimized mesh rendering for performance and scalability",
      technologies: ["Unity", "C#", "Binary I/O"],
      github: "https://github.com/vihaann06/fantasyworld/tree/main",
      live: ""
    },
    {
      title: "Ersilia LLM PDF Extractor",
      description: "Developed a Python-based parser tool that extracts desired metadata from research papers using LLMs to help train Machine Learning models",
      technologies: ["Python", "LLM API"],
      github: "https://github.com/yourusername/ersilia-llm-pdf-extractor",
      live: "https://github.com/ersilia-os/ersilia-llm-pdf-extractor"
    },
    {
      title: "Privacy Loss Parameter Optimization",
      description: "Modeled the theoretical privacy-utility trade-off for individual privacy preferences and developed a Flask-based web application to optimize the privacy loss parameter",
      technologies: ["Python", "Flask"],
      github: "https://github.com/yourusername/privacy-loss-parameter-optimization",
      live: "https://github.com/yourusername/privacy-loss-parameter-optimization"
    },
    {
      title: "Random Philosophy Quote Generator",
      description: "Developed a Flask-based web application that generates a random philosophy quote by parsing the goodreads philosophy quotes website from over 3000 quotes",
      technologies: ["Flask", "BeautifulSoup", "CSS"],
      github: "https://github.com/yourusername/recipes",
      live: "https://yourrecipes.com"
    },
    {
      title: "Multi-Asset Alert System",
      description: "Built a Python-based portfolio monitoring tool that tracked 20+ crypto and stock assets using CoinGecko and Alpha Vantage APIs, with custom Twilio SMS alerts for threshold-based notifications across multiple markets.",
      technologies: ["Python", "Twilio API"],
      github: "https://github.com/yourusername/multi-asset-alert-system",
      live: "https://yourmultiassetalerts.com"
    },
    {
      title: "Portfolio Website",
      description: "Developed this portfolio website in React and Tailwind CSS to showcase past experiences and projects",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/yourusername/portfolio",
      live: "https://yourportfolio.com"
    },
    {
      title: "Saving Mothers Website Hi-Fidelity Prototype",
      description: "Developed a hi-fidelity prototype for the Saving Mothers website using Figma based on user interviews and competitor analysis",
      technologies: ["Figma"],
      github: "https://github.com/yourusername/chat",
      live: "https://yourchat.com"
    },
    {
      title: "Milkar Pakistan Mobile App Hi-Fidelity Prototype",
      description: "Developed a hi-fidelity prototype for the Milkar Pakistan mobile app using Figma to include elements of gamification and social media integration",
      technologies: ["Figma"],
      github: "https://github.com/yourusername/milkar-prototype",
      live: "https://yourmilkar.com"
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
              className="group rounded-[8px] p-5 hover:bg-white/5 hover:backdrop-blur-sm transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2)]"
            >
              <div className="flex flex-col space-y-3">
                <div>
                  <h3 className="text-2xl font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{project.title}</h3>
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