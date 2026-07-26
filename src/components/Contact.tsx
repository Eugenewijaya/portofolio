import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { PROFILE } from '../data'
import { Mail, Github, Linkedin, ExternalLink, Send } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="relative py-24 px-6" ref={ref}>
      {/* Decorative bottom orbs */}
      <div className="orb w-[400px] h-[400px] bg-indigo-600/15 -bottom-20 left-1/4" style={{ animationDelay: '1s' }} />
      <div className="orb w-[300px] h-[300px] bg-violet-600/10 -bottom-10 right-0" style={{ animationDelay: '3s' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Send size={16} className="text-indigo-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Let's Talk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-3">Get In Touch</h2>
          <p className="text-zinc-500 max-w-xl">
            I'm always open to new projects, collaborations, or just a friendly conversation. Drop me a message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact cards */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              {
                label: 'Email',
                value: PROFILE.email,
                href: `mailto:${PROFILE.email}`,
                icon: Mail,
                color: '#6366f1',
              },
              {
                label: 'LinkedIn',
                value: 'evid-wijaya',
                href: PROFILE.linkedin,
                icon: Linkedin,
                color: '#0A66C2',
              },
              {
                label: 'GitHub',
                value: 'Eugenewijaya',
                href: PROFILE.github,
                icon: Github,
                color: '#f4f4f5',
              },
              {
                label: 'Portfolio',
                value: 'sites.google.com/view/evidwijaya',
                href: PROFILE.portfolio,
                icon: ExternalLink,
                color: '#10b981',
              },
            ].map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ y: 15, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-4 glass-card border-gradient p-5 cursor-pointer group no-underline"
                aria-label={c.label}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}25` }}
                >
                  <c.icon size={16} style={{ color: c.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-zinc-600 mb-0.5">{c.label}</p>
                  <p className="text-sm text-zinc-300 group-hover:text-white transition-colors truncate">{c.value}</p>
                </div>
                <ExternalLink size={12} className="text-zinc-700 group-hover:text-zinc-400 transition-colors ml-auto flex-shrink-0" />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 glass-card border-gradient p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mb-6">
                <Send size={22} className="text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Have a project in mind?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                Whether you need graphic design, a web system, an event organized, or cloud infrastructure — I'm here to help you make it happen with quality and creativity.
              </p>
            </div>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 cursor-pointer"
            >
              <Mail size={16} />
              Send me an Email
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-700"
        >
          <span>© {new Date().getFullYear()} Evid Wijaya. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors cursor-pointer">GitHub</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors cursor-pointer">LinkedIn</a>
            <a href={PROFILE.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors cursor-pointer">Portfolio</a>
          </div>
          <span>Built with React + Framer Motion</span>
        </motion.div>
      </div>
    </section>
  )
}
