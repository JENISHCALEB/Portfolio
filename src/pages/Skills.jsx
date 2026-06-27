import { motion } from 'framer-motion'
import { Code, Layout, BrainCircuit, Cloud, Database, ShieldAlert, Cpu, Heart } from 'lucide-react'
import './Skills.css'

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <Code size={20} />,
    color: 'var(--accent-red)',
    skills: ['C', 'Python', 'JavaScript']
  },
  {
    title: 'Frontend Development',
    icon: <Layout size={20} />,
    color: '#06B6D4',
    skills: ['HTML5', 'CSS3', 'React.js', 'Responsive Web Design']
  },
  {
    title: 'AI & Machine Learning',
    icon: <BrainCircuit size={20} />,
    color: '#8B5CF6',
    skills: ['AI-Powered Applications', 'Prompt Engineering', 'CNN', 'Transfer Learning', 'Vision Transformer (ViT)', 'Symptom Analysis Systems', 'Medical AI']
  },
  {
    title: 'Mobile & Cloud',
    icon: <Cloud size={20} />,
    color: 'var(--accent-red)',
    skills: ['Google Cloud Platform', 'Mobile App Development', 'Cloud-Based Solutions']
  },
  {
    title: 'Databases',
    icon: <Database size={20} />,
    color: '#06B6D4',
    skills: ['MySQL', 'MongoDB (Basic)']
  },
  {
    title: 'Tools & Platforms',
    icon: <ShieldAlert size={20} />,
    color: '#8B5CF6',
    skills: ['Git', 'GitHub', 'VS Code', 'Figma (Basic)', 'Postman', 'ChatGPT', 'Google Gemini']
  },
  {
    title: 'Hardware & IoT',
    icon: <Cpu size={20} />,
    color: '#06B6D4',
    skills: ['Embedded Systems (Basic)', 'Wireless EV Charging', 'IoT Fundamentals']
  },
  {
    title: 'Soft Skills',
    icon: <Heart size={20} />,
    color: '#EC4899',
    skills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Adaptability', 'Time Management', 'Quick Learner']
  }
]

export default function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="skills-page section">
        <div className="container">
          <motion.p 
            className="section-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            // Skills
          </motion.p>
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Tools of the trade
          </motion.h1>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            An evolving toolkit — sharpened through hackathons, side-projects and a lot of reading.
          </motion.p>

          <div className="skills-grid">
            {skillCategories.map((category, i) => (
              <motion.div
                key={category.title}
                className="cinematic-card skill-category-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <div className="skill-category-header">
                  <div className="skill-category-icon" style={{ color: category.color, borderColor: `${category.color}44`, background: `${category.color}11` }}>
                    {category.icon}
                  </div>
                  <h2 className="skill-category-title">{category.title}</h2>
                </div>
                <div className="skills-list">
                  {category.skills.map((skill) => (
                    <span key={skill} className="glowing-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
