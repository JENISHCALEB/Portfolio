import { motion } from 'framer-motion'
import { GraduationCap, School, Trophy, Award, Medal, Flame, CloudLightning, BrainCircuit } from 'lucide-react'
import ProfilePhoto from '../components/ProfilePhoto'
import './About.css'

const education = [
  {
    institution: 'Karunya Institute of Technology and Sciences',
    degree: 'Bachelor of Technology (B.Tech) – Computer Science and Engineering',
    period: 'Present',
    description: 'Currently pursuing a Bachelor\'s degree in Computer Science and Engineering with interests in Artificial Intelligence, software development, cloud technologies, and modern application development.',
    icon: <GraduationCap size={22} />,
  },
  {
    institution: 'Anitha Kumaran Matric Higher Secondary School',
    degree: 'Higher Secondary Education',
    period: 'Completed',
    description: 'Completed schooling with active participation in academics, sports, leadership activities, and extracurricular events, developing discipline, teamwork, and problem-solving skills.',
    icon: <School size={22} />,
  },
]

const achievements = [
  {
    title: 'Olympic Torch Bearer (2022)',
    subtitle: 'Anitha Kumaran Matric Higher Secondary School',
    detail: 'Represented the school as the Olympic Torch Bearer during the 2022 Zonal Sports Meet held at Sivanthi Aditanar College, Tiruchendur, proudly carrying the Olympic torch on behalf of the school.',
    icon: <Flame size={24} />,
    color: '#F97316', // Orange for flame
  },
  {
    title: 'Under-14 Player of the Year',
    subtitle: 'Sports Achievement',
    detail: 'Received the Player of the Year (Under-14) award in recognition of outstanding sporting performance and dedication.',
    icon: <Trophy size={24} />,
    color: '#EAB308', // Gold
  },
  {
    title: 'State-Level Bronze Medal',
    subtitle: 'Sports Competition',
    detail: 'Won a Bronze Medal at a State-Level sports competition while representing the school.',
    icon: <Medal size={24} />,
    color: '#CD7F32', // Bronze
  },
  {
    title: 'Smart India Hackathon – Internal Round',
    subtitle: 'Aarogya Sahayak AI',
    detail: 'Developed Aarogya Sahayak AI, an AI-powered healthcare assistance application at Karunya Institute of Technology and Sciences.',
    icon: <BrainCircuit size={24} />,
    color: 'var(--accent-purple)',
  },
  {
    title: 'Google Cloud Digital Campus 2.0 – HackSprint',
    subtitle: 'University Class Timetable Generator',
    detail: 'Developed the University Class Timetable Generating Mobile Application, gaining practical experience in cloud technologies, teamwork, and problem-solving.',
    icon: <CloudLightning size={24} />,
    color: 'var(--accent-blue)',
  },
]

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ===== BIO SECTION ===== */}
      <section className="about-hero section">
        <div className="container">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            // About
          </motion.p>
          <motion.h1
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Curious by nature, engineer by craft.
          </motion.h1>

          <div className="about-intro">
            <motion.div
              className="about-photo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <ProfilePhoto size="md" animate={false} tilt={true} />
            </motion.div>
            <motion.div
              className="about-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <p>
                I'm Jenish Caleb V, a Computer Science student passionate about technology
                and continuously learning new skills. I enjoy exploring artificial intelligence,
                modern web technologies, and building practical projects that solve real-world problems.
              </p>
              <p>
                I'm always eager to learn, improve, and take on new challenges that help me grow
                as a developer. I'm currently open to internship opportunities, collaborations,
                and learning experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== EDUCATION SECTION ===== */}
      <section className="education section">
        <div className="container">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            // Academics
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Education
          </motion.h2>

          <div className="education-timeline">
            {education.map((item, i) => (
              <motion.div
                key={item.degree}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="timeline-line">
                  <div className="timeline-dot">
                    {item.icon}
                  </div>
                </div>
                <div className="glass-card timeline-card">
                  <div className="timeline-header">
                    <span className="timeline-year">{item.period}</span>
                    <h3 className="timeline-title">{item.institution}</h3>
                    <p className="timeline-degree">{item.degree}</p>
                  </div>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS SECTION ===== */}
      <section className="achievements section">
        <div className="container">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            // Milestones
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Achievements & Honors
          </motion.h2>

          <div className="achievements-grid">
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.title}
                className="glass-card achievement-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="achievement-header">
                  <div className="achievement-icon-box" style={{ color: ach.color, borderColor: `${ach.color}33`, background: `${ach.color}11` }}>
                    {ach.icon}
                  </div>
                  <div>
                    <h3 className="achievement-title">{ach.title}</h3>
                    <p className="achievement-subtitle">{ach.subtitle}</p>
                  </div>
                </div>
                <p className="achievement-desc">{ach.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
