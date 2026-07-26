import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  useGitHubUser,
  useGitHubRepos,
  useGitHubEvents,
  useContributionMap,
  getLanguageColor,
  timeAgo,
  type GHEvent,
} from '../github'
import { Star, Users, BookOpen, Activity, RefreshCw } from 'lucide-react'
import { Github } from './Icons'

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ElementType; color: string }) {
  return (
    <div className="liquid-glass p-6 flex flex-col gap-4 cursor-default w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold uppercase tracking-wider text-foreground">{label}</span>
        <div className="p-3 rounded-xl border-2 border-foreground" style={{ background: color, boxShadow: '4px 4px 0px 0px var(--foreground)' }}>
          <Icon size={18} className="text-foreground" />
        </div>
      </div>
      <span className="text-4xl sm:text-5xl font-black text-foreground">{value}</span>
    </div>
  )
}

function ContributionGrid({ events }: { events: GHEvent[] }) {
  const weeks = useContributionMap(events)
  const max = Math.max(...weeks.flat(), 1)

  const getColor = (count: number) => {
    if (count === 0) return 'rgba(0,0,0,0.05)'
    const intensity = count / max
    if (intensity < 0.25) return 'hsl(var(--secondary) / 0.4)'
    if (intensity < 0.5) return 'hsl(var(--secondary) / 0.6)'
    if (intensity < 0.75) return 'hsl(var(--secondary) / 0.8)'
    return 'hsl(var(--secondary))'
  }

  return (
    <div className="liquid-glass p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <Activity size={24} className="text-foreground" />
        <h3 className="text-lg font-black uppercase tracking-tight text-foreground">Activity</h3>
        <span className="ml-auto text-xs font-bold text-foreground/60 uppercase">Last 52 weeks</span>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-4 flex-1 items-end">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1.5">
            {week.map((count, di) => (
              <div
                key={di}
                title={`${count} activities`}
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm border border-foreground/20 cursor-default hover:border-foreground transition-colors"
                style={{ background: count > 0 ? getColor(count) : 'transparent' }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-auto justify-end">
        <span className="text-xs font-bold text-foreground/60 uppercase">Less</span>
        {[0, 0.25, 0.5, 0.75, 1].map((i, idx) => (
          <div key={idx} className="w-3 h-3 rounded-sm border border-foreground/20" style={{ background: i > 0 ? getColor(i * max) : 'transparent' }} />
        ))}
        <span className="text-xs font-bold text-foreground/60 uppercase">More</span>
      </div>
    </div>
  )
}

function LangBar({ repos }: { repos: Array<{ language: string | null }> }) {
  const counts: Record<string, number> = {}
  repos.forEach(r => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1
  })
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8)

  return (
    <div className="liquid-glass p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen size={24} className="text-foreground" />
        <h3 className="text-lg font-black uppercase tracking-tight text-foreground">Languages</h3>
      </div>
      
      <div className="flex border-2 border-foreground h-4 mb-6 rounded-sm overflow-hidden shadow-[3px_3px_0px_var(--foreground)]">
        {sorted.map(([lang, count]) => (
          <div
            key={lang}
            title={`${lang}: ${Math.round((count / total) * 100)}%`}
            className="h-full border-r-2 border-foreground last:border-r-0 transition-all duration-500"
            style={{ width: `${(count / total) * 100}%`, background: getLanguageColor(lang) }}
          />
        ))}
      </div>
      
      <div className="flex flex-wrap gap-x-4 gap-y-3 mt-auto">
        {sorted.map(([lang, count]) => (
          <div key={lang} className="flex items-center gap-2 text-sm font-bold text-foreground uppercase">
            <div className="w-3 h-3 border-2 border-foreground rounded-sm" style={{ background: getLanguageColor(lang) }} />
            {lang} <span className="text-foreground/50">{Math.round((count / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecentEvents({ events }: { events: GHEvent[] }) {
  const display = events.slice(0, 5)
  return (
    <div className="liquid-glass p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <RefreshCw size={24} className="text-foreground" />
        <h3 className="text-lg font-black uppercase tracking-tight text-foreground">Recent Actions</h3>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {display.map(ev => {
          let action = ev.type.replace('Event', '')
          if (ev.type === 'PushEvent') action = `Pushed to ${ev.repo.name}`
          if (ev.type === 'WatchEvent') action = `Starred ${ev.repo.name}`
          if (ev.type === 'CreateEvent') action = `Created ${ev.repo.name}`
          
          return (
            <div key={ev.id} className="flex items-start gap-3 p-3 border-2 border-foreground rounded-xl shadow-[3px_3px_0px_var(--foreground)] bg-background">
              <Github size={16} className="text-foreground mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground truncate">{action}</p>
                <p className="text-xs text-foreground/60 font-medium uppercase mt-1">{timeAgo(ev.created_at)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { data: user } = useGitHubUser()
  const { repos } = useGitHubRepos()
  const { events } = useGitHubEvents()

  const stars = repos.reduce((acc, r) => acc + r.stargazers_count, 0)

  return (
    <section id="dashboard" className="relative py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Activity size={16} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent border-2 border-accent px-2 py-0.5 rounded-full">Live Metrics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-3 tracking-tighter">Performance Dashboard</h2>
          <p className="text-foreground/70 font-medium max-w-xl">Real-time developer analytics pulled directly from the GitHub API.</p>
        </motion.div>

        {/* Bento Grid Layout for Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
          
          {/* Top row: 3 Stat Cards (4 cols each on desktop) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4"
          >
            <StatCard label="Public Repos" value={user?.public_repos || 0} icon={BookOpen} color="#10b981" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4"
          >
            <StatCard label="Total Stars" value={stars} icon={Star} color="#f59e0b" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-4"
          >
            <StatCard label="Followers" value={user?.followers || 0} icon={Users} color="#6366f1" />
          </motion.div>

          {/* Middle row: Contributions (8 cols) + Recent Actions (4 cols) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-8 md:row-span-2"
          >
            <ContributionGrid events={events} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-4 md:row-span-4"
          >
            <RecentEvents events={events} />
          </motion.div>

          {/* Bottom row: Languages (8 cols) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:col-span-8 md:row-span-2"
          >
            <LangBar repos={repos} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
