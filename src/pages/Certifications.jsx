import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { BadgeCheck, ExternalLink } from 'lucide-react'
import './Certifications.css'

/* ── CERT DATA ── */
const certs = [
  {
    name: 'Microsoft Azure Fundamentals (AZ-900)',
    org: 'Microsoft',
    issued: 'April 2026',
    category: 'Cloud',
    categoryColor: '#0078D4',
    description: 'Validated foundational knowledge of Microsoft Azure, cloud concepts, Azure services, security, compliance, pricing, and support.',
    logo: '/images/microsoft-logo.png',
  },
  {
    name: 'AWS Cloud Practitioner Essentials',
    org: 'Amazon Web Services',
    issued: 'March 2026',
    category: 'Cloud',
    categoryColor: '#FF9900',
    description: 'Completed AWS Cloud Practitioner Essentials covering cloud concepts, AWS core services, pricing, architecture, and security fundamentals.',
    logo: '/images/aws-logo.png',
  },
  {
    name: 'Microsoft Certified: Azure Data Fundamentals',
    org: 'Microsoft',
    issued: 'August 2025',
    category: 'Data',
    categoryColor: '#00B4D8',
    description: 'Learned foundational data concepts including relational and non-relational databases, analytics, visualization, and Azure data services.',
    logo: '/images/microsoft-logo.png',
  },
  {
    name: 'Enterprise Security in Practice',
    org: 'IBM',
    issued: 'October 2025',
    category: 'Cyber Security',
    categoryColor: '#BE0000',
    description: 'Covered enterprise security principles, risk management, cyber defense, authentication, and security best practices.',
    logo: '/images/ibm-logo.png',
  },
  {
    name: 'Cisco CSS Essentials',
    org: 'Cisco',
    issued: 'July 2025',
    category: 'Networking',
    categoryColor: '#1BA0D7',
    description: 'Developed practical knowledge of networking, cybersecurity concepts, and enterprise communication fundamentals.',
    logo: 'https://cdn.simpleicons.org/cisco/1BA0D7',
  },
  {
    name: 'Internet Of Things 101',
    org: 'Infosys',
    issued: 'March 2025',
    category: 'IoT',
    categoryColor: '#007CC3',
    description: 'Introduced IoT architecture, smart devices, sensors, communication protocols, and connected systems.',
    logo: 'https://cdn.simpleicons.org/infosys/007CC3',
  },
  {
    name: 'Introduction to Google Workspace with Gemini',
    org: 'Google Cloud',
    issued: 'September 2025',
    category: 'Generative AI',
    categoryColor: '#34A853',
    description: 'Learned to use Gemini inside Google Workspace for AI-assisted productivity while understanding responsible AI practices.',
    logo: '/images/google-logo.png',
  },
  {
    name: 'Introduction to Generative AI',
    org: 'Google Cloud',
    issued: 'September 2025',
    category: 'Artificial Intelligence',
    categoryColor: '#FBBC04',
    description: 'Explored generative AI fundamentals, LLMs, prompt engineering, AI applications, and modern machine learning concepts.',
    logo: '/images/google-logo.png',
  },
  {
    name: 'The Complete Cyber Security Course',
    org: 'Udemy',
    issued: 'September 2023',
    category: 'Cyber Security',
    categoryColor: '#A435F0',
    description: 'Studied ethical hacking basics, online privacy, malware protection, encryption, and network security principles.',
    logo: 'https://cdn.simpleicons.org/udemy/A435F0',
  },
]

/* ── ANIMATED COUNTER ── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1600
    const step = Math.ceil(duration / target)
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= target) clearInterval(timer)
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ── CARD VARIANTS ── */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function Certifications() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="certs-page section">
        <div className="container">

          {/* ── HEADER ── */}
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            // CERTIFICATIONS
          </motion.p>
          <motion.h1
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Industry Certifications
          </motion.h1>
          <motion.p
            className="certs-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Professional certifications earned from globally recognized organizations in Cloud Computing,
            Artificial Intelligence, Cybersecurity, Programming, and Emerging Technologies.
          </motion.p>

          {/* ── STATS ── */}
          <motion.div
            className="certs-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="cert-stat">
              <span className="cert-stat-num"><Counter target={9} suffix="+" /></span>
              <span className="cert-stat-label">Professional Certifications</span>
            </div>
            <div className="cert-stat-divider" />
            <div className="cert-stat">
              <span className="cert-stat-num"><Counter target={7} suffix="+" /></span>
              <span className="cert-stat-label">Global Organizations</span>
            </div>
            <div className="cert-stat-divider" />
            <div className="cert-stat">
              <span className="cert-stat-domains">Cloud • AI • Security • IoT</span>
            </div>
          </motion.div>

          {/* ── GRID ── */}
          <div className="certs-grid">
            {certs.map((cert, i) => (
              <motion.div
                key={cert.name}
                className="cert-card glass-card"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                {/* Top row: logo + category */}
                <div className="cert-card-top">
                  <div className={`cert-logo-wrap${cert.logoDark ? ' cert-logo-dark' : ''}`}>
                    <img
                      src={cert.logo}
                      alt={cert.org}
                      className="cert-logo"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <span
                    className="cert-category-pill"
                    style={{ '--pill-color': cert.categoryColor }}
                  >
                    {cert.category}
                  </span>
                </div>

                {/* Content */}
                <div className="cert-card-body">
                  <h3 className="cert-name">{cert.name}</h3>
                  <div className="cert-meta">
                    <BadgeCheck size={14} className="cert-meta-icon" />
                    <span className="cert-org">{cert.org}</span>
                    <span className="cert-dot">·</span>
                    <span className="cert-issued">{cert.issued}</span>
                  </div>
                  <p className="cert-desc">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
