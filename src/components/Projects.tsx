import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useGitHubRepos, getLanguageColor, timeAgo } from '../github'
import { ExternalLink, Star, GitFork, Layers } from 'lucide-react'
import { Github } from './Icons'
import { CardContainer, CardBody, CardItem } from './ui/3d-card'

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
          <p className="text-zinc-500 max-w-xl">All repositories pulled live from GitHub. Hover over cards for 3D interactive effects!</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="liquid-glass rounded-xl h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {display.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
              >
                <CardContainer className="inter-var w-full p-0">
                  <CardBody className="liquid-glass border-gradient relative group/card hover:shadow-2xl hover:shadow-indigo-500/[0.1] w-full h-auto rounded-xl p-5 border border-white/10 transition-all duration-300">
                    <CardItem
                      translateZ="20"
                      className="w-full flex items-start justify-between gap-2 mb-4"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Github size={16} className="text-zinc-500 flex-shrink-0 group-hover/card:text-indigo-400 transition-colors" />
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-foreground truncate group-hover/card:text-indigo-500 transition-colors">
                          {repo.name}
                        </a>
                      </div>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} className="text-zinc-400 hover:text-indigo-500 transition-colors flex-shrink-0 mt-0.5" />
                      </a>
                    </CardItem>

                    <CardItem
                      translateZ="30"
                      className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3 mb-4"
                    >
                      {repo.description || 'No description provided.'}
                    </CardItem>

                    {repo.topics.length > 0 && (
                      <CardItem translateZ="40" className="flex flex-wrap gap-1.5 mb-4">
                        {repo.topics.slice(0, 4).map(t => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                            {t}
                          </span>
                        ))}
                      </CardItem>
                    )}

                    <CardItem translateZ="10" className="w-full flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: getLanguageColor(repo.language) }} />
                            {repo.language}
                          </div>
                        )}
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-amber-500" />
                            {repo.stargazers_count}
                          </div>
                        )}
                        {repo.forks_count > 0 && (
                          <div className="flex items-center gap-1">
                            <GitFork size={12} />
                            {repo.forks_count}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500">{timeAgo(repo.updated_at)}</span>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
