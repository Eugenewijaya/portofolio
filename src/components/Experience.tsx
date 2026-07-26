import { motion } from 'framer-motion'
import { EXPERIENCE, EDUCATION } from '../data'
import { Briefcase, GraduationCap, Zap, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/i18n'

export default function Experience() {
  const { language, t } = useLanguage()
  const currentExp = EXPERIENCE[language as keyof typeof EXPERIENCE] || EXPERIENCE['en']
  const currentEdu = EDUCATION[language as keyof typeof EDUCATION] || EDUCATION['en']

  return (
    <section className="relative py-12 h-full flex flex-col justify-center max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center flex flex-col items-center"
      >
        <div className="flex items-center gap-3 mb-3">
          <Briefcase size={16} className="text-secondary" />
          <span className="text-xs font-bold uppercase tracking-widest text-secondary border border-secondary/30 px-3 py-1 rounded-full liquid-glass bg-secondary/10">
            Quest Log
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-3 tracking-tighter">
          {t('exp.title')}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">
        {/* Experience timeline - 8 columns */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {currentExp.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="liquid-glass p-6 sm:p-8 flex flex-col sm:flex-row gap-6 relative"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-foreground/20 z-10 liquid-glass bg-foreground/5">
                <div className="w-4 h-4 rounded-full" style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}` }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-black uppercase text-foreground">{exp.role}</h3>
                  <span
                    className="text-[10px] font-bold px-3 py-1 flex-shrink-0 border border-foreground/10 rounded-full liquid-glass bg-foreground/5 uppercase tracking-widest"
                    style={{ color: exp.color, borderColor: `${exp.color}40` }}
                  >
                    {exp.type}
                  </span>
                </div>
                <p className="text-sm font-bold text-foreground/80 mb-1">{exp.company}</p>
                <p className="text-xs font-bold uppercase text-foreground/50 mb-4">{exp.period} · {exp.location}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((h: string) => (
                    <li key={h} className="text-sm font-medium text-foreground/70 flex items-start gap-3">
                      <Zap size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Sidebar Bento - 4 columns */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="liquid-glass p-6 flex flex-col h-full glass-primary"
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap size={24} className="text-primary-foreground" />
              <h3 className="text-lg font-black text-primary-foreground uppercase tracking-wider">{t('exp.edu')}</h3>
            </div>
            <div className="space-y-6 flex-1">
              {currentEdu.map((edu) => (
                <div key={edu.school} className="border-l-2 border-primary-foreground/30 pl-4 py-1">
                  <p className="text-base font-bold text-primary-foreground uppercase leading-tight">{edu.school}</p>
                  <p className="text-sm font-bold text-primary-foreground/70 mt-2">{edu.degree}</p>
                  <p className="text-[10px] font-black tracking-widest uppercase text-primary-foreground/50 mt-1">{edu.period}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick stats Bento */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="liquid-glass p-6 glass-accent"
          >
            <h3 className="text-lg font-bold text-foreground uppercase tracking-wider mb-6">{t('exp.stats')}</h3>
            <div className="space-y-4">
              {[
                { label: 'Designs Produced', value: '200+', icon: '🎨' },
                { label: 'Social Media Growth', value: '200%', icon: '📈' },
                { label: 'Event Participants', value: '100+', icon: '🤝' },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl liquid-glass border border-foreground/20 bg-background/40">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{stat.icon}</span>
                    <span className="text-[10px] font-bold uppercase text-foreground/80">{stat.label}</span>
                  </div>
                  <span className="font-black">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pagination Next */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 flex justify-end"
      >
        <Link to="/projects" className="liquid-glass px-6 py-4 flex items-center gap-4 group hover:bg-accent/10 transition-colors no-underline">
          <div className="text-right">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-foreground/50 mb-1">{t('btn.next')}</span>
            <span className="block text-lg font-black uppercase text-foreground">{t('nav.inventory')}</span>
          </div>
          <div className="w-12 h-12 rounded-full glass-accent flex items-center justify-center group-hover:translate-x-2 transition-transform">
            <ArrowRight size={24} className="text-foreground" />
          </div>
        </Link>
      </motion.div>
    </section>
  )
}
