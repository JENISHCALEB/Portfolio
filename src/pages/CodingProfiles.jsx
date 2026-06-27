import { motion } from 'framer-motion'
import { Github, Code2, Terminal, ArrowUpRight } from 'lucide-react'
import './CodingProfiles.css'

const profiles = [
  {
    name: 'GitHub',
    username: '@JENISHCALEB',
    url: 'https://github.com/JENISHCALEB',
    icon: <Github size={40} />,
    color: '#ffffff',
    bg: 'linear-gradient(135deg, #1f1f2e, #11111a)',
    accent: '#FFFFFF'
  },
  {
    name: 'LeetCode',
    username: '@jenishcaleb17',
    url: 'https://leetcode.com/u/jenishcaleb17/',
    icon: <Code2 size={40} />,
    color: '#ffa116',
    bg: 'linear-gradient(135deg, #2c1a04, #140d02)',
    accent: '#ffa116'
  },
  {
    name: 'HackerRank',
    username: '@jenishcaleb',
    url: 'https://www.hackerrank.com/profile/jenishcaleb',
    icon: <Terminal size={40} />,
    color: '#2ec866',
    bg: 'linear-gradient(135deg, #052c16, #02140a)',
    accent: '#2ec866'
  }
]

export default function CodingProfiles() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="netflix-profiles-page"
    >
      <section className="profiles-container-section section">
        <div className="container profiles-inner-container">
          <motion.h1 
            className="profiles-main-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Who's Coding?
          </motion.h1>

          <div className="netflix-profiles-row">
            {profiles.map((profile, i) => (
              <motion.a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="netflix-profile-wrapper"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.6, type: 'spring', stiffness: 100 }}
              >
                {/* Profile Box */}
                <div 
                  className="netflix-profile-box" 
                  style={{ background: profile.bg, '--profile-accent': profile.accent }}
                >
                  <div className="netflix-profile-icon" style={{ color: profile.color }}>
                    {profile.icon}
                  </div>
                  <div className="netflix-profile-glow-overlay" />
                  
                  {/* Small link icon at bottom right */}
                  <div className="profile-box-link-arrow">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Profile Name & Username */}
                <h2 className="netflix-profile-name">{profile.name}</h2>
                <p className="netflix-profile-username">{profile.username}</p>

                {/* Direct Action Button */}
                <span className="netflix-profile-btn">
                  Visit Profile
                </span>
              </motion.a>
            ))}
          </div>

          <motion.div 
            className="profiles-action-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href="mailto:jenishcaleb@gmail.com" className="netflix-manage-profiles-btn">
              Contact Developer
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
