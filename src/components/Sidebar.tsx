import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Briefcase, Layout, Mail, Gamepad2, Menu, X, Globe } from 'lucide-react'
import { PROFILE } from '../data'
import { useLanguage } from '../context/i18n'
import type { Language } from '../context/i18n'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const currentProfile = PROFILE[language as keyof typeof PROFILE] || PROFILE['en']

  const navItems = [
    { icon: <Home size={20} />, label: t('nav.lobby'), path: '/' },
    { icon: <User size={20} />, label: t('nav.stats'), path: '/stats' },
    { icon: <Gamepad2 size={20} />, label: t('nav.about'), path: '/about' },
    { icon: <Briefcase size={20} />, label: t('nav.quests'), path: '/experience' },
    { icon: <Layout size={20} />, label: t('nav.inventory'), path: '/projects' },
    { icon: <Mail size={20} />, label: t('nav.connect'), path: '/contact' },
  ]

  const links = [
    { name: t('nav.lobby'), path: '/', icon: Home, color: '#38bdf8' },
    { name: t('nav.stats'), path: '/stats', icon: User, color: '#f59e0b' },
    { name: t('nav.about'), path: '/about', icon: Gamepad2, color: '#a855f7' },
    { name: t('nav.quests'), path: '/experience', icon: Briefcase, color: '#10b981' },
    { name: t('nav.inventory'), path: '/projects', icon: Layout, color: '#ec4899' },
    { name: t('nav.connect'), path: '/contact', icon: Mail, color: '#6366f1' },
  ]


  return (
    <>
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/50 backdrop-blur-md border-b border-foreground/10 z-40 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={currentProfile.avatar} 
            alt={currentProfile.name} 
            className="w-10 h-10 rounded-full border border-foreground/20 object-cover shadow-lg"
          />
          <div>
            <h1 className="text-sm font-black uppercase text-foreground leading-tight">{currentProfile.name}</h1>
            <span className="text-[9px] font-black uppercase text-accent">Professional</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="glass-btn p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background/90 backdrop-blur-xl border-b border-white/10 flex flex-col p-4 shadow-xl z-50"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-accent/20 text-accent font-medium' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`${isActive ? 'text-accent animate-pulse' : ''}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              )
            })}
            
            {/* Language Switcher Mobile */}
            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-white/10">
              {(['en', 'id', 'zh'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                    language === lang 
                    ? 'bg-accent text-white shadow-[0_0_10px_rgba(var(--color-accent),0.5)]' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sidebar (Desktop fixed left, Mobile drawer) */}
      <motion.nav 
        initial={false}
        className={`hidden md:flex fixed left-0 top-0 h-screen w-64 liquid-glass z-50 rounded-none border-t-0 border-b-0 border-l-0 flex-col justify-between py-8 overflow-y-auto`}
      >
      <div className="px-6 flex flex-col gap-10">
        {/* Profile Avatar / Logo */}
        <Link to="/" className="flex flex-col items-center gap-4 group cursor-pointer">
          <div className="relative">
            <img 
              src={currentProfile.avatar} 
              alt={currentProfile.name} 
              className="w-20 h-20 rounded-full border border-foreground/20 object-cover shadow-xl group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-black uppercase text-foreground">{currentProfile.name}</h1>
            <p className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest mt-1">Creative Professional</p>
          </div>
        </Link>

        {/* Navigation Menu */}
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
        <div className="glass-panel p-3 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest">
            <Globe size={14} /> Language
          </div>
          <div className="flex items-center gap-2 w-full">
            {(['en', 'id', 'zh'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  language === lang 
                  ? 'bg-accent text-white shadow-[0_0_15px_rgba(var(--color-accent),0.4)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
    </>
  )
}
