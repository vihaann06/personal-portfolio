import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, FileText, Figma } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Lumi.ai",
      description: "An AI-powered PDF workspace that lets users highlight any passage and instantly generate context-aware explanations, abstractive summaries, and properly formatted citations from the selected text.",
      technologies: ["React", "Supabase", "Tailwind CSS", "OpenAI API"],
      live: "https://ai-reader-two.vercel.app/",
      github: "https://github.com/vihaann06/AI-reader"
    },
    {
      title: "Graphene",
      description: "A visualisation tool that lets users discover research papers in a given field by clustering them based on citations, author names, and keywords.",
      technologies: ["D3.js", "Next.js", "Tailwind CSS", "Gemini API", "Firebase"],
      live: "https://graph-project-theta.vercel.app/",
      github: "https://github.com/cs1060f25/graph-project"
    },
    {
      title: "COMPASS",
      description: "A context-aware privacy tool that lets users define their privacy preferences for Software Engnineering environments and generate a custom config file based on their preferences.",
      technologies: ["Next.js", "TypeScript", "OpenAI API", "Firebase"],
      github: "https://github.com/Tapiocaba/contextual-llm-privacy"
    },
    {
      title: "Reinforcement Learning for Inventory Control",
      description: "Implemented a tabular Q-learning agent for a finite-horizon inventory control problem, learning a near–base-stock policy through interaction alone. Compared against canonical inventory heuristics and stabilized training for longer horizons using adaptive learning rates.",
      technologies: ["React", "Supabase", "Tailwind CSS", "OpenAI API"],
      github: "https://github.com/vihaann06/inventory-prediction"
    },
    {
      title: "Prodspace",
      description: "Developed a productivity-enhancing web application, featuring tools like a habit tracker and calendar that attract active users from over 63 countries within two years",
      technologies: ["React", "Tailwind CSS", "Supabase"],
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
  ];

  return (
    <section id="projects" className="min-h-screen pt-10 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-2">
            <p className="text-[0.5rem] uppercase tracking-[0.5em] text-black/50">Projects</p>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-3xl font-semibold leading-tight">
                Experiments, shipped products, and research tools.
            </h2>
              <span className="text-xs text-black/50">10 selected works</span>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="relative rounded-[1.6rem] border border-black/10 bg-white/75 backdrop-blur px-5 py-6"
            >
              <h3 className="text-xl font-semibold text-black">{project.title}</h3>
              <p className="mt-2 text-sm text-black/65">{project.description}</p>

              <div className="flex flex-wrap gap-2 pt-4">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={`${project.title}-${tech}-${i}`}
                    className="px-3 py-1 text-[0.6rem] uppercase tracking-[0.35em] border border-black/10 rounded-full text-black/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full border border-black/10 hover:border-black/30 transition-all duration-300"
                    title="View on GitHub"
                  >
                    <Github size={14} className="text-black/60" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full border border-black/10 hover:border-black/30 transition-all duration-300"
                    title={
                      project.linkType === 'paper'
                        ? 'View paper'
                        : project.linkType === 'figma'
                        ? 'View Figma prototype'
                        : 'View live demo'
                    }
                  >
                    {project.linkType === 'paper' ? (
                      <FileText size={14} className="text-black/60" />
                    ) : project.linkType === 'figma' ? (
                      <Figma size={14} className="text-black/60" />
                    ) : (
                      <ExternalLink size={14} className="text-black/60" />
                    )}
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 