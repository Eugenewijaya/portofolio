import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { EXPERIENCE, EDUCATION } from '../data'
import { Briefcase, GraduationCap, Zap } from 'lucide-react'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="relative py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Briefcase size={16} className="text-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary border-2 border-secondary px-2 py-0.5 rounded-full">Career</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-3 tracking-tighter">Experience & Education</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">
          {/* Experience timeline - 8 columns */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ x: -30, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="liquid-glass p-6 sm:p-8 flex flex-col sm:flex-row gap-6 relative"
              >
                {/* Visual Connector line for desktop */}
                {i !== EXPERIENCE.length - 1 && (
                  <div className="hidden sm:block absolute left-12 top-20 w-1 h-[calc(100%+24px)] bg-foreground/10" />
                )}

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-foreground shadow-[3px_3px_0px_var(--foreground)] z-10 bg-background"
                >
                  <div className="w-4 h-4 rounded-sm border-2 border-foreground" style={{ background: exp.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-black uppercase text-foreground">{exp.role}</h3>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-sm flex-shrink-0 border-2 border-foreground shadow-[2px_2px_0px_var(--foreground)] bg-background uppercase"
                      style={{ color: exp.color }}
                    >
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-foreground/80 mb-1">{exp.company}</p>
                  <p className="text-xs font-bold uppercase text-foreground/50 mb-4">{exp.period} · {exp.location}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map(h => (
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
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="liquid-glass p-6 flex flex-col h-full bg-primary"
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap size={24} className="text-primary-foreground" />
                <h3 className="text-lg font-black text-primary-foreground uppercase tracking-wider">Education</h3>
              </div>
              <div className="space-y-6 flex-1">
                {EDUCATION.map(edu => (
                  <div key={edu.school} className="border-l-4 border-primary-foreground/20 pl-4 py-1">
                    <p className="text-base font-black text-primary-foreground uppercase">{edu.school}</p>
                    <p className="text-sm font-bold text-primary-foreground/70 mt-1">{edu.degree}</p>
                    <p className="text-xs font-bold uppercase text-primary-foreground/50 mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick stats Bento */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="liquid-glass p-6 bg-accent"
            >
              <h3 className="text-lg font-black text-accent-foreground uppercase tracking-wider mb-6">Impact Stats</h3>
              <div className="space-y-4">
                {[
                  { label: 'Designs Produced', value: '200+', icon: '🎨' },
                  { label: 'Social Media Growth', value: '200%', icon: '📈' },
                  { label: 'Event Participants', value: '30+', icon: '🤝' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center justify-between p-3 border-2 border-accent-foreground rounded-lg bg-background text-foreground shadow-[3px_3px_0px_var(--accent-foreground)]">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-xs font-bold uppercase">{stat.label}</span>
                    </div>
                    <span className="font-black">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
