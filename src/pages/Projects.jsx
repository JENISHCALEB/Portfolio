import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, BrainCircuit, Code2, Smartphone, Cpu, FlaskConical, Play, Info, Github } from 'lucide-react'
import './Projects.css'

const categories = ['All', 'AI', 'Web', 'Mobile', 'Hardware']

const projects = [
  {
    title: 'Aarogya Sahayak AI',
    description: 'AI-powered healthcare assistant for early symptom analysis and guidance.',
    tags: ['Python', 'AI', 'NLP', 'Healthcare'],
    category: 'AI',
    icon: <BrainCircuit size={24} />,
    color: 'var(--accent-red)',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop', // Medical AI look
    github: 'https://github.com/JENISHCALEB'
  },
  {
    title: 'University Class Timetable Generator',
    description: 'Automated, conflict-free timetable generation for students and faculty.',
    tags: ['GCP', 'Mobile', 'Algorithm'],
    category: 'Mobile',
    icon: <Smartphone size={24} />,
    color: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop', // Calendar/Timetable look
    github: 'https://github.com/JENISHCALEB'
  },
  {
    title: 'Vision Transformer Pneumonia Detection',
    description: 'Deep-learning chest X-ray classifier with low-latency edge deployment.',
    tags: ['PyTorch', 'ViT', 'Medical AI'],
    category: 'AI',
    icon: <FlaskConical size={24} />,
    color: '#EC4899',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=600&auto=format&fit=crop', // X-ray/biology look
    github: 'https://github.com/JENISHCALEB'
  },
  {
    title: 'Wireless EV Charging System',
    description: 'Prototype contactless EV charging using electromagnetic induction.',
    tags: ['IoT', 'Hardware', 'Embedded'],
    category: 'Hardware',
    icon: <Cpu size={24} />,
    color: '#06B6D4',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop', // EV/car look
    github: 'https://github.com/JENISHCALEB'
  },
  {
    title: 'Car Rental Application',
    description: 'Modern rental platform with browsing, booking and management.',
    tags: ['React', 'Full Stack', 'Web'],
    category: 'Web',
    icon: <Code2 size={24} />,
    color: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600&auto=format&fit=crop', // Clean car side view
    github: 'https://github.com/JENISHCALEB'
  },
]

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

  // Featured Project Banner (First AI project or Aarogya Sahayak AI)
  const featured = projects[0]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="netflix-projects-page"
    >
      {/* ===== FEATURED BANNER ===== */}
      <section className="featured-banner">
        <div className="banner-bg-wrapper">
          <img src={featured.image} alt={featured.title} className="banner-bg-img" />
          <div className="banner-overlay-gradient" />
        </div>
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

          {/* Project Row */}
          <div className="projects-movie-grid">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                className="movie-card cinematic-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                layout
              >
                <div className="card-thumbnail-wrapper">
                  <img src={project.image} alt={project.title} className="card-thumbnail" />
                  <div className="card-image-overlay" />
                  <div className="card-icon" style={{ color: project.color }}>
                    {project.icon}
                  </div>
                  <span className="card-category-label">{project.category}</span>
                </div>
                <div className="card-body">
                  <h3 className="card-project-title">{project.title}</h3>
                  <p className="card-project-desc">{project.description}</p>
                  <div className="card-project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-pill-subtle">{tag}</span>
                    ))}
                  </div>
                  <div className="card-project-actions">
                    <Link to="/contact" className="btn-card-link-red">
                      <Play size={12} fill="currentColor" />
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
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
