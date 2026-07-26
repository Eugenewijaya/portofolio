import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROFILE } from '../data'
import { useLanguage } from '../context/i18n'

export default function Hero() {
  const { language, t } = useLanguage()
  const currentProfile = PROFILE[language as keyof typeof PROFILE] || PROFILE['en']

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center py-4 md:py-12">
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 md:auto-rows-[200px] auto-rows-auto">
        
        {/* Main Headline (Spans 2x2 on desktop) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="liquid-glass md:col-span-2 md:row-span-2 flex flex-col justify-center p-6 sm:p-8 relative overflow-hidden min-h-[220px]"
        >
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-foreground/10 text-foreground border border-foreground/20 rounded-full liquid-glass">
              Player 1 Start
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mt-8">
            <span className="text-foreground">{currentProfile.name.split(' ')[0]}</span>
            <br />
            <span className="text-accent">{currentProfile.name.split(' ').slice(1).join(' ')}</span>
          </h1>
        </motion.div>

        {/* Avatar (Spans 1x1 on desktop) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="liquid-glass md:col-span-1 md:row-span-1 p-4 flex items-center justify-center relative overflow-hidden group min-h-[220px] max-h-[300px] md:max-h-none"
        >
          <img
            src={currentProfile.avatar}
            alt={currentProfile.name}
            className="w-full h-full object-cover rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="eager"
          />
          {/* Live badge */}
          <div className="absolute bottom-6 right-6 glass-secondary px-3 py-1.5 flex items-center gap-2 text-xs font-bold text-foreground border border-secondary/30 rounded-full liquid-glass">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full bg-foreground opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 bg-foreground" />
            </span>
            Hire Me
          </div>
        </motion.div>

        {/* Info Block (Spans 1x1 on desktop) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="liquid-glass md:col-span-1 md:row-span-1 p-6 flex flex-col justify-between glass-primary group"
        >
          <MapPin size={32} className="text-primary-foreground group-hover:animate-bounce" />
          <div>
            <p className="text-[10px] font-bold text-foreground/70 uppercase mb-1 tracking-widest">Base Camp</p>
            <p className="text-xl font-bold text-foreground uppercase leading-tight">{currentProfile.location}</p>
          </div>
        </motion.div>

        {/* Bio Block (Spans 2x1 on desktop) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="liquid-glass md:col-span-2 md:row-span-1 p-8 flex flex-col justify-center glass-secondary"
        >
          <p className="text-foreground text-lg sm:text-xl font-bold leading-tight uppercase">
            {currentProfile.title}
          </p>
        </motion.div>

        {/* Roles/Tags Block (Spans 2x1 on desktop) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="liquid-glass md:col-span-2 md:row-span-1 p-6 flex flex-col justify-center"
        >
          <div className="flex flex-wrap gap-3">
            {currentProfile.skills.slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="px-4 py-2 text-xs font-bold uppercase rounded-full liquid-glass bg-foreground/5 hover:-translate-y-1 hover:bg-foreground/10 transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA Block 1 (Spans 1x1) */}
        <Link
          to="/projects"
          className="liquid-glass md:col-span-1 md:row-span-1 p-6 flex flex-col items-center justify-center gap-3 glass-accent text-foreground cursor-pointer group hover:bg-accent/20 no-underline"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <Sparkles size={40} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-bold uppercase text-lg text-center leading-tight">{t('nav.inventory')}</span>
          </motion.div>
        </Link>

        {/* CTA Block 2 (Spans 1x1) */}
        <Link
          to="/stats"
          className="liquid-glass md:col-span-1 md:row-span-1 p-6 flex flex-col items-center justify-center gap-3 cursor-pointer group no-underline"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <ArrowRight size={40} className="text-foreground group-hover:translate-x-2 transition-transform duration-300" />
            <span className="font-bold uppercase text-lg text-center leading-tight">{t('btn.next')}<br/>{t('nav.stats')}</span>
          </motion.div>
        </Link>

      </div>
    </section>
  )
}
