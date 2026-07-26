import { motion } from 'framer-motion'
import { PROFILE } from '../data'
import { Mail, ExternalLink, Send, ArrowRight } from 'lucide-react'
import { Github, Linkedin } from './Icons'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/i18n'

export default function Contact() {
  const { language, t } = useLanguage()
  const currentProfile = PROFILE[language as keyof typeof PROFILE] || PROFILE['en']

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
            <span className="text-xs font-bold uppercase tracking-widest text-primary border border-primary/30 px-3 py-1 rounded-full liquid-glass bg-primary/10">
              Contact Information
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-3 tracking-tighter">
            {t('contact.title')}
          </h2>
          <p className="text-foreground/70 font-medium max-w-xl">
            {t('contact.desc')}
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
                value: currentProfile.email,
                href: `mailto:${currentProfile.email}`,
                icon: Mail,
                color: '#6366f1',
                bg: 'glass-primary',
                fg: 'text-primary-foreground'
              },
              {
                label: 'LinkedIn',
                value: 'evid-wijaya',
                href: currentProfile.linkedin,
                icon: Linkedin,
                color: '#0A66C2',
                bg: 'glass-secondary',
                fg: 'text-foreground'
              },
              {
                label: 'GitHub',
                value: 'Eugenewijaya',
                href: currentProfile.github,
                icon: Github,
                color: '#f4f4f5',
                bg: 'glass-accent',
                fg: 'text-accent-foreground'
              },
              {
                label: 'Portfolio',
                value: 'sites.google.com/view/evidwijaya',
                href: currentProfile.portfolio,
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
              <h3 className="text-3xl font-black uppercase text-foreground mb-4">{t('contact.ctaTitle')}</h3>
              <p className="text-foreground/70 text-base font-bold leading-relaxed mb-8 max-w-md border-l-2 border-accent pl-4">
                {t('contact.ctaDesc')}
              </p>
            </div>
            <a
              href={`mailto:${currentProfile.email}`}
              className="glass-btn text-lg w-full flex items-center justify-center gap-3 py-5"
            >
              <Mail size={20} />
              {t('contact.btn')}
            </a>
          </motion.div>
        </div>

        {/* Pagination Next */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-end"
        >
          <Link to="/" className="liquid-glass px-6 py-4 flex items-center gap-4 group hover:bg-accent/10 transition-colors no-underline">
            <div className="text-right">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-foreground/50 mb-1">{t('btn.next')}</span>
              <span className="block text-lg font-black uppercase text-foreground">{t('nav.home')}</span>
            </div>
            <div className="w-12 h-12 rounded-full glass-accent flex items-center justify-center group-hover:translate-x-2 transition-transform">
              <ArrowRight size={24} className="text-foreground" />
            </div>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-foreground/70"
        >
          <span>© {new Date().getFullYear()} Evid Wijaya. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href={currentProfile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors cursor-pointer">GitHub</a>
            <a href={currentProfile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors cursor-pointer">LinkedIn</a>
            <a href={currentProfile.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors cursor-pointer">Portfolio</a>
          </div>
          <span>Built with React + Tailwind v4 + Liquid Glass</span>
        </motion.div>
      </div>
    </section>
  )
}
