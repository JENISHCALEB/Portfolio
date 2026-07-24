import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, BrainCircuit, Code2, Smartphone, Cpu, FlaskConical, Info, Activity } from 'lucide-react'
import HeroCanvas from '../components/HeroCanvas'
import './Projects.css'

const categories = ['All', 'AI', 'Web', 'Mobile', 'Hardware']

/* -----------------------------------------------------------------------
   Reliable Unsplash URLs via their CDN — always public, no auth needed.
   Using `?auto=format&fit=crop&w=800&q=80` for consistent quality/size.
   The Car Rental local path is replaced with a proper Unsplash URL.
----------------------------------------------------------------------- */
const projects = [
  {
    title: 'Aarogya Sahayak AI',
    description: 'AI-powered healthcare assistant for early symptom analysis and guidance.',
    tags: ['Python', 'AI', 'NLP', 'Healthcare'],
    category: 'AI',
    icon: <BrainCircuit size={24} />,
    color: 'var(--accent-red)',
    // Healthcare AI / doctor / medical tech
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'linear-gradient(135deg, #e53935 0%, #b71c1c 100%)',
    fallbackEmoji: '🏥',
    github: 'https://github.com/JENISHCALEB'
  },
  {
    title: 'University Class Timetable Generator',
    description: 'Automated, conflict-free timetable generation for students and faculty.',
    tags: ['GCP', 'Mobile', 'Algorithm'],
    category: 'Mobile',
    icon: <Smartphone size={24} />,
    color: '#3B82F6',
    // University / calendar / schedule
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
    fallbackEmoji: '📅',
    github: 'https://github.com/JENISHCALEB'
  },
  {
    title: 'Vision Transformer Pneumonia Detection',
    description: 'Deep-learning chest X-ray classifier with low-latency edge deployment.',
    tags: ['PyTorch', 'ViT', 'Medical AI'],
    category: 'AI',
    icon: <FlaskConical size={24} />,
    color: '#EC4899',
    // Chest X-ray / radiology / hospital
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)',
    fallbackEmoji: '🫁',
    github: 'https://github.com/JENISHCALEB'
  },
  {
    title: 'Wireless EV Charging System',
    description: 'Prototype contactless EV charging using electromagnetic induction.',
    tags: ['IoT', 'Hardware', 'Embedded'],
    category: 'Hardware',
    icon: <Cpu size={24} />,
    color: '#06B6D4',
    // Electric vehicle / futuristic EV charging
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'linear-gradient(135deg, #00838f 0%, #006064 100%)',
    fallbackEmoji: '⚡',
    github: 'https://github.com/JENISHCALEB'
  },
  {
    title: 'Car Rental Application',
    description: 'Modern rental platform with browsing, booking and management.',
    tags: ['React', 'Full Stack', 'Web'],
    category: 'Web',
    icon: <Code2 size={24} />,
    color: '#8B5CF6',
    // Luxury car / car rental
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'linear-gradient(135deg, #4527a0 0%, #311b92 100%)',
    fallbackEmoji: '🚗',
    github: 'https://github.com/JENISHCALEB'
  },
  {
    title: "Neuroimaging-Based Machine learning for early alzheimer's disease prediction for intervention",
    description: "Machine learning models analyzing structural MRI & PET neuroimaging data for early detection and timely therapeutic intervention in Alzheimer's disease.",
    tags: ['Machine Learning', 'Neuroimaging', 'Python', 'Medical AI'],
    category: 'AI',
    icon: <Activity size={24} />,
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    fallbackEmoji: '🧠',
    github: 'https://github.com/JENISHCALEB'
  },
]

/* -----------------------------------------------------------------------
   ProjectCard — handles skeleton loading, error fallback, and hover effects
----------------------------------------------------------------------- */
function ProjectCard({ project, index }) {
  const [imgState, setImgState] = useState('loading') // 'loading' | 'loaded' | 'error'

  return (
    <motion.div
      key={project.title}
      className={`movie-card cinematic-card ${imgState === 'loading' ? 'is-loading' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      layout
    >
      <div className="card-thumbnail-wrapper">
        {/* Skeleton shimmer — shown while image loads */}
        {imgState === 'loading' && (
          <div className="card-skeleton" aria-hidden="true" />
        )}

        {/* Actual image — hidden until loaded, replaced by gradient on error */}
        {imgState !== 'error' ? (
          <img
            src={project.image}
            alt={project.title}
            className={`card-thumbnail ${imgState === 'loaded' ? 'img-visible' : 'img-hidden'}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgState('loaded')}
            onError={() => setImgState('error')}
          />
        ) : (
          /* Beautiful gradient fallback when image fails */
          <div
            className="card-fallback-gradient"
            style={{ background: project.fallbackGradient }}
            aria-label={`${project.title} placeholder`}
          >
            <span className="fallback-emoji" aria-hidden="true">{project.fallbackEmoji}</span>
          </div>
        )}

        {/* Dark overlay so text stays readable */}
        <div className="card-image-overlay" />

        <div className="card-icon" style={{ color: project.color }}>
          {project.icon}
        </div>
        <span className="card-category-label">{project.category}</span>
      </div>

      <div className="card-body">
        <h3 className="card-project-title">{project.title}</h3>
        <p className="card-project-desc">{project.description}</p>
        <div className="card-tags">
          {project.tags.map((t) => (
            <span key={t} className="card-tag">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* -----------------------------------------------------------------------
   BannerImage — same skeleton + fallback for the featured hero banner
----------------------------------------------------------------------- */
function BannerImage({ project }) {
  const [imgState, setImgState] = useState('loading')

  return (
    <div className="banner-bg-wrapper">
      {imgState === 'loading' && <div className="banner-skeleton" aria-hidden="true" />}
      {imgState !== 'error' ? (
        <img
          src={project.image}
          alt={project.title}
          className={`banner-bg-img ${imgState === 'loaded' ? 'img-visible' : 'img-hidden'}`}
          loading="eager"
          decoding="async"
          onLoad={() => setImgState('loaded')}
          onError={() => setImgState('error')}
        />
      ) : (
        <div
          className="banner-fallback-gradient"
          style={{ background: project.fallbackGradient }}
          aria-hidden="true"
        >
          <span className="banner-fallback-emoji">{project.fallbackEmoji}</span>
        </div>
      )}
      <div className="banner-overlay-gradient" />
    </div>
  )
}

/* -----------------------------------------------------------------------
   Main Projects page
----------------------------------------------------------------------- */
export default function Projects() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === 'All' || p.category === activeCategory
    return matchSearch && matchCategory
  })

  const featured = projects[0]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="netflix-projects-page"
    >
      {/* ── Cinematic canvas background (fixed, full page) ── */}
      <div className="projects-canvas-bg">
        <HeroCanvas />
        <div className="projects-canvas-fog" />
      </div>

      {/* ===== FEATURED BANNER ===== */}
      <section className="featured-banner">
        <BannerImage project={featured} />
        <div className="container banner-content-wrapper">
          <span className="banner-label">FEATURED PRODUCTION</span>
          <h1 className="banner-title">{featured.title}</h1>
          <p className="banner-desc">{featured.description}</p>
          <div className="banner-tags">
            {featured.tags.map((t) => (
              <span key={t} className="banner-tag-pill">{t}</span>
            ))}
          </div>
          <div className="banner-actions">
            <Link to="/contact" className="btn btn-outline banner-btn">
              <Info size={16} />
              Inquire
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LIST VIEW ===== */}
      <section className="projects-list-section">
        <div className="container">
          <div className="projects-section-header">
            <h2 className="row-title">Popular Showcases</h2>

            {/* Search & Filters */}
            <div className="projects-controls">
              <div className="search-bar-wrapper">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Titles, description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="category-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="projects-movie-grid">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="empty-search-msg">
              No titles match your search criteria.
            </p>
          )}
        </div>
      </section>
    </motion.div>
  )
}
