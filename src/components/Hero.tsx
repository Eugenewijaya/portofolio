import { motion } from 'framer-motion'
import { MapPin, ArrowDown, Sparkles } from 'lucide-react'
import { PROFILE } from '../data'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Mesh gradient orbs */}
      <div className="orb w-[600px] h-[600px] bg-indigo-600/20 -top-40 -left-40" style={{ animationDelay: '0s' }} />
      <div className="orb w-[500px] h-[500px] bg-violet-600/15 top-20 right-0" style={{ animationDelay: '2s' }} />
      <div className="orb w-[400px] h-[400px] bg-sky-600/10 bottom-0 left-1/3" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative mb-8"
        >
          <div className="relative w-28 h-28 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 p-0.5 animate-spin" style={{ animationDuration: '8s' }}>
              <div className="w-full h-full rounded-full bg-zinc-950" />
            </div>
            <img
              src={PROFILE.avatar}
              alt={PROFILE.name}
              className="absolute inset-0.5 w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full object-cover"
              loading="eager"
            />
          </div>
          {/* Live badge */}
          <div className="absolute -bottom-1 -right-1 glass px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open to work
          </div>
        </motion.div>

        {/* Location chip */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6 glass px-3 py-1.5 rounded-full border border-white/5"
        >
          <MapPin size={11} />
          {PROFILE.location}
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[0.95]"
        >
          <span className="text-gradient">Evid</span>
          <br />
          <span className="text-gradient-accent">Wijaya</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {['Graphic Designer', 'Cloud Computing', 'System Analyst', 'Event Organizer'].map((tag, i) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full glass border border-white/8 text-zinc-400"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed mb-10"
        >
          Final-year IS student · Graphic Designer at Star Champs Indonesia · Commissioner at Sagara Karya Kreanusati ·
          Bangkit Academy Cloud Computing alumnus building impactful digital experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles size={15} />
            View My Work
          </a>
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl glass border border-white/10 text-white/80 hover:text-white text-sm font-semibold transition-all duration-300 hover:bg-white/5 cursor-pointer"
          >
            Live Dashboard
            <ArrowDown size={15} />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-zinc-600">scroll down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
