import { Link } from 'react-router-dom'
import { Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import './Footer.css'

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/coding-profiles', label: 'Coding Profiles' },
  { path: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span style={{ color: 'var(--accent-red)' }}>J</span>enish.dev
            </h3>
            <p className="footer-tagline">
              Aspiring Software Engineer crafting AI-powered and full-stack experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-section">
            <h4 className="footer-section-title">Connect</h4>
            <div className="footer-socials">
              <a
                href="https://www.linkedin.com/in/jenish-caleb-v/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <Linkedin size={18} />
                LinkedIn
                <ArrowUpRight size={14} />
              </a>
              <a href="mailto:jenishcaleb@gmail.com" className="footer-social-link">
                <Mail size={18} />
                Email
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Jenish Caleb V. All rights reserved.</p>
          <p className="footer-credit">Built with React + Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
