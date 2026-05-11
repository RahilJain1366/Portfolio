import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SkillBadge = ({ skill, theme = 'dark' }) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.span
      className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 will-change-transform ${
        theme === 'dark'
          ? 'bg-orange-500 text-gray-900 hover:bg-orange-400'
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
      whileHover={!prefersReducedMotion ? { scale: 1.05, y: -2 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {skill}
    </motion.span>
  );
};

const ProjectCard = ({ title, timeframe, skills, description, link, theme = 'dark' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const descriptionText = Array.isArray(description) ? description.join(' ') : description;

  return (
    <motion.article
      className={`h-full rounded-2xl shadow-xl p-6 border backdrop-blur-md transition-all duration-300 will-change-transform cursor-default flex flex-col ${
        theme === 'dark'
          ? 'bg-white/8 border-white/15 hover:bg-white/12 hover:border-white/25'
          : 'bg-black/8 border-black/15 hover:bg-black/12 hover:border-black/25'
      }`}
      onHoverStart={() => !prefersReducedMotion && setIsHovered(true)}
      onHoverEnd={() => !prefersReducedMotion && setIsHovered(false)}
      animate={
        isHovered && !prefersReducedMotion
          ? { translateY: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }
          : { translateY: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }
      }
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {title}
          </h3>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {timeframe}
          </p>
        </div>
      </div>

      <p className={`text-sm leading-relaxed mb-4 flex-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
        {descriptionText}
      </p>

      <div className="mt-auto flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} theme={theme} />
        ))}
      </div>

      {link && (
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:opacity-70 mt-5 inline-block text-sm font-semibold transition-opacity duration-200 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}
          whileHover={!prefersReducedMotion ? { x: 4 } : undefined}
          transition={{ duration: 0.2 }}
        >
          GitHub Repo →
        </motion.a>
      )}
    </motion.article>
  );
};

export default ProjectCard;