import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { EXPERIENCE, EDUCATION } from '../data'
import { Briefcase, GraduationCap } from 'lucide-react'

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
            <Briefcase size={16} className="text-sky-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">Career</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-3">Experience</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Experience timeline */}
          <div className="lg:col-span-2 space-y-4">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ x: -30, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="glass-card border-gradient p-6 cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}25` }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ background: exp.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                        style={{ background: `${exp.color}15`, color: exp.color }}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-0.5">{exp.company}</p>
                    <p className="text-[11px] text-zinc-600 mb-3">{exp.period} · {exp.location}</p>
                    <ul className="space-y-1">
                      {exp.highlights.map(h => (
                        <li key={h} className="text-xs text-zinc-500 flex items-start gap-2">
                          <span className="text-zinc-700 mt-0.5 flex-shrink-0">›</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap size={15} className="text-emerald-400" />
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Education</h3>
              </div>
              <div className="space-y-5">
                {EDUCATION.map(edu => (
                  <div key={edu.school} className="border-l border-white/8 pl-4">
                    <p className="text-sm font-semibold text-white">{edu.school}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{edu.degree}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Impact Numbers</h3>
              <div className="space-y-4">
                {[
                  { label: 'Designs Produced', value: '200+', color: '#6366f1' },
                  { label: 'Social Media Growth', value: '200%', color: '#8b5cf6' },
                  { label: 'Seminar Participants', value: '100+', color: '#38bdf8' },
                  { label: 'Years of Experience', value: '3+', color: '#10b981' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">{stat.label}</span>
                    <span className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
