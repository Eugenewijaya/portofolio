import { motion } from 'framer-motion'
import { PROFILE, CERTIFICATIONS } from '../data'
import { Award, Zap, Code } from 'lucide-react'

export default function About() {
  return (
    <section className="relative py-12 h-full flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-3">
            <Zap size={16} className="text-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary border-2 border-secondary px-2 py-0.5 rounded-full">Character Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-3 tracking-tighter">Who I Am</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">
          {/* Bio + avatar - 7 columns */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 liquid-glass p-8 bg-background"
          >
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
              <div className="relative">
                <img
                  src={PROFILE.avatar}
                  alt={PROFILE.name}
                  className="w-24 h-24 object-cover border-4 border-foreground shadow-[4px_4px_0px_var(--foreground)]"
                />
                <div className="absolute -bottom-3 -right-3 bg-accent text-accent-foreground px-2 py-1 text-xs font-black uppercase border-2 border-foreground shadow-[2px_2px_0px_var(--foreground)]">
                  Pro
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground uppercase mb-1">{PROFILE.name}</h3>
                <p className="text-sm font-bold text-foreground/70 uppercase">{PROFILE.title}</p>
              </div>
            </div>
            <p className="text-foreground/80 text-base font-medium leading-relaxed border-l-4 border-accent pl-4">
              {PROFILE.bio}
            </p>
          </motion.div>

          {/* Skills - 5 columns */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 liquid-glass p-8 bg-primary"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code size={24} className="text-primary-foreground" />
              <h3 className="text-lg font-black text-primary-foreground uppercase tracking-wider">Core Skills</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {PROFILE.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  className="px-4 py-2 text-xs font-black uppercase rounded-none border-2 border-primary-foreground text-primary-foreground shadow-[3px_3px_0px_var(--primary-foreground)] bg-primary hover:-translate-y-1 hover:shadow-[4px_4px_0px_var(--primary-foreground)] transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Certifications - 12 columns */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-12 liquid-glass p-8 bg-accent"
          >
            <div className="flex items-center gap-3 mb-8">
              <Award size={24} className="text-accent-foreground" />
              <h3 className="text-lg font-black text-accent-foreground uppercase tracking-wider">Badges & Achievements</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                  className="flex flex-col p-4 border-2 border-accent-foreground shadow-[3px_3px_0px_var(--accent-foreground)] bg-background group hover:-translate-y-1 hover:shadow-[4px_4px_0px_var(--accent-foreground)] transition-all cursor-default"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 border-2 border-foreground rounded-sm" style={{ background: cert.color }} />
                    <p className="text-[10px] font-black text-foreground/60 uppercase">{cert.issuer}</p>
                  </div>
                  <p className="text-sm font-black text-foreground uppercase leading-tight">{cert.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
