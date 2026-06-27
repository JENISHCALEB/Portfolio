import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import CodingProfiles from './pages/CodingProfiles'
import Contact from './pages/Contact'

function App() {
  const location = useLocation()

  return (
    <>
      {/* Background effects */}
      <div className="bg-grid" />
      <div className="bg-gradient-orb bg-gradient-orb-1" />
      <div className="bg-gradient-orb bg-gradient-orb-2" />

      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/coding-profiles" element={<CodingProfiles />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default App
