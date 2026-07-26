import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { PROFILE, CERTIFICATIONS } from '../data'
import { Award, Zap } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Zap size={16} className="text-violet-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-3">Who I Am</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Bio + avatar */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 glass-card border-gradient p-7"
          >
            <div className="flex items-start gap-5 mb-6">
              <img
                src={PROFILE.avatar}
                alt={PROFILE.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/20 flex-shrink-0"
              />
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{PROFILE.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{PROFILE.title}</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">{PROFILE.bio}</p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 glass-card p-7"
          >
            <h3 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {PROFILE.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  className="px-3 py-1.5 text-xs font-medium rounded-xl glass border border-white/8 text-zinc-300 hover:border-indigo-500/40 hover:text-indigo-300 transition-all duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 glass-card p-7"
          >
            <div className="flex items-center gap-2 mb-5">
              <Award size={15} className="text-amber-400" />
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Certifications</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ y: 15, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-200 cursor-default"
                  style={{ background: `${cert.color}08` }}
                >
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: cert.color }} />
                  <div>
                    <p className="text-xs font-medium text-zinc-200 leading-snug">{cert.name}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
