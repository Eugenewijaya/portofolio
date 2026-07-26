import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Home, User, Briefcase, Layout, Mail, Gamepad2, Play, Menu, X } from 'lucide-react'
import { PROFILE } from '../data'

export default function Sidebar({ onToggleGameMode }: { onToggleGameMode: () => void }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { name: 'Lobby', path: '/', icon: Home, color: '#38bdf8' },
    { name: 'Player Stats', path: '/stats', icon: Gamepad2, color: '#f59e0b' },
    { name: 'About', path: '/about', icon: User, color: '#a855f7' },
    { name: 'Quests', path: '/experience', icon: Briefcase, color: '#10b981' },
    { name: 'Inventory', path: '/projects', icon: Layout, color: '#ec4899' },
    { name: 'Connect', path: '/contact', icon: Mail, color: '#6366f1' },
  ]

  const realisticLevel = 17 

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/50 backdrop-blur-md border-b border-foreground/10 z-40 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={PROFILE.avatar} 
            alt={PROFILE.name} 
            className="w-10 h-10 rounded-full border border-foreground/20 object-cover shadow-lg"
          />
          <div>
            <h1 className="text-sm font-black uppercase text-foreground leading-tight">{PROFILE.name}</h1>
            <span className="text-[9px] font-black uppercase text-accent">Lv. {realisticLevel}</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleGameMode}
            className="glass-btn px-3 py-1.5 text-xs flex items-center gap-1.5 bg-accent/20 border-accent/30 text-accent"
          >
            <Play size={14} /> Game
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="glass-btn p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-foreground/50 z-40 backdrop-blur-xs"
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar (Desktop fixed left, Mobile drawer) */}
      <motion.nav 
        initial={false}
        animate={{ 
          x: typeof window !== 'undefined' && window.innerWidth < 768 ? (mobileOpen ? 0 : -320) : 0 
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed left-0 top-0 h-screen w-64 liquid-glass z-50 rounded-none border-t-0 border-b-0 border-l-0 flex flex-col justify-between py-8 overflow-y-auto ${
          mobileOpen ? 'shadow-2xl' : ''
        }`}
      >
      <div className="px-6 flex flex-col gap-10">
        {/* Profile Avatar / Logo */}
        <Link to="/" className="flex flex-col items-center gap-4 group cursor-pointer">
          <div className="relative">
            <img 
              src={PROFILE.avatar} 
              alt={PROFILE.name} 
              className="w-20 h-20 rounded-full border border-foreground/20 object-cover shadow-xl group-hover:scale-105 transition-transform"
            />
            <div className="absolute -bottom-2 -right-2 liquid-glass bg-accent/80 text-accent-foreground px-2 py-0.5 text-[10px] font-black uppercase rotate-12 group-hover:rotate-0 transition-transform">
              Lv. {realisticLevel}
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-black uppercase text-foreground">{PROFILE.name}</h1>
            <p className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest mt-1">Creative Player</p>
          </div>
        </Link>

        {/* Gamified Menu */}
        <div className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`game-menu-item ${isActive ? 'active' : ''}`}
                style={{ 
                  '--accent': link.color, 
                  '--secondary': link.color 
                } as React.CSSProperties}
              >
                <link.icon size={18} className="flex-shrink-0" style={{ color: isActive ? link.color : 'inherit' }} />
                <span>{link.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 w-1 h-full"
                    style={{ background: link.color }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="px-6 mt-10 flex flex-col gap-4">
        <button 
          onClick={onToggleGameMode}
          className="glass-btn flex justify-center items-center gap-2 group text-sm"
        >
          <Play size={16} className="group-hover:rotate-12 transition-transform" />
          Enter Game Mode
        </button>

        <div className="liquid-glass p-4 text-xs font-bold uppercase text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-secondary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Online & Ready
          </span>
        </div>
      </div>
    </motion.nav>
    </>
  )
}
