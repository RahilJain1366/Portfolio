import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, useCycle } from 'framer-motion';

const socialLinks = [
  { href: 'mailto:rahiljain1366@gmail.com', icon: <FaEnvelope />, label: 'Email' },
  { href: 'https://www.linkedin.com/in/rahil-jain-3129961b5/', icon: <FaLinkedin />, label: 'LinkedIn' },
  { href: 'https://github.com/RahilJain1366', icon: <FaGithub />, label: 'GitHub' },
  { href: 'https://drive.google.com/file/d/1tHLSmWi7w_QUXEoGtk3v1Esr2xFe2S2v/view?usp=sharing', icon: <FaFileDownload />, label: 'Resume' },
];

const SocialLink = ({ href, icon, label, download }) => (
  <a
    href={href}
    target={download ? '_self' : '_blank'}
    rel={download ? undefined : 'noopener noreferrer'}
    download={download}
    aria-label={label}
    className="flex items-center gap-2 hover:underline hover:text-orange-400 transition duration-300 text-gray-800 dark:text-gray-300"
  >
    {icon} {label}
  </a>
);

const SkillBadge = ({ skill, theme = 'dark' }) => (
  <span className={`inline-block text-xs font-semibold mr-2 px-2.5 py-1 rounded-full ${
    theme === 'dark'
      ? 'bg-orange-500 text-gray-900'
      : 'bg-gray-100 text-gray-900'
  }`}>
    {skill}
  </span>
);

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-700 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-700 dark:bg-gray-600 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-700 dark:bg-gray-600 rounded w-5/6 mb-2"></div>
    <div className="h-4 bg-gray-700 dark:bg-gray-600 rounded w-4/6"></div>
  </div>
);

const SkeletonCard = () => (
  <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-100 rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
    <div className="space-y-2 mb-4">
      <div className="h-3 bg-gray-700 rounded w-full"></div>
      <div className="h-3 bg-gray-700 rounded w-5/6"></div>
      <div className="h-3 bg-gray-700 rounded w-4/6"></div>
    </div>
    <div className="flex gap-2">
      <div className="h-6 bg-gray-700 rounded-full w-16"></div>
      <div className="h-6 bg-gray-700 rounded-full w-16"></div>
      <div className="h-6 bg-gray-700 rounded-full w-16"></div>
    </div>
  </div>
);


const ProjectCard = ({ title, timeframe, skills, description, link, image, theme = 'dark' }) => (
  <article className={`rounded-lg shadow-md p-6 hover:scale-[1.01] transition-transform duration-300 ${
    theme === 'dark'
      ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-100'
      : 'bg-white border-2 border-gray-200 shadow-lg text-black'
  }`}>
    <h3 className={`text-xl font-semibold ${
      theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
    }`}>{title}</h3>
    <p className={`text-sm ${
      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
    }`}>{timeframe}</p>
    <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
      {/*description.map((point, idx) => (
        <li key={idx}>{point}</li>
      ))*/
        description.join(' ')
      }
    </ul>
    <div className="mt-3 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <SkillBadge key={skill} skill={skill} theme={theme} />
      ))}
    </div>
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`hover:underline mt-2 inline-block ${
          theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
        }`}
      >
        GitHub Repo →
      </a>
    )}
  </article>
);

const WorkCard = ({ title, timeframe, skills, description, link, image, theme = 'dark' }) => (
  <article className={`rounded-lg shadow-md p-6 hover:scale-[1.01] transition-transform duration-300 ${
    theme === 'dark'
      ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-100'
      : 'bg-white border-2 border-gray-200 text-black shadow-lg'
  }`}>
    <h3 className={`text-xl font-semibold ${
      theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
    }`}>{title}</h3>
    <p className={`text-sm ${
      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
    }`}>{timeframe}</p>
    <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
      {description.map((point, idx) => (
        <li key={idx}>{point}</li>
      ))
      }
    </ul>
    <div className="mt-3 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <SkillBadge key={skill} skill={skill} theme={theme} />
      ))}
    </div>
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`hover:underline mt-2 inline-block ${
          theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
        }`}
      >
        GitHub Repo →
      </a>
    )}
  </article>
);

const cycleWords = ["Code", "Develop", "Test", "Deploy"];

const AnimatedCycleWords = ({ theme }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % cycleWords.length);
    }, 2000); // Change every 2 seconds
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.h6
      key={cycleWords[index]}
      className={`text-2xl md:text-3xl font-mono font-bold mb-4 h-[2.5rem] ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      Here to <span className={theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}>{cycleWords[index]}</span>.
    </motion.h6>
  );
};


const Section = ({ id, title, children, theme = 'dark' }) => (
  <section id={id} className="mb-10" data-aos="fade-up">
    <h2 className={`text-4xl md:text-5xl font-extrabold mb-8 tracking-tight inline-block px-4 py-2 rounded-lg shadow text-center w-full ${
      theme === 'dark'
        ? 'bg-gradient-to-r from-black via-gray-800 to-black text-orange-400'
        : 'bg-white text-orange-600 border-2 border-gray-200'
    }`}>
      {title}
    </h2>
    <div className={theme === 'dark' ? 'text-gray-200' : 'text-black'}>
      {children}
    </div>
  </section>
);

const QuantumCircuitHeader = ({ theme, toggleTheme, mobileMenuOpen, setMobileMenuOpen }) => (
  <header id="home" className={`relative w-full min-h-[90vh] flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
    theme === 'dark' 
      ? 'bg-gradient-to-r from-black via-gray-800 to-black' 
      : 'bg-white'
  }`}>
    {/* Starry background */}
    <div className="absolute inset-0 w-full h-full z-0">
      <div className="absolute w-1 h-1 bg-white rounded-full opacity-80 animate-pulse" style={{ top: '10%', left: '15%', animationDelay: '0s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full opacity-70 animate-pulse" style={{ top: '20%', left: '80%', animationDelay: '1s' }}></div>
      <div className="absolute w-1.5 h-1.5 bg-blue-300 rounded-full opacity-60 animate-pulse" style={{ top: '15%', left: '60%', animationDelay: '2s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-90" style={{ top: '8%', left: '30%' }}></div>
      <div className="absolute w-1 h-1 bg-orange-300 rounded-full opacity-75 animate-pulse" style={{ top: '25%', left: '10%', animationDelay: '1.5s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-blue-200 rounded-full opacity-80" style={{ top: '12%', left: '90%' }}></div>
      <div className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse" style={{ top: '30%', left: '70%', animationDelay: '0.5s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full opacity-85" style={{ top: '18%', left: '45%' }}></div>
      <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-pulse" style={{ top: '35%', left: '25%', animationDelay: '2.5s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full opacity-75" style={{ top: '22%', left: '85%' }}></div>
      <div className="absolute w-1 h-1 bg-orange-300 rounded-full opacity-80 animate-pulse" style={{ top: '40%', left: '5%', animationDelay: '1.2s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-70" style={{ top: '28%', left: '95%' }}></div>
      <div className="absolute w-1 h-1 bg-blue-200 rounded-full opacity-65 animate-pulse" style={{ top: '45%', left: '55%', animationDelay: '3s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full opacity-90" style={{ top: '38%', left: '35%' }}></div>
      <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-55 animate-pulse" style={{ top: '50%', left: '15%', animationDelay: '0.8s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full opacity-80" style={{ top: '42%', left: '75%' }}></div>
      <div className="absolute w-1 h-1 bg-orange-300 rounded-full opacity-70 animate-pulse" style={{ top: '55%', left: '90%', animationDelay: '2.2s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-85" style={{ top: '48%', left: '40%' }}></div>
      <div className="absolute w-1 h-1 bg-blue-200 rounded-full opacity-60 animate-pulse" style={{ top: '60%', left: '20%', animationDelay: '1.8s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full opacity-75" style={{ top: '52%', left: '65%' }}></div>
      <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-pulse" style={{ top: '65%', left: '80%', animationDelay: '2.8s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full opacity-85" style={{ top: '58%', left: '10%' }}></div>
      <div className="absolute w-1 h-1 bg-orange-300 rounded-full opacity-65 animate-pulse" style={{ top: '70%', left: '50%', animationDelay: '0.3s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-90" style={{ top: '62%', left: '85%' }}></div>
      <div className="absolute w-1 h-1 bg-blue-200 rounded-full opacity-70 animate-pulse" style={{ top: '75%', left: '30%', animationDelay: '2.5s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full opacity-80" style={{ top: '68%', left: '95%' }}></div>
      <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-45 animate-pulse" style={{ top: '80%', left: '60%', animationDelay: '1.3s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full opacity-75" style={{ top: '72%', left: '15%' }}></div>
      <div className="absolute w-1 h-1 bg-orange-300 rounded-full opacity-85 animate-pulse" style={{ top: '85%', left: '40%', animationDelay: '2.7s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60" style={{ top: '78%', left: '70%' }}></div>
    </div>
    {/* Split circuit SVG background */}
    <svg
      className="absolute inset-0 w-full h-full z-10"
      viewBox="0 0 1600 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents: 'none' }}
    >
      {/* Left side: dark circuit */}
      <g opacity="0.18">
        <rect x="0" y="0" width="800" height="800" fill="#18181b" />
        <circle cx="120" cy="120" r="8" fill="#38bdf8" />
        <line x1="120" y1="120" x2="320" y2="120" stroke="#38bdf8" strokeWidth="4" />
        <circle cx="320" cy="120" r="8" fill="#38bdf8" />
        <line x1="320" y1="120" x2="320" y2="320" stroke="#38bdf8" strokeWidth="4" />
        <circle cx="320" cy="320" r="8" fill="#38bdf8" />
      </g>
      {/* Right side: dark circuit */}
      <g opacity="0.13">
        <rect x="800" y="0" width="800" height="800" fill="#27272a" />
        <circle cx="1200" cy="200" r="8" fill="#60a5fa" />
        <line x1="1200" y1="200" x2="1400" y2="200" stroke="#60a5fa" strokeWidth="4" />
        <circle cx="1400" cy="200" r="8" fill="#60a5fa" />
        <line x1="1400" y1="200" x2="1400" y2="400" stroke="#60a5fa" strokeWidth="4" />
        <circle cx="1400" cy="400" r="8" fill="#60a5fa" />
      </g>
    </svg>
    {/* Sticky Top nav bar with animated links */}
<nav className={`fixed top-0 z-50 flex justify-between items-center w-full pt-3 md:pt-8 pb-2 md:pb-4 backdrop-blur-md border-b transition-colors duration-500 px-4 ${
  theme === 'dark'
    ? 'bg-gradient-to-r from-black via-gray-800 to-black/80 border-white/10'
    : 'bg-white/95 border-gray-200 shadow-sm'
}`}>
  {/* Mobile Menu Button */}
  <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className={`lg:hidden p-2 rounded-lg transition-colors ${
      theme === 'dark' ? 'text-orange-400 hover:bg-gray-700' : 'text-orange-600 hover:bg-gray-200'
    }`}
    aria-label="Toggle mobile menu"
  >
    {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
  </button>

  {/* Desktop Navigation */}
  <ul className={`hidden lg:flex gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl font-bold mx-auto ${
    mobileMenuOpen ? 'flex-col absolute top-full left-0 right-0 bg-inherit p-4 shadow-lg' : ''
  }`}>
    {[
      {id:'#home',label:'Home'},
      {id:'#about',label:'About'},
      {id:'#experience',label:'Experience'},
      {id:'#projects',label:' Projects'},
      {id:'#opensource',label:'Open Source'},
      {id:'#certs',label:'Certifications'},
    ].map((item,i)=>(
      <motion.li
        key={item.id}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 + i * 0.12, type: 'spring' }}
        whileHover={{ scale: 1.13 }}
      >
        <a
        href={item.id}
        onClick={e => {
          e.preventDefault();
          const el = document.getElementById(item.id.replace('#', ''));
          if (el) {
            const yOffset = window.innerWidth < 640 ? -40 : window.innerWidth < 768 ? -50 : -80;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
          setMobileMenuOpen(false);
        }}
        className={`transition-colors duration-200 whitespace-nowrap ${
          theme === 'dark'
            ? 'text-orange-400 hover:text-orange-300'
            : 'text-orange-600 hover:text-orange-700'
        }`}
      >
        {item.label}
      </a>
      </motion.li>
    ))}
  </ul>

  {/* Mobile Navigation Dropdown */}
  {mobileMenuOpen && (
    <motion.ul
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`lg:hidden absolute top-full left-0 right-0 flex flex-col gap-2 p-4 shadow-lg border-b transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-black via-gray-800 to-black border-white/10'
          : 'bg-white border-gray-200'
      }`}
    >
      {[
        {id:'#home',label:'Home'},
        {id:'#about',label:'About'},
        {id:'#experience',label:'Experience'},
        {id:'#projects',label:' Projects'},
        {id:'#opensource',label:'Open Source'},
        {id:'#certs',label:'Certifications'},
      ].map((item,i)=>(
        <li key={item.id} className="text-center">
          <a
          href={item.id}
          onClick={e => {
            e.preventDefault();
            const el = document.getElementById(item.id.replace('#', ''));
            if (el) {
              const yOffset = window.innerWidth < 640 ? -40 : window.innerWidth < 768 ? -50 : -80;
              const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
            setMobileMenuOpen(false);
          }}
          className={`block py-2 px-4 rounded transition-colors duration-200 whitespace-nowrap ${
            theme === 'dark'
              ? 'text-orange-400 hover:text-orange-300 hover:bg-gray-700'
              : 'text-orange-600 hover:text-orange-700 hover:bg-gray-200'
          }`}
        >
          {item.label}
        </a>
        </li>
      ))}
    </motion.ul>
  )}

  {/* Theme Toggle Button */}
  <button
    onClick={toggleTheme}
    className={`p-2 rounded-lg transition-all duration-300 ${
      theme === 'dark'
        ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }`}
    aria-label="Toggle theme"
  >
    <motion.div
      initial={false}
      animate={{ rotate: theme === 'dark' ? 0 : 180 }}
      transition={{ duration: 0.3 }}
    >
      {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
    </motion.div>
  </button>
</nav>

{/* Centered hero content with animated name and subtitle */}
<div className="relative z-20 flex flex-col items-center justify-center flex-1 text-center px-4 mt-4 md:mt-8">
  <motion.span
    className={`uppercase text-sm md:text-[18px] tracking-widest font-bold mb-2 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.3 }}
  >Hi, my name is </motion.span>
  <motion.h1
    className={`text-5xl md:text-6xl font-bold mb-2 ${
      theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
    }`}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.7, delay: 0.5, type: 'spring' }}
  >Rahil Jain</motion.h1>
  <br />

  <motion.h2
    className={`text-xl md:text-2xl font-mono font-bold mb-6 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 1.1 }}
  >I'm a <span className={theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}>Software Development Engineer</span></motion.h2>

  <AnimatedCycleWords theme={theme} />
  <motion.div
    className="flex flex-wrap gap-4 justify-center mt-2"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 1.3,
        },
      },
    }}
  >
    {socialLinks.map(({ href, icon, label, download }, i) => (
      <motion.a
        key={label}
        href={href}
        target={download ? '_self' : '_blank'}
        rel={download ? undefined : 'noopener noreferrer'}
        download={download}
        aria-label={label}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow transition ${
          theme === 'dark'
            ? 'bg-white/20 hover:bg-orange-400 text-white hover:text-gray-900'
            : 'bg-gray-200 hover:bg-orange-500 text-gray-900 hover:text-white'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
        whileHover={{ scale: 1.1 }}
      >
        {icon} {label}
      </motion.a>
    ))}
  </motion.div>

</div>
</header>
);


const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });

    console.log("%c👋 Curious Dev!", "color: orange; font-weight: bold; font-size: 16px;");
    console.log("Welcome to Rahil Jain's Portfolio!");
    console.log("%cHint: Type 'quantum' in the console and press Enter for a surprise...", "color: cyan; font-style: italic;");
    console.log("💡 I'm a quantum computing enthusiast, so the magic word might be a clue 😉");

    const quantumEasterEgg = () => {
      alert('🪐 Quantum Realm Unlocked!\nYou have discovered Rahil\'s secret project lab.\nLet\'s build something wild with qubits and code!\nPress Esc to exit');
      window.open('https://github.com/RahilJain1366', '_blank');
    };

    const onKeydown = (function () {
      let buffer = '';
      return function (e) {
        buffer += e.key.toLowerCase();
        if (buffer.length > 10) buffer = buffer.slice(-10);
        if (buffer.includes('quantum')) {
          quantumEasterEgg();
          buffer = '';
        }
      };
    })();

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gradient-to-r from-black via-gray-800 to-black' : 'bg-white'
      }`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mb-4"></div>
          <p className={theme === 'dark' ? 'text-white text-xl' : 'text-black text-xl font-semibold'}>Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative min-h-screen transition-colors duration-500 overflow-hidden ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-black via-gray-800 to-black text-gray-100'
          : 'bg-white text-black'
      }`}
    >
      {/* Extended starry background for entire body*/}
      <div className="fixed inset-0 w-full h-full z-0">
        {/* Upper section stars */}
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-80 animate-pulse" style={{ top: '5%', left: '12%', animationDelay: '0s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full opacity-70 animate-pulse" style={{ top: '8%', left: '88%', animationDelay: '1s' }}></div>
        <div className="absolute w-1.5 h-1.5 bg-blue-300 rounded-full opacity-60 animate-pulse" style={{ top: '12%', left: '65%', animationDelay: '2s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-90" style={{ top: '15%', left: '25%' }}></div>
        <div className="absolute w-1 h-1 bg-orange-300 rounded-full opacity-75 animate-pulse" style={{ top: '18%', left: '5%', animationDelay: '1.5s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-blue-200 rounded-full opacity-80" style={{ top: '22%', left: '95%' }}></div>
        
        {/* Middle section stars */}
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse" style={{ top: '35%', left: '18%', animationDelay: '0.5s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full opacity-85" style={{ top: '38%', left: '72%' }}></div>
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-pulse" style={{ top: '42%', left: '8%', animationDelay: '2.5s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full opacity-75" style={{ top: '45%', left: '92%' }}></div>
        <div className="absolute w-1 h-1 bg-orange-300 rounded-full opacity-80 animate-pulse" style={{ top: '48%', left: '35%', animationDelay: '1.2s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-70" style={{ top: '52%', left: '58%' }}></div>
        <div className="absolute w-1 h-1 bg-blue-200 rounded-full opacity-65 animate-pulse" style={{ top: '55%', left: '15%', animationDelay: '3s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full opacity-90" style={{ top: '58%', left: '85%' }}></div>
        
        {/* Lower section stars */}
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-55 animate-pulse" style={{ top: '65%', left: '22%', animationDelay: '0.8s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full opacity-80" style={{ top: '68%', left: '78%' }}></div>
        <div className="absolute w-1 h-1 bg-orange-300 rounded-full opacity-70 animate-pulse" style={{ top: '72%', left: '5%', animationDelay: '2.2s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-85" style={{ top: '75%', left: '45%' }}></div>
        <div className="absolute w-1 h-1 bg-blue-200 rounded-full opacity-60 animate-pulse" style={{ top: '78%', left: '88%', animationDelay: '1.8s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full opacity-75" style={{ top: '82%', left: '12%' }}></div>
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-pulse" style={{ top: '85%', left: '68%', animationDelay: '2.8s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full opacity-85" style={{ top: '88%', left: '35%' }}></div>
        <div className="absolute w-1 h-1 bg-orange-300 rounded-full opacity-65 animate-pulse" style={{ top: '92%', left: '82%', animationDelay: '0.3s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-90" style={{ top: '95%', left: '28%' }}></div>
        
        {/* Additional scattered stars for density */}
        <div className="absolute w-0.5 h-0.5 bg-blue-200 rounded-full opacity-70" style={{ top: '28%', left: '42%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse" style={{ top: '32%', left: '78%', animationDelay: '1.7s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-orange-300 rounded-full opacity-80" style={{ top: '62%', left: '48%' }}></div>
        <div className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-75 animate-pulse" style={{ top: '25%', left: '52%', animationDelay: '2.3s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-65" style={{ top: '38%', left: '28%' }}></div>
        <div className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full opacity-55 animate-pulse" style={{ top: '72%', left: '62%', animationDelay: '1.1s' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-blue-200 rounded-full opacity-85" style={{ top: '82%', left: '52%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse" style={{ top: '15%', left: '75%', animationDelay: '2.7s' }}></div>
      </div>
      
      <QuantumCircuitHeader 
        theme={theme} 
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 mt-0">
        {/* About Section */}
        <Section id="about" title="About Me" theme={theme}>
        <div className="flex flex-col md:flex-row items-stretch gap-8 p-0 overflow-hidden">
          <div className="w-full md:w-1/3 flex-shrink-0 flex items-stretch">
            <img
              src={process.env.PUBLIC_URL + '/rahil-profile.jpg'}
              alt="Portrait of Rahil Jain - Software Engineer specializing in Machine Learning and Quantum Computing"
              loading="lazy"
              className="object-cover w-full h-full md:h-auto md:min-h-[400px] md:max-h-none"
              style={{ minHeight: '350px', maxHeight: '100%', objectPosition: 'center top' }}
            />
          </div>
          <div className="flex-1 flex items-center p-6 md:p-10">
            <p className="text-left">
              I'm a graduate student in Computer Engineering at the University of Texas at Dallas, specializing in Applied Machine Learning, with a CGPA of 3.94. My interests span machine learning, quantum computing, embedded systems, and scalable backend development.
              <br /><br />
              I've worked on projects involving binary neural networks, hybrid CNN-ViT models for image classification, Jira automation tools, and full-stack applications using Python, Bash, Flask, and React. I'm also exploring quantum computing through circuit simulations and frameworks like Qiskit, focusing on its potential in optimization and AI.
              <br /><br />
              I'm passionate about building intelligent, efficient systems that connect research with real-world impact.
            </p>
          </div>
        </div>
      </Section>

        {/* Experience Section */}
        <Section id="experience" title="Experience" theme={theme}>
          <div>
            <div className="flex flex-col gap-8">
              <div className={`min-w-[320px] rounded-2xl shadow-lg border p-5 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-white/30'
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <WorkCard
                  title="Software Engineering Intern, Motorola Solutions Inc, Allen, USA"
                  timeframe="May 2025 – Present"
                  skills={["C++", "Python", "Linux", "SQL", "PowerShell"]}
                  theme={theme}
                  description={[
                    "Engineered backend automation scripts using Python and Bash to log, monitor, and report on firewall rules and agent activity for the Wave Radio Gateway, reducing manual tasks by 60%, and accelerating response to network anomalies.",
                    "Validated and optimized RESTful APIs for the Wave Radio Gateway Lifecycle Management System using Postman and Python, ensuring robust backend integration, improving system reliability, and reducing API latency by 30%.",
                    "Implemented DTLS connection verification in C++ using OpenSSL to decrypt and validate secure files, ensuring encrypted data integrity, enhancing diagnostics, and supporting secure communication across the Wave Radio Gateway platform.",
                    "Wrote Python scripts to build ISO images for deploying and initializing KVM-based virtual environments, simplifying provisioning and accelerating test setup.",
                    "Built a Node.js backend to orchestrate Dockerized containers for the Lifecycle Management System (LCMS) while sustaining WebSocket channels for continuous real-time communication.",
                    "Integrated DTLS and TLS layers with C++ and OpenSSL within containerized microservices to strengthen data protection and secure inter-service traffic."
                  ]}
                />
              </div>
              <div className={`min-w-[320px] rounded-2xl shadow-lg border p-5 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-white/30'
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <WorkCard
                  title="Student Assistant, University of Texas at Dallas, Richardson, USA"
                  timeframe="January 2025 – April 2025"
                  skills={["BNN", "FPGA", "Python", "MNIST", "CIFAR-10"]}
                  theme={theme}
                  description={[
                    "Built a custom Binary Neural Network (BNN) using probabilistic computing principles for efficient FPGA deployment.",
                    "Designed a custom loss function and fine-tuned training strategies to address convergence and stability issues in binary models.",
                    "Optimized the model for bit-wise operations, making it highly suitable for low-power hardware environments.",
                    "Achieved 85% accuracy on MNIST and 60% on CIFAR-10, resulting in a stable and efficient BNN ready for embedded systems."
                  ]}
                />
              </div>
              <div className={`min-w-[320px] rounded-2xl shadow-lg border p-5 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-white/30'
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <WorkCard
                  title="Software Engineer, Bafna Sons, Chennai, India"
                  timeframe="May 2023 – July 2024"
                  skills={["Pandas", "Seaborn", "Matplotlib", "Django"]}
                  theme={theme}
                  description={[
                    "Designed interactive dashboards for inventory management using Pandas, Seaborn, and Matplotlib.",
                    "Streamlined product performance analysis, leading to a 20% increase in inventory turnover in Q1 2024.",
                    "Built a Django-based backend system to manage inventory and deliver real-time insights to 5+ internal teams.",
                    "Automated daily sales and stock reconciliation tasks, reducing manual effort by over 40%.",
                    "Integrated alert systems for low-stock and overstock scenarios to optimize restocking decisions.",
                    "Collaborated with the operations team to define data-driven KPIs and visualizations for monthly reviews.",
                    "Improved backend query performance by indexing key database fields, reducing data fetch times by 60%."
                  ]}
                />
              </div>
              <div className={`min-w-[320px] rounded-2xl shadow-lg border p-5 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-white/30'
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <WorkCard
                  title="Software Engineer, Temenos India Pvt Ltd, Chennai, India"
                  timeframe="August 2021 – February 2023"
                  skills={["Java", "JQL", "InfoBasic", "APIs"]}
                  theme={theme}
                  description={[
                    "Led Java-based Trading Calendar API development for two country-specific banks, improving compliance and operational efficiency by 10%.",
                    "Directed migration of 1000+ APIs from R07 to R20 for 15+ banks using InfoBasic, Java, and JQL, ensuring smooth platform upgrades.",
                    "Resolved high-priority bugs during beta testing phases, ensuring full regulatory compliance before release deadlines.",
                    "Received the Tstar Award for high-quality delivery and technical leadership in the Trading Calendar API project (Q4 2022).",
                    "Collaborated cross-functionally with QA and business teams to gather requirements and validate core functionalities.",
                    "Enhanced system documentation and API specs, reducing onboarding time for new developers by 30%.",
                    "Optimized legacy API logic, reducing execution time for critical operations by up to 25%."
                  ]}
                />
              </div>
              <div className={`min-w-[320px] rounded-2xl shadow-lg border p-5 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-white/30'
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <WorkCard
                  title="Software Engineer Intern, Temenos India Pvt Ltd, Chennai, India"
                  timeframe="February 2021 – August 2021"
                  skills={["Java", "SQL", "API Design"]}
                  theme={theme}
                  description={[
                    "Contributed to Java-based Teller API design, enabling seamless integration with Teller Blotter systems for improved transaction tracking.",
                    "Assisted the R&D team in enhancing features of the T24 core banking product, focusing on stability and modularity.",
                    "Earned certifications in Payments API, Java, and SQL, demonstrating commitment to technical proficiency and product knowledge.",
                    "Developed test cases and performed unit testing to validate key API functionalities prior to rollout.",
                    "Collaborated with senior engineers to troubleshoot integration issues, reducing turnaround time by 30%.",
                    "Documented API workflows and system interactions to support knowledge transfer and ongoing development."
                  ]}
                />
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* Skills Section - Full Width */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6">
        <Section id="skills" title="Skills" theme={theme}>
          <div className="flex flex-row flex-wrap gap-10 justify-between">
            {/* Programming */}
            <div className={`min-w-[220px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>Programming</h3>
              <motion.div className="flex flex-wrap gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}>
                {[
                  "Python", "C++", "Java", "Bash"
                ].map((skill, i) => (
                  <motion.div key={skill} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}>
                    <SkillBadge skill={skill} theme={theme} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* ML and DL*/}
            <div className={`min-w-[220px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>Machine Learning & Deep Learning</h3>
              <motion.div className="flex flex-wrap gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}>
                {[
                  "TensorFlow", "PyTorch", "Scikit-learn"
                ].map((skill, i) => (
                  <motion.div key={skill} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}>
                    <SkillBadge skill={skill} theme={theme} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* Web Development */}
            <div className={`min-w-[220px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>Web Development</h3>
              <motion.div className="flex flex-wrap gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}>
                {[
                  "Django", "Flask", "React", "Nodejs"
                ].map((skill, i) => (
                  <motion.div key={skill} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}>
                    <SkillBadge skill={skill} theme={theme} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* Quantum Computing */}
            <div className={`min-w-[220px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>Quantum Computing</h3>
              <motion.div className="flex flex-wrap gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}>
                {[
                  "Qiskit", "Cirq", "PennyLane"
                ].map((skill, i) => (
                  <motion.div key={skill} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}>
                    <SkillBadge skill={skill} theme={theme} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* Data Visualization */}
            <div className={`min-w-[220px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>Data Visualization</h3>
              <motion.div className="flex flex-wrap gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}>
                {[
                  "Pandas", "Matplotlib", "Seaborn"
                ].map((skill, i) => (
                  <motion.div key={skill} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}>
                    <SkillBadge skill={skill} theme={theme} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* Tools & Platforms */}
            <div className={`min-w-[220px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>Tools & Platforms</h3>
              <motion.div className="flex flex-wrap gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}>
                {[
                  "Docker", "Git", "Linux", "CocoAnnotator","Postman"
                ].map((skill, i) => (
                  <motion.div key={skill} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}>
                    <SkillBadge skill={skill} theme={theme} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* Databases & Data */}
            <div className={`min-w-[220px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>Databases & Data</h3>
              <motion.div className="flex flex-wrap gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}>
                {[
                  "PostgreSQL", "MongoDB", "Cassandra"
                ].map((skill, i) => (
                  <motion.div key={skill} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}>
                    <SkillBadge skill={skill} theme={theme} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* Web & UI */}
            <div className={`min-w-[120px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>Web & UI</h3>
              <motion.div className="flex flex-wrap gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}>
                {[
                  "HTML", "CSS"
                ].map((skill, i) => (
                  <motion.div key={skill} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}>
                    <SkillBadge skill={skill} theme={theme} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </Section>
      </div>

      {/* Projects Section */}
      <main className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6">
        <Section id="projects" title="Projects" theme={theme}>
          <div className="flex flex-col gap-8 justify-between">
            <div className={`min-w-[320px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <ProjectCard
                title="Implementation of a Real-Time Currency Converter in Rust"
                timeframe="June 2025 - July 2025"
                skills={["Rust","dotenv", "CLI", "Tokio", "Serde", "Reqwest"]}
                theme={theme}
                description={[
                  "Developed a lightweight command-line (CLI) application in Rust for real-time currency conversion using live financial data from exchangeratesapi.io. Implemented asynchronous programming with Tokio and Reqwest for efficient REST API integration, along with Serde for JSON parsing and Mutex for thread-safe data handling. Ensured secure API key management with dotenv and .env files, while maintaining a modular code structure (main.rs, lib.rs, utils.rs) for scalability. Delivered an interactive terminal interface with input validation, error handling, and formatted output, providing a robust and secure FinTech solution for converting between international currencies."
                ]}

                link="https://github.com/RahilJain1366/Currency_Convertor"
                //image = "/Classification_Plants_DL.jpg"
              />
            </div>
            </div>
          <div className="flex flex-col gap-8 justify-between">
            <div className={`min-w-[320px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <ProjectCard
                title="Classification of Plant Diseases using Deep Learning"
                timeframe="January 2025 – April 2025"
                skills={["ResNet50", "Vision Transformer", "SVM", "Flask"]}
                theme={theme}
                description={[
                  "Plant Disease Classification using Deep Learning (Jan 2025 – Apr 2025): Built a real-time system for detecting plant diseases from leaf images using a hybrid CNN–Vision Transformer–SVM architecture. The model achieved 91.12% accuracy across 23 disease categories, with super-resolution preprocessing for enhanced leaf detection. Deployed via a Flask dashboard, enabling scalable, real-time diagnosis as a practical alternative to NDVI-based methods in precision agriculture."]}
                link="https://github.com/RahilJain1366/Classification-of-Plant-Diseases"
                //image = "/Classification_Plants_DL.jpg"
              />
            </div>
            <div className={`min-w-[320px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <ProjectCard
                title="Reduction of Test Data Volume in SoC Design"
                timeframe="Nov 2024 – Dec 2024"
                skills={["C++", "Graph Algorithms", "Compression"]}
                theme={theme}
                description={[
                  "Implemented a C++ solution for reducing test data volume in System-on-Chip (SoC) design using dictionary-based compression with fixed-length indices. Modeled test patterns as a graph and applied heuristic clique partitioning algorithms to optimize dictionary selection for maximum compression efficiency. Improved circuit testing performance by minimizing test data storage and transfer requirements, leveraging concepts from VLSI design, EDA tools, and graph algorithms."
                ]}
                link="https://github.com/RahilJain1366/Reduction-of-Test-Data-Volume-in-SoC-Design"
                //image="/Soc_Design.jpg"
              />
            </div>
            <div className={`min-w-[320px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <ProjectCard
                title="Chromosome Classification using Deep Learning"
                timeframe="March 2021 – July 2021"
                skills={["TensorFlow", "PyTorch", "Keras", "OpenCV"]}
                theme={theme}
                description={[
                "Automated karyotyping with a deep learning pipeline, achieving 96.6% accuracy across all 23 human chromosomes. Used EfficientNet-B6 with LapSRN super-resolution, along with object detection via Detectron2 and YOLOv4, and trained classifiers including ResNet, VGG-16, and custom CNNs. Annotated ~2,480 chromosome strands using COCO Annotator, with training on Google Colab GPUs, validated by clinical experts."
                ]}
                link="https://github.com/RahilJain1366/Classification-of-Chromosome"
                //image="/Classification_Chromosome.jpg"
              />
            </div>
            <div className={`min-w-[320px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <ProjectCard
                title="Audio-Based Environment Simulator"
                timeframe="January 2020"
                skills={["TensorFlow", "OpenCV", "Raspberry Pi"]}
                theme={theme}
                description={[
                  "Developed a wearable assistive technology prototype for visually impaired navigation, integrating Mask R-CNN for real-time object detection and instance segmentation with OpenCV and sensor inputs on Raspberry Pi 3. Converted environmental information into 3D spatial audio cues, enhancing spatial awareness and enabling real-time navigation assistance. The project demonstrates embedded systems programming, wearable device development, human-computer interaction, and rapid prototyping, completed within a 24-hour hackathon, with a focus on accessibility solutions and audio-based environment simulation."
                ]}
                //image="/Audio_Based_Env_Sim.jpg"
              />
            </div>
          </div>
        </Section>

        <Section id="opensource" title="Open Source Contributions" theme={theme}>
          <div className="flex flex-col gap-8 justify-between">
            <div className={`min-w-[320px] flex-1 rounded-2xl shadow-lg border p-5 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <ProjectCard
                title="Cirq (Google Quantum AI)"
                timeframe="Contribution Merged"
                skills={["Python", "Quantum Computing", "Serialization", "Open Source"]}
                theme={theme}
                description={[
                  "Implemented JSON serialization support for BayesianNetworkGate in Cirq, resolving core serialization issues and merging the fix upstream (PR #7743). Contributed to Google's open-source quantum computing framework, improving the framework's functionality for researchers and developers working with quantum circuits and Bayesian networks."
                ]}
                link="https://github.com/quantumlib/Cirq/pull/7743"
              />
            </div>
          </div>
        </Section>

        <Section id="certs" title="Certifications" theme={theme}>
          <div className={`rounded-2xl shadow-lg border p-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700'
              : 'bg-gray-50 border-gray-300'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={process.env.PUBLIC_URL + '/Rahil_Jain_QML_Certificate.jpg'}
                  alt="Quantum Computing & Advanced ML Certificate from IIT Delhi - Rahil Jain"
                  loading="lazy"
                  className="rounded-lg shadow-md"
                />
                <p className={`mt-2 text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-200' : 'text-black'
                }`}>
                  Quantum Computing & Advanced ML – IIT Delhi (Nov 2023 – June 2024), Score: 83/100
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </motion.div>

    
  );
};

export default App;
