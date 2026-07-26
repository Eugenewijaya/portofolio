import { motion } from 'framer-motion'
import { MapPin, ArrowDown, Sparkles } from 'lucide-react'
import { PROFILE } from '../data'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
        
        {/* Main Headline (Spans 2x2 on desktop) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="liquid-glass md:col-span-2 md:row-span-2 flex flex-col justify-center p-8 relative overflow-hidden"
        >
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-foreground text-background border-2 border-foreground rounded-full">
              Portfolio 2026
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mt-8">
            <span className="text-foreground">Evid</span>
            <br />
            <span className="text-accent">Wijaya</span>
          </h1>
        </motion.div>

        {/* Avatar (Spans 1x1 on desktop) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="liquid-glass md:col-span-1 md:row-span-1 p-4 flex items-center justify-center relative overflow-hidden group"
        >
          <img
            src={PROFILE.avatar}
            alt={PROFILE.name}
            className="w-full h-full object-cover rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="eager"
          />
          {/* Live badge */}
          <div className="absolute bottom-6 right-6 bg-secondary px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-foreground border-2 border-foreground shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-foreground" />
            </span>
            Hire Me
          </div>
        </motion.div>

        {/* Info Block (Spans 1x1 on desktop) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="liquid-glass md:col-span-1 md:row-span-1 p-6 flex flex-col justify-between bg-primary"
        >
          <MapPin size={32} className="text-primary-foreground" />
          <div>
            <p className="text-sm font-bold text-primary-foreground/70 uppercase mb-1">Location</p>
            <p className="text-xl font-black text-primary-foreground">{PROFILE.location}</p>
          </div>
        </motion.div>

        {/* Bio Block (Spans 2x1 on desktop) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="liquid-glass md:col-span-2 md:row-span-1 p-8 flex flex-col justify-center bg-secondary"
        >
          <p className="text-foreground text-lg sm:text-xl font-bold leading-tight">
            Final-year IS student · Graphic Designer at Star Champs Indonesia · Commissioner at Sagara Karya Kreanusati
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
            {['Graphic Designer', 'Cloud Computing', 'System Analyst', 'Event Organizer'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-bold uppercase rounded-lg border-2 border-foreground bg-background shadow-[3px_3px_0px_var(--foreground)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA Block 1 (Spans 1x1) */}
        <motion.a
          href="#projects"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="liquid-glass md:col-span-1 md:row-span-1 p-6 flex flex-col items-center justify-center gap-3 bg-accent text-accent-foreground cursor-pointer group hover:bg-accent/90"
        >
          <Sparkles size={40} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-black uppercase text-lg text-center leading-tight">View<br/>Projects</span>
        </motion.a>

        {/* CTA Block 2 (Spans 1x1) */}
        <motion.a
          href="#dashboard"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="liquid-glass md:col-span-1 md:row-span-1 p-6 flex flex-col items-center justify-center gap-3 cursor-pointer group"
        >
          <ArrowDown size={40} className="text-foreground group-hover:translate-y-2 transition-transform duration-300" />
          <span className="font-black uppercase text-lg text-center leading-tight">Live<br/>Stats</span>
        </motion.a>

      </div>
    </section>
  )
}
