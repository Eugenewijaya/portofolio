import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Mail, ExternalLink } from 'lucide-react'
import { Github, Linkedin } from './Icons'
import { PROFILE } from '../data'

const links = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <div
        className={`max-w-6xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'glass-strong glow-accent' : 'glass'
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="text-sm font-semibold tracking-tight text-gradient select-none">
          evid.wijaya
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="px-4 py-1.5 text-sm text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="hidden md:flex items-center gap-3">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-500 hover:text-white transition-colors duration-200 cursor-pointer">
            <Github size={17} />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-500 hover:text-white transition-colors duration-200 cursor-pointer">
            <Linkedin size={17} />
          </a>
          <a
            href="#contact"
            className="ml-2 px-4 py-1.5 rounded-xl text-sm font-medium bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 hover:text-indigo-200 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <Mail size={13} />
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-auto max-w-6xl glass-strong rounded-2xl p-4"
          >
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-4 px-4 pt-3 mt-2 border-t border-white/5">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors cursor-pointer"><Github size={18} /></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors cursor-pointer"><Linkedin size={18} /></a>
              <a href={`mailto:${PROFILE.email}`} className="text-zinc-400 hover:text-white transition-colors cursor-pointer"><Mail size={18} /></a>
              <a href={PROFILE.portfolio} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors cursor-pointer"><ExternalLink size={18} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
