import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const categoryOrder = ['Backend', 'AI/ML', 'Quantum'];

const categoryDescriptions = {
  'AI/ML': 'Research, modeling, and applied machine learning projects.',
  Quantum: 'Quantum computing experiments, optimization, and hybrid workflows.',
  Backend: 'Systems, automation, and backend engineering projects.',
};

const groupedProjects = categoryOrder.map((category) => ({
  category,
  projects: projects.filter((project) => project.category === category),
}));

const categoryCardClass = (theme) =>
  theme === 'dark'
    ? 'rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md p-5 md:p-6'
    : 'rounded-3xl border border-black/15 bg-black/5 backdrop-blur-md p-5 md:p-6';

const categoryTitleClass = (theme) => (theme === 'dark' ? 'text-white' : 'text-black');

const categoryCopyClass = (theme) => (theme === 'dark' ? 'text-gray-300' : 'text-gray-700');

const ProjectsSection = ({ theme }) => {
  return (
    <div className="space-y-10">
      {groupedProjects.map(({ category, projects: categoryProjects }) => (
        <motion.section
          key={category}
          className={categoryCardClass(theme)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${categoryTitleClass(theme)}`}>
                {category}
              </h3>
              <span className={`text-xs uppercase tracking-[0.24em] px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-orange-400/15 text-orange-300' : 'bg-orange-500/10 text-orange-700'}`}>
                {categoryProjects.length} projects
              </span>
            </div>
            <p className={`max-w-3xl text-sm md:text-base leading-relaxed ${categoryCopyClass(theme)}`}>
              {categoryDescriptions[category]}
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {categoryProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="h-full"
              >
                <ProjectCard {...project} theme={theme} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      ))}
    </div>
  );
};

export default ProjectsSection;