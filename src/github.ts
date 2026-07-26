import { useEffect, useState } from 'react'

const GITHUB_USER = 'Eugenewijaya'
const BASE = 'https://api.github.com'

export interface GHRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
  fork: boolean
}

export interface GHEvent {
  id: string
  type: string
  created_at: string
  repo: { name: string; url: string }
  payload: Record<string, unknown>
}

export interface GHUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export function useGitHubUser() {
  const [data, setData] = useState<GHUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE}/users/${GITHUB_USER}`)
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GHRepo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE}/users/${GITHUB_USER}/repos?per_page=100&sort=updated`)
      .then(r => r.json())
      .then((data: GHRepo[]) => {
        // Filter out forks, sort by stars + recency
        const filtered = data
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        setRepos(filtered)
      })
      .finally(() => setLoading(false))
  }, [])

  return { repos, loading }
}

export function useGitHubEvents() {
  const [events, setEvents] = useState<GHEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE}/users/${GITHUB_USER}/events/public?per_page=30`)
      .then(r => r.json())
      .then(setEvents)
      .finally(() => setLoading(false))
  }, [])

  return { events, loading }
}

// Build a fake 52-week contribution map from events (public API limitation)
export function useContributionMap(events: GHEvent[]) {
  const weeks: number[][] = []
  const today = new Date()
  // Build 52 weeks × 7 days grid, fill from events
  const countByDate: Record<string, number> = {}
  events.forEach(e => {
    const d = e.created_at.slice(0, 10)
    countByDate[d] = (countByDate[d] || 0) + 1
  })
  for (let w = 51; w >= 0; w--) {
    const days: number[] = []
    for (let d = 0; d < 7; d++) {
      const date = new Date(today)
      date.setDate(today.getDate() - w * 7 - (6 - d))
      const key = date.toISOString().slice(0, 10)
      days.push(countByDate[key] || 0)
    }
    weeks.push(days)
  }
  return weeks
}

export function getLanguageColor(lang: string | null): string {
  const map: Record<string, string> = {
    JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
    HTML: '#e34c26', CSS: '#563d7c', PHP: '#777bb4', Java: '#b07219',
    'C#': '#239120', Go: '#00ADD8', Rust: '#dea584', Vue: '#41b883',
    Shell: '#89e051', Jupyter: '#DA5B0B', null: '#6b7280',
  }
  return map[lang ?? 'null'] ?? '#6b7280'
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}
