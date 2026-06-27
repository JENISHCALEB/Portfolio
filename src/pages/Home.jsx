import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Info, Linkedin, BrainCircuit, Code2, Cpu } from 'lucide-react'
import ProfilePhoto from '../components/ProfilePhoto'
import './Home.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
}

const disciplines = [
  {
    icon: <BrainCircuit size={28} />,
    title: 'AI & ML',
    description: 'Vision Transformers, CNNs, medical AI.',
    color: 'var(--accent-red)',
  },
  {
    icon: <Code2 size={28} />,
    title: 'Full Stack',
    description: 'React, modern web, mobile, cloud.',
    color: '#8B5CF6', // Purple highlights
  },
  {
    icon: <Cpu size={28} />,
    title: 'Hardware + IoT',
    description: 'Wireless EV charging, embedded systems.',
    color: '#06B6D4', // Cyan highlights
  },
]

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="netflix-home"
    >
      {/* Background cinematic particles & fog */}
      <div className="particles-container">
        <div className="fog-overlay" />
        <div className="cinematic-glow-bg" />
        {/* Floating background particles */}
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
      </div>

      {/* ===== HERO SECTION (Netflix Featured Banner style) ===== */}
      <section className="hero section">
        <div className="container hero-grid">
          {/* Left: Info */}
          <div className="hero-content">
            <motion.p className="hero-greeting" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              Hi, I'm
            </motion.p>
            <motion.h1 className="hero-name" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              Jenish Caleb V
            </motion.h1>
            <motion.p className="hero-role" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              Computer Science Student
            </motion.p>
            <motion.p className="hero-tagline" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              Learning • Building • Exploring Technology
            </motion.p>
            <motion.p className="hero-intro-text" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
              A passionate engineer crafting intelligent applications and responsive web experiences. 
              I design and build software at the intersection of Artificial Intelligence, full-stack architectures, and hardware integration.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
              <Link to="/projects" className="btn btn-primary hero-btn-play">
                <Play size={18} fill="currentColor" />
                View Projects
              </Link>
              <Link to="/contact" className="btn btn-outline hero-btn-info">
                <Info size={18} />
                Contact Me
              </Link>
            </motion.div>
            <motion.div className="hero-socials" variants={fadeUp} initial="hidden" animate="visible" custom={6}>
              <a
                href="https://www.linkedin.com/in/jenish-caleb-v/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </motion.div>
          </div>

          {/* Right: Cover Frame */}
          <motion.div
            className="hero-photo"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProfilePhoto size="lg" animate={true} tilt={true} />
          </motion.div>
        </div>
        <div className="cinematic-gradient-bottom" />
      </section>

      {/* ===== CATEGORIES / DISCIPLINES SECTION ===== */}
      <section className="disciplines section">
        <div className="container">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            // Categories
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Building across disciplines
          </motion.h2>

          <div className="disciplines-grid">
            {disciplines.map((d, i) => (
              <motion.div
                key={d.title}
                className="cinematic-card discipline-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="discipline-icon" style={{ color: d.color, background: `${d.color}11`, borderColor: `${d.color}22` }}>
                  {d.icon}
                </div>
                <h3 className="discipline-title">{d.title}</h3>
                <p className="discipline-desc">{d.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NETFLIX CTA BANNER ===== */}
      <section className="cta-section section">
        <div className="container">
          <motion.div
            className="cinematic-card cta-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="cta-gradient-overlay" />
            <div className="cta-content">
              <h2 className="cta-title">Got an idea worth building?</h2>
              <p className="cta-desc">
                I'm always open to internships, collaborations, and learning experiences. Start a new production with me.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Start a conversation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
