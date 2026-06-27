import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './ProfilePhoto.css'

export default function ProfilePhoto({ size = 'lg', animate = true, tilt = true, className = '' }) {
  const ref = useRef(null)
  const [tiltStyle, setTiltStyle] = useState({})

  const sizes = {
    sm: 40,
    md: 80,
    lg: 380,
  }

  const dimension = sizes[size] || sizes.lg

  const handleMouseMove = (e) => {
    if (!tilt || size === 'sm') return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    })
  }

  if (size === 'sm') {
    return (
      <div className={`profile-photo-sm ${className}`}>
        <img
          src="/images/jenish-profile-new.jpg"
          alt="Jenish Caleb V"
          width={dimension}
          height={dimension}
        />
      </div>
    )
  }

  return (
    <motion.div
      className={`profile-photo-wrapper profile-photo-${size} ${className}`}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      animate={animate ? { y: [0, -12, 0] } : {}}
      transition={animate ? {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      } : {}}
    >
      {/* Glassmorphism backdrop */}
      <div className="profile-backdrop" />

      {/* Animated gradient border ring - Netflix Crimson theme */}
      <div className="profile-border-ring">
        <div className="profile-image-container">
          <img
            src="/images/jenish-profile-new.jpg"
            alt="Jenish Caleb V"
            width={dimension}
            height={dimension}
          />
        </div>
      </div>

      {/* Rim light glow effect */}
      <div className="profile-glow" />
    </motion.div>
  )
}
