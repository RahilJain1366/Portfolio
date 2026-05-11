import React, { useEffect, useState, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import ProjectCard from './components/ProjectCard';
import ProjectsSection from './components/ProjectsSection';

// ============================================
// SCROLL-DRIVEN ANIMATION HOOK
// ============================================
const useScrollAnimation = (offset = 0) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: `0px 0px -${offset}px 0px` }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [offset]);

  return { ref, isInView };
};

// ============================================
// COMPONENTS
// ============================================

const socialLinks = [
  { href: 'mailto:rahiljain1366@gmail.com', icon: <FaEnvelope />, label: 'Email' },
  { href: 'https://www.linkedin.com/in/rahil-jain-3129961b5/', icon: <FaLinkedin />, label: 'LinkedIn' },
  { href: 'https://github.com/RahilJain1366', icon: <FaGithub />, label: 'GitHub' },
  { href: 'https://drive.google.com/file/d/1tHLSmWi7w_QUXEoGtk3v1Esr2xFe2S2v/view?usp=sharing', icon: <FaFileDownload />, label: 'Resume' },
];

// Glassmorphism Skill Badge
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

const WorkCard = ({ title, timeframe, skills, description, link, theme = 'dark' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.article
      className={`rounded-lg shadow-md p-6 transition-all duration-300 will-change-transform cursor-default ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-100'
          : 'bg-white border-2 border-gray-200 text-black shadow-lg'
      }`}
      onHoverStart={() => !prefersReducedMotion && setIsHovered(true)}
      onHoverEnd={() => !prefersReducedMotion && setIsHovered(false)}
      animate={isHovered && !prefersReducedMotion ? { translateY: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' } : { translateY: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <h3 className={`text-xl font-semibold mb-1 ${
        theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
      }`}>{title}</h3>
      <p className={`text-sm mb-4 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>{timeframe}</p>
      <ul className={`list-disc pl-5 mt-3 space-y-1 text-sm mb-4 ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
      }`}>
        {description.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} theme={theme} />
        ))}
      </div>
      {link && (
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:underline mt-4 inline-block text-sm font-semibold transition-opacity duration-200 ${
            theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
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

// Animated cycle words with smooth transitions
const AnimatedCycleWords = ({ theme }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % cycleWords.length);
    }, 2000);
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

const cycleWords = ["Code", "Develop", "Test", "Deploy"];

// Apple-style Section Component
const Section = ({ id, title, children, theme = 'dark' }) => {
  const { ref, isInView } = useScrollAnimation(100);

  return (
    <motion.section
      ref={ref}
      id={id}
      className="mb-10 scroll-mt-20"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.h2
        className={`text-4xl md:text-5xl font-extrabold mb-8 tracking-tight inline-block px-4 py-2 rounded-lg shadow text-center w-full ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-black via-gray-800 to-black text-orange-400'
            : 'bg-white text-orange-600 border-2 border-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>
      <motion.div
        className={theme === 'dark' ? 'text-gray-200' : 'text-black'}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

// Hero header with parallax
const QuantumCircuitHeader = ({ theme, toggleTheme, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <header id="home" className={`relative w-full min-h-[90vh] flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-r from-black via-gray-800 to-black'
        : 'bg-white'
    }`}>
      {/* Sticky Top Nav */}
      <nav className={`fixed top-0 z-50 flex justify-between items-center w-full pt-3 md:pt-8 pb-2 md:pb-4 backdrop-blur-md border-b transition-colors duration-500 px-4 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-black via-gray-800 to-black/80 border-white/10'
          : 'bg-white/95 border-gray-200 shadow-sm'
      }`}>
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
          ].map((item, i) => (
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
        >
          Hi, my name is
        </motion.span>
        <motion.h1
          className={`text-5xl md:text-6xl font-bold mb-2 ${
            theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
          }`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, type: 'spring' }}
        >
          Rahil Jain
        </motion.h1>
        <br />

        <motion.h2
          className={`text-xl md:text-2xl font-mono font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          I'm a <span className={theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}>Software Development Engineer</span>
        </motion.h2>

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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow transition will-change-transform ${
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
};

// Main App Component
const App = () => {
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
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches });

    console.log("%c👋 Curious Dev!", "color: #0ea5e9; font-weight: bold; font-size: 16px;");
    console.log("Welcome to Rahil Jain's Portfolio!");
    console.log("%cHint: Type 'quantum' in the console and press Enter for a surprise...", "color: #06b6d4; font-style: italic;");

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
      transition={{ duration: 0.6 }}
      className={`relative min-h-screen transition-colors duration-500 overflow-hidden ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-black via-gray-800 to-black text-gray-100'
          : 'bg-white text-black'
      }`}
    >
      <QuantumCircuitHeader 
        theme={theme} 
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {/* About Section */}
        <Section id="about" title="About Me" theme={theme}>
          <div className="flex flex-col md:flex-row items-stretch gap-8">
            <motion.div
              className="w-full md:w-1/3 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={process.env.PUBLIC_URL + '/rahil-profile.jpg'}
                alt="Portrait of Rahil Jain - Software Engineer specializing in Machine Learning and Quantum Computing"
                loading="lazy"
                className="object-cover w-full h-full"
                style={{ minHeight: '350px', maxHeight: '100%', objectPosition: 'center top' }}
              />
            </motion.div>
            <motion.div
              className="flex-1 flex items-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className={`text-left leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
              }`}>
                I'm a graduate student in Computer Engineering at the University of Texas at Dallas, specializing in Applied Machine Learning, with a CGPA of 3.76. My interests span machine learning, quantum computing, embedded systems, and scalable backend development.
                <br /><br />
                I've worked on projects involving binary neural networks, hybrid CNN-ViT models for image classification, Jira automation tools, and full-stack applications using Python, Bash, Flask, and React. I'm also exploring quantum computing through circuit simulations and frameworks like Qiskit, focusing on its potential in optimization and AI.
                <br /><br />
                I'm passionate about building intelligent, efficient systems that connect research with real-world impact.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Experience Section */}
        <Section id="experience" title="Experience" theme={theme}>
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
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
            </motion.div>
          </div>
        </Section>
      </main>

      {/* Skills Section */}
      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
        <Section id="skills" title="Skills" theme={theme}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {[
              { category: "Programming", skills: ["Python", "C++", "Java", "Bash"] },
              { category: "Machine Learning & Deep Learning", skills: ["TensorFlow", "PyTorch", "Scikit-learn"] },
              { category: "Web Development", skills: ["Django", "Flask", "React", "Nodejs"] },
              { category: "Quantum Computing", skills: ["Qiskit", "Cirq", "PennyLane"] },
              { category: "Data Visualization", skills: ["Pandas", "Matplotlib", "Seaborn"] },
              { category: "Tools & Platforms", skills: ["Docker", "Git", "Linux", "CocoAnnotator", "Postman"] },
              { category: "Databases & Data", skills: ["PostgreSQL", "MongoDB", "Cassandra"] },
              { category: "Web & UI", skills: ["HTML", "CSS"] },
            ].map((skillGroup, groupIdx) => (
              <motion.div
                key={skillGroup.category}
                className={`rounded-2xl p-6 border backdrop-blur-md ${
                  theme === 'dark'
                    ? 'bg-white/8 border-white/15'
                    : 'bg-black/8 border-black/15'
                }`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
              >
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {skillGroup.category}
                </h3>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.06,
                      },
                    },
                  }}
                >
                  {skillGroup.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                      }}
                    >
                      <SkillBadge skill={skill} theme={theme} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      </div>

      {/* Projects Section */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <Section id="projects" title="Projects" theme={theme}>
          <ProjectsSection theme={theme} />
        </Section>

        {/* Open Source Section */}
        <Section id="opensource" title="Open Source Contributions" theme={theme}>
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </Section>

        {/* Certifications Section */}
        <Section id="certs" title="Certifications" theme={theme}>
          <motion.div
            className={`rounded-2xl overflow-hidden border backdrop-blur-md ${
              theme === 'dark'
                ? 'bg-white/8 border-white/15'
                : 'bg-black/8 border-black/15'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={process.env.PUBLIC_URL + '/Rahil_Jain_QML_Certificate.jpg'}
                    alt="Quantum Computing & Advanced ML Certificate from IIT Delhi - Rahil Jain"
                    loading="lazy"
                    className="rounded-lg shadow-lg"
                  />
                  <p className={`mt-4 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    Quantum Computing & Advanced ML – IIT Delhi<br />
                    <span className="text-xs text-gray-500">(Nov 2023 – June 2024) • Score: 83/100</span>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Section>
      </div>

      {/* Footer spacing */}
      <div className="h-12"></div>
    </motion.div>
  );
};

export default App;