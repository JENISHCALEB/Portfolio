import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Instagram, Youtube, Send } from 'lucide-react'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "ddce7a3c-b239-40a1-bce5-92c4ca28bc63",
          subject: `New Portfolio Message from ${formData.name}`,
          from_name: "Jenish.dev Portfolio",
          replyto: formData.email,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setFormData({ name: '', email: '', message: '' })
        }, 5000)
      } else {
        setErrorMsg(result.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setErrorMsg("Failed to send message. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="contact-page section">
        <div className="container contact-container-inner">
          <div className="contact-info-side">
            <motion.p 
              className="section-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              // Contact
            </motion.p>
            <motion.h1 
              className="section-title contact-huge-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Let's build<br />something.
            </motion.h1>
            
            {/* Big bold email display */}
            <motion.div 
              className="contact-large-email-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="email-label">DIRECT EMAIL</span>
              <a href="mailto:jenishcaleb@gmail.com" className="email-link">
                jenishcaleb@gmail.com
              </a>
            </motion.div>

            {/* Social media links grid */}
            <motion.div 
              className="contact-socials-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a 
                href="https://www.linkedin.com/in/jenish-caleb-v/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-btn"
                style={{ '--btn-accent': '#0077B5' }}
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/JENISHCALEB" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-btn"
                style={{ '--btn-accent': '#ffffff' }}
              >
                <Github size={20} />
              </a>
              <a 
                href="https://x.com/JenishCaleb" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-btn"
                style={{ '--btn-accent': '#ffffff' }}
              >
                <span style={{ fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '1rem' }}>X</span>
              </a>
              <a 
                href="https://www.instagram.com/im_jenish._/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-btn"
                style={{ '--btn-accent': '#EC4899' }}
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@THEROYALCLUB18" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-btn"
                style={{ '--btn-accent': '#EF4444' }}
              >
                <Youtube size={20} />
              </a>
            </motion.div>
          </div>

          {/* Glassmorphism Form Card */}
          <motion.div 
            className="contact-form-card glass-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <h2 className="form-card-title">Send Message</h2>
            
            {submitted ? (
              <motion.div 
                className="form-success-alert"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="success-icon">✓</span>
                <div>
                  <h4>Transmission Sent</h4>
                  <p>Thank you! Your message has been received.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="netflix-contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {errorMsg && (
                  <div className="form-error-msg" style={{ color: '#EF4444', fontSize: '0.85rem', marginBottom: '10px' }}>
                    {errorMsg}
                  </div>
                )}

                <button type="submit" className="btn btn-primary form-submit-btn" disabled={isSubmitting}>
                  <Send size={16} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
