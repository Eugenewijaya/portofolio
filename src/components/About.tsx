import { motion } from 'framer-motion'
import { PROFILE, CERTIFICATIONS } from '../data'
import { Award, Zap, Code, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/i18n'

export default function About() {
  const { language, t } = useLanguage()
  const currentProfile = PROFILE[language as keyof typeof PROFILE] || PROFILE['en']
  const currentCerts = CERTIFICATIONS[language as keyof typeof CERTIFICATIONS] || CERTIFICATIONS['en']

  return (
    <section className="relative py-12 h-full flex flex-col justify-center max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center flex flex-col items-center"
      >
        <div className="flex items-center gap-3 mb-3">
          <Zap size={16} className="text-secondary" />
          <span className="text-xs font-bold uppercase tracking-widest text-secondary border border-secondary/30 px-3 py-1 rounded-full liquid-glass bg-secondary/10">
            Character Profile
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-3 tracking-tighter">
          {t('about.title')}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">
        {/* Bio + avatar - 7 columns */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 liquid-glass p-8"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            <div className="relative">
              <img
                src={currentProfile.avatar}
                alt={currentProfile.name}
                className="w-24 h-24 object-cover rounded-2xl border border-foreground/20 shadow-xl"
              />
              <div className="absolute -bottom-3 -right-3 glass-accent text-foreground px-3 py-1 text-xs font-bold uppercase rounded-xl liquid-glass border border-accent/30 shadow-lg">
                Pro
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-foreground uppercase mb-1">{currentProfile.name}</h3>
              <p className="text-sm font-bold text-foreground/70 uppercase">{currentProfile.title}</p>
            </div>
          </div>
          <p className="text-foreground/80 text-base font-medium leading-relaxed border-l-2 border-accent pl-4">
            {currentProfile.bio}
          </p>
        </motion.div>

        {/* Skills - 5 columns */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 liquid-glass p-8 glass-primary"
        >
          <div className="flex items-center gap-3 mb-6">
            <Code size={24} className="text-primary-foreground" />
            <h3 className="text-lg font-black text-primary-foreground uppercase tracking-wider">{t('about.coreSkills')}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {currentProfile.skills.map((skill: string, i: number) => (
              <motion.span
                key={skill}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                className="px-4 py-2 text-xs font-bold uppercase rounded-full liquid-glass bg-foreground/5 hover:-translate-y-1 hover:bg-foreground/10 text-primary-foreground border border-primary-foreground/20 transition-all cursor-default"
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
          className="lg:col-span-12 liquid-glass p-8 glass-accent"
        >
          <div className="flex items-center gap-3 mb-8">
            <Award size={24} className="text-accent-foreground" />
            <h3 className="text-lg font-bold text-foreground uppercase tracking-wider">{t('about.badges')}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentCerts.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                className="flex flex-col p-4 rounded-xl liquid-glass border border-foreground/10 bg-background/20 group hover:-translate-y-1 hover:bg-background/30 transition-all cursor-default"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full border border-foreground/20" style={{ background: cert.color, boxShadow: `0 0 8px ${cert.color}` }} />
                  <p className="text-[10px] font-bold text-foreground/80 uppercase">{cert.issuer}</p>
                </div>
                <p className="text-sm font-black text-foreground uppercase leading-tight">{cert.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pagination Next */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 flex justify-end"
      >
        <Link to="/experience" className="liquid-glass px-6 py-4 flex items-center gap-4 group hover:bg-accent/10 transition-colors no-underline">
          <div className="text-right">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-foreground/50 mb-1">{t('btn.next')}</span>
            <span className="block text-lg font-black uppercase text-foreground">{t('nav.quests')}</span>
          </div>
          <div className="w-12 h-12 rounded-full glass-accent flex items-center justify-center group-hover:translate-x-2 transition-transform">
            <ArrowRight size={24} className="text-foreground" />
          </div>
        </Link>
      </motion.div>
    </section>
  )
}
