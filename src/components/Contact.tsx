import { motion } from 'framer-motion'
import { PROFILE } from '../data'
import { Mail, ExternalLink, Send } from 'lucide-react'
import { Github, Linkedin } from './Icons'

export default function Contact() {
  return (
    <section className="relative py-12 h-full flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-3">
            <Send size={16} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary border border-primary/30 px-3 py-1 rounded-full liquid-glass bg-primary/10">Comms Channel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-3 tracking-tighter">Get In Touch</h2>
          <p className="text-foreground/70 font-medium max-w-xl">
            Ready to start a new quest? Drop me a message to collaborate!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
          {/* Contact cards - 5 columns */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
          >
            {[
              {
                label: 'Email',
                value: PROFILE.email,
                href: `mailto:${PROFILE.email}`,
                icon: Mail,
                color: '#6366f1',
                bg: 'glass-primary',
                fg: 'text-primary-foreground'
              },
              {
                label: 'LinkedIn',
                value: 'evid-wijaya',
                href: PROFILE.linkedin,
                icon: Linkedin,
                color: '#0A66C2',
                bg: 'glass-secondary',
                fg: 'text-foreground'
              },
              {
                label: 'GitHub',
                value: 'Eugenewijaya',
                href: PROFILE.github,
                icon: Github,
                color: '#f4f4f5',
                bg: 'glass-accent',
                fg: 'text-accent-foreground'
              },
              {
                label: 'Portfolio',
                value: 'sites.google.com/view/evidwijaya',
                href: PROFILE.portfolio,
                icon: ExternalLink,
                color: '#10b981',
                bg: 'bg-background/20',
                fg: 'text-foreground'
              },
            ].map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                className={`flex items-center gap-4 ${c.bg} ${c.fg} border border-foreground/10 rounded-2xl liquid-glass p-4 cursor-pointer group hover:-translate-y-1 hover:brightness-110 transition-all`}
                aria-label={c.label}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 border border-foreground/20 rounded-xl bg-background/50 liquid-glass"
                >
                  <c.icon size={16} className="text-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase opacity-60 mb-0.5 tracking-widest">{c.label}</p>
                  <p className="text-sm font-bold truncate">{c.value}</p>
                </div>
                <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0" />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA card - 7 columns */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7 liquid-glass p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl border border-foreground/20 glass-primary liquid-glass shadow-lg flex items-center justify-center mb-8">
                <Send size={28} className="text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-black uppercase text-foreground mb-4">Have a project in mind?</h3>
              <p className="text-foreground/70 text-base font-bold leading-relaxed mb-8 max-w-md border-l-2 border-accent pl-4">
                Whether you need graphic design, a web system, an event organized, or cloud infrastructure — I'm here to help you make it happen with quality and creativity.
              </p>
            </div>
            <a
              href={`mailto:${PROFILE.email}`}
              className="glass-btn text-lg w-full flex items-center justify-center gap-3 py-5"
            >
              <Mail size={20} />
              Send me an Email
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-foreground/70"
        >
          <span>© {new Date().getFullYear()} Evid Wijaya. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors cursor-pointer">GitHub</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors cursor-pointer">LinkedIn</a>
            <a href={PROFILE.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors cursor-pointer">Portfolio</a>
          </div>
          <span>Built with React + Tailwind v4 + Gamification</span>
        </motion.div>
      </div>
    </section>
  )
}
