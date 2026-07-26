import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import GameMode from './components/GameMode'

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [isGameMode, setIsGameMode] = useState(false)

  return (
    <Router>
      <div className="relative min-h-screen flex">
        {/* Colorful animated mesh background */}
        <div className="bg-mesh" />
        <div className="bg-blob-3" />

        <Sidebar onToggleGameMode={() => setIsGameMode(true)} />
        
        {/* Main Content Area - padded left by sidebar width (16rem / 64) */}
        <main className="flex-1 ml-64 p-6 min-h-screen">
          <Routes>
            <Route path="/" element={<PageTransition><Hero /></PageTransition>} />
            <Route path="/stats" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          </Routes>
        </main>

        {/* Game Mode Overlay */}
        {isGameMode && <GameMode onClose={() => setIsGameMode(false)} />}
      </div>
    </Router>
  )
}
