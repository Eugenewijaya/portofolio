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
  GHEvent,
} from '../github'
import { Github, GitCommit, Star, GitFork, Users, BookOpen, Activity, RefreshCw } from 'lucide-react'

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ElementType; color: string }) {
  return (
    <div className="glass-card border-gradient p-5 flex flex-col gap-2 cursor-default">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{label}</span>
        <div className="p-2 rounded-lg" style={{ background: `${color}20` }}>
          <Icon size={14} style={{ color }} />
        </div>
      </div>
      <span className="text-3xl font-bold text-gradient">{value}</span>
    </div>
  )
}

function ContributionGrid({ events }: { events: GHEvent[] }) {
  const weeks = useContributionMap(events)
  const max = Math.max(...weeks.flat(), 1)

  const getColor = (count: number) => {
    if (count === 0) return 'rgba(255,255,255,0.04)'
    const intensity = count / max
    if (intensity < 0.25) return 'rgba(99,102,241,0.3)'
    if (intensity < 0.5) return 'rgba(99,102,241,0.5)'
    if (intensity < 0.75) return 'rgba(99,102,241,0.75)'
    return 'rgba(99,102,241,1)'
  }

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={14} className="text-indigo-400" />
        <h3 className="text-sm font-semibold text-zinc-300">Activity Contributions</h3>
        <span className="ml-auto text-xs text-zinc-600">Last 52 weeks</span>
      </div>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((count, di) => (
              <div
                key={di}
                title={`${count} activities`}
                className="contrib-cell cursor-default"
                style={{ background: getColor(count) }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-xs text-zinc-600">Less</span>
        {[0, 0.25, 0.5, 0.75, 1].map((i, idx) => (
          <div key={idx} className="w-2.5 h-2.5 rounded-sm" style={{ background: getColor(i) }} />
        ))}
        <span className="text-xs text-zinc-600">More</span>
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
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={14} className="text-violet-400" />
        <h3 className="text-sm font-semibold text-zinc-300">Languages Used</h3>
      </div>
      {/* Bar */}
      <div className="flex rounded-full overflow-hidden h-2.5 mb-4 gap-0.5">
        {sorted.map(([lang, count]) => (
          <div
            key={lang}
            title={`${lang}: ${Math.round((count / total) * 100)}%`}
            className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
            style={{ width: `${(count / total) * 100}%`, background: getLanguageColor(lang) }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {sorted.map(([lang, count]) => (
          <div key={lang} className="flex items-center gap-1.5 text-xs text-zinc-400">
            <div className="w-2 h-2 rounded-full" style={{ background: getLanguageColor(lang) }} />
            <span>{lang}</span>
            <span className="text-zinc-600">{Math.round((count / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EventFeed({ events }: { events: GHEvent[] }) {
  const eventLabel = (e: GHEvent) => {
    const repo = e.repo.name.split('/')[1]
    switch (e.type) {
      case 'PushEvent': return { icon: '↑', label: `Pushed to ${repo}`, color: '#6366f1' }
      case 'CreateEvent': return { icon: '+', label: `Created ${repo}`, color: '#10b981' }
      case 'WatchEvent': return { icon: '★', label: `Starred ${repo}`, color: '#f59e0b' }
      case 'ForkEvent': return { icon: '⑂', label: `Forked ${repo}`, color: '#8b5cf6' }
      case 'IssuesEvent': return { icon: '!', label: `Issue on ${repo}`, color: '#ef4444' }
      case 'PullRequestEvent': return { icon: '⤵', label: `PR on ${repo}`, color: '#38bdf8' }
      default: return { icon: '•', label: `${e.type.replace('Event', '')} on ${repo}`, color: '#a1a1aa' }
    }
  }

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <h3 className="text-sm font-semibold text-zinc-300">Live Activity Feed</h3>
        <span className="ml-auto text-xs text-zinc-600 flex items-center gap-1"><RefreshCw size={10} /> Real-time</span>
      </div>
      <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
        {events.slice(0, 15).map(e => {
          const { icon, label, color } = eventLabel(e)
          return (
            <div key={e.id} className="flex items-center gap-3 text-xs group">
              <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 font-bold text-[11px]"
                style={{ background: `${color}20`, color }}>
                {icon}
              </div>
              <span className="text-zinc-400 flex-1 truncate group-hover:text-zinc-200 transition-colors">{label}</span>
              <span className="text-zinc-600 flex-shrink-0">{timeAgo(e.created_at)}</span>
            </div>
          )
        })}
        {events.length === 0 && (
          <p className="text-xs text-zinc-600 text-center py-4">No recent public activity found.</p>
        )}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { data: user, loading: userLoading } = useGitHubUser()
  const { repos, loading: reposLoading } = useGitHubRepos()
  const { events, loading: eventsLoading } = useGitHubEvents()

  const loading = userLoading || reposLoading || eventsLoading
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0)

  return (
    <section id="dashboard" className="relative py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Github size={18} className="text-indigo-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Live Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-3">Public Performance</h2>
          <p className="text-zinc-500 max-w-xl">Real-time data pulled directly from GitHub API. See my coding activity, language trends, and project metrics — live.</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card h-24 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5"
            >
              <StatCard label="Repositories" value={user?.public_repos ?? repos.length} icon={BookOpen} color="#6366f1" />
              <StatCard label="Followers" value={user?.followers ?? '–'} icon={Users} color="#8b5cf6" />
              <StatCard label="Total Stars" value={totalStars} icon={Star} color="#f59e0b" />
              <StatCard label="Recent Events" value={events.length} icon={Activity} color="#10b981" />
            </motion.div>

            {/* Contribution grid + event feed */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5"
            >
              <div className="lg:col-span-2">
                <ContributionGrid events={events} />
              </div>
              <EventFeed events={events} />
            </motion.div>

            {/* Language bar */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <LangBar repos={repos} />
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
