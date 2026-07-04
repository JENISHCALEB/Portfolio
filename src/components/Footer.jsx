import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, Instagram } from 'lucide-react'
import './Footer.css'

const socials = [
  { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/jenish-caleb-v/', label: 'LinkedIn',  color: '#0A66C2' },
  { icon: <Github   size={18} />, href: 'https://github.com/JENISHCALEB',              label: 'GitHub',    color: '#e2e2e2' },
  { icon: <Mail     size={18} />, href: 'mailto:jenishcaleb@gmail.com',               label: 'Email',     color: '#EA4335' },
  { icon: <Instagram size={18} />, href: 'https://www.instagram.com/im_jenish._/',   label: 'Instagram', color: '#C13584' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Footer() {
  return (
    <footer className="footer-premium">
      {/* Ambient Background */}
      <div className="footer-bg-layer" aria-hidden="true">
        <div className="footer-glow-orb" />
        <svg className="footer-curved-lines" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,160 C360,280 1080,40 1440,160" stroke="rgba(229,9,20,0.08)" strokeWidth="1" fill="none" />
          <path d="M0,200 C400,320 1040,80 1440,200" stroke="rgba(229,9,20,0.05)" strokeWidth="1" fill="none" />
          <path d="M0,120 C320,240 1120,0 1440,120" stroke="rgba(229,9,20,0.04)" strokeWidth="1" fill="none" />
        </svg>
        <div className="footer-particles" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <span key={i} className={`fp fp-${i + 1}`} />
          ))}
        </div>
      </div>

      <div className="footer-fade-top" aria-hidden="true" />

      <motion.div
        className="footer-inner container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* ── LEFT ── */}
        <motion.div className="footer-col footer-col-left" variants={itemVariants}>
          <h2 className="footer-name">
            <span className="footer-name-j">J</span>ENISH CALEB
          </h2>
          <p className="footer-credit-line">Designed &amp; Developed by Jenish Caleb V</p>
        </motion.div>

        {/* ── CENTER ── */}
        <motion.div className="footer-col footer-col-center" variants={itemVariants}>
          <div className="footer-socials-row">
            {socials.map(({ icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-btn"
                aria-label={label}
                style={{ '--brand': color }}
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT ── */}
        <motion.div className="footer-col footer-col-right" variants={itemVariants}>
          <p className="footer-copy">© 2026 All Rights Reserved.</p>
          <p className="footer-stack">Built with React&nbsp;•&nbsp;Tailwind CSS&nbsp;•&nbsp;Framer Motion</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
