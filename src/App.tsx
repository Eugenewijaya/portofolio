import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguageProvider } from './context/i18n'
import './index.css'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
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
  return (
    <LanguageProvider>
      <Router>
        <div className="relative min-h-screen flex">
          {/* Background layers */}
          <div className="bg-mesh" />
          <div className="bg-blob-3" />

          <Sidebar />
          
          {/* Main Content Area - padded left by sidebar width on desktop, top padded on mobile */}
          <main className="flex-1 ml-0 md:ml-64 p-4 sm:p-6 pt-20 md:pt-6 min-h-screen max-w-full overflow-x-hidden">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageTransition><Hero /></PageTransition>} />
                <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </Router>
    </LanguageProvider>
  )
}
