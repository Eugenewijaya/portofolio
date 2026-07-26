import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useGitHubRepos, getLanguageColor, timeAgo } from '../github'
import { ExternalLink, Github, Star, GitFork, Layers } from 'lucide-react'

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { repos, loading } = useGitHubRepos()

  const display = repos.slice(0, 12)

  return (
    <section id="projects" className="relative py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Layers size={16} className="text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">GitHub Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-3">Creative Projects</h2>
          <p className="text-zinc-500 max-w-xl">All repositories pulled live from GitHub. Click any card to explore the code.</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card h-36 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {display.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                className="glass-card border-gradient p-5 flex flex-col gap-3 cursor-pointer group no-underline"
                aria-label={`Open ${repo.name} on GitHub`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Github size={13} className="text-zinc-500 flex-shrink-0 group-hover:text-indigo-400 transition-colors" />
                    <span className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink size={13} className="text-zinc-700 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5" />
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed flex-1 line-clamp-3">
                  {repo.description || 'No description provided.'}
                </p>

                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 4).map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-zinc-600">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: getLanguageColor(repo.language) }} />
                        {repo.language}
                      </div>
                    )}
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-amber-500" />
                        {repo.stargazers_count}
                      </div>
                    )}
                    {repo.forks_count > 0 && (
                      <div className="flex items-center gap-1">
                        <GitFork size={10} />
                        {repo.forks_count}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-700">{timeAgo(repo.updated_at)}</span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {!loading && repos.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Github size={32} className="text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-500 text-sm">No public repositories found.</p>
          </div>
        )}

        {!loading && repos.length > 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="text-center mt-8"
          >
            <a
              href={`https://github.com/Eugenewijaya?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass-card border border-white/8 text-sm text-zinc-300 hover:text-white hover:border-white/15 transition-all duration-200 cursor-pointer rounded-2xl"
            >
              <Github size={15} />
              View all {repos.length} repositories on GitHub
              <ExternalLink size={13} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
