import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import './Experience.css'

const experiences = [
  {
    role: 'Intern',
    company: 'Cisco',
    type: 'Internship',
    duration: 'Jun 2025 - Aug 2025',
    time: '3 mos',
    location: 'Remote / Online',
    logo: '/images/cisco-logo.png',
    description: [
      'Learned networking fundamentals and cybersecurity concepts',
      'Worked with Packet Tracer for network simulation',
      'Gained knowledge in threat detection and security practices'
    ],
    skills: ['Cybersecurity Fundamentals', 'Networking Basics', '+1 skill']
  },
  {
    role: 'Intern',
    company: 'CODTECH IT SOLUTION',
    type: 'Internship',
    duration: 'Jun 2025 - Jul 2025',
    time: '2 mos',
    location: 'Hyderabad, Telangana, India (Online)',
    logo: '/images/codtech-logo.png',
    description: [],
    skills: ['Soft Skills', 'Project Development Experience']
  },
  {
    role: 'Intern',
    company: 'Innovate Intern',
    type: 'Internship',
    duration: 'Jun 2024 - Jul 2024',
    time: '2 mos',
    location: 'Chennai, Tamil Nadu, India (Online)',
    logo: '/images/innovate-logo.png',
    description: [],
    skills: ['Machine Learning Basics', 'Image Processing']
  }
]

export default function Experience() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="experience-page section">
        <div className="container">
          <motion.p 
            className="section-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            // Experience
          </motion.p>
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            My Journey
          </motion.h1>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            A timeline of my professional experience and internships.
          </motion.p>

          <div className="experience-timeline">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className="experience-card cinematic-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
              >
                <div className="experience-header">
                  <div className={`experience-logo-wrap ${exp.company === 'Innovate Intern' ? 'logo-dark' : ''}`}>
                    <img src={exp.logo} alt={exp.company} className="experience-logo" />
                  </div>
                  <div className="experience-title-group">
                    <h2 className="experience-role">{exp.role}</h2>
                    <h3 className="experience-company">{exp.company} <span className="experience-type">· {exp.type}</span></h3>
                  </div>
                </div>

                <div className="experience-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{exp.duration} · {exp.time}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {exp.description.length > 0 && (
                  <ul className="experience-description">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                <div className="experience-skills">
                  {exp.skills.map((skill, idx) => (
                    <span key={idx} className="glowing-chip">
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
