import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Home, User, Briefcase, Layout, Mail, Gamepad2 } from 'lucide-react'
import { PROFILE } from '../data'

export default function Sidebar() {
  const location = useLocation()

  const links = [
    { name: 'Lobby', path: '/', icon: Home, color: '#38bdf8' },
    { name: 'Player Stats', path: '/stats', icon: Gamepad2, color: '#f59e0b' },
    { name: 'About', path: '/about', icon: User, color: '#a855f7' },
    { name: 'Quests', path: '/experience', icon: Briefcase, color: '#10b981' },
    { name: 'Inventory', path: '/projects', icon: Layout, color: '#ec4899' },
    { name: 'Connect', path: '/contact', icon: Mail, color: '#6366f1' },
  ]

  return (
    <motion.nav 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-64 liquid-glass z-50 rounded-none border-t-0 border-b-0 border-l-0 flex flex-col justify-between py-8 overflow-y-auto"
    >
      <div className="px-6 flex flex-col gap-10">
        {/* Profile Avatar / Logo */}
        <Link to="/" className="flex flex-col items-center gap-4 group cursor-pointer">
          <div className="relative">
            <img 
              src={PROFILE.avatar} 
              alt={PROFILE.name} 
              className="w-20 h-20 rounded-full border-4 border-foreground object-cover shadow-[4px_4px_0px_var(--foreground)] group-hover:scale-105 transition-transform"
            />
            <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground px-2 py-0.5 text-[10px] font-black uppercase border-2 border-foreground shadow-[2px_2px_0px_var(--foreground)] rotate-12 group-hover:rotate-0 transition-transform">
              Lv. 99
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

      <div className="px-6 mt-10">
        <div className="p-4 border-2 border-foreground bg-primary text-primary-foreground text-xs font-bold shadow-[4px_4px_0px_var(--foreground)] uppercase text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Online & Ready
          </span>
        </div>
      </div>
    </motion.nav>
  )
}
