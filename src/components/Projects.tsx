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
            <Layers size={16} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent border-2 border-accent px-2 py-0.5 rounded-full">GitHub Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-3 tracking-tighter">Creative Projects</h2>
          <p className="text-foreground/70 font-medium max-w-xl">All repositories pulled live from GitHub. Hover over cards for 3D interactive effects!</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="liquid-glass h-48 animate-pulse" />
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
                className="h-full"
              >
                <CardContainer className="inter-var w-full h-full p-0">
                  <CardBody className="liquid-glass relative group/card w-full h-full p-6 flex flex-col hover:bg-background/80">
                    <CardItem
                      translateZ="20"
                      className="w-full flex items-start justify-between gap-2 mb-4"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Github size={20} className="text-foreground flex-shrink-0 group-hover/card:text-accent transition-colors" />
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-lg font-black uppercase text-foreground truncate group-hover/card:text-accent transition-colors">
                          {repo.name}
                        </a>
                      </div>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-foreground rounded-lg shadow-[2px_2px_0px_var(--foreground)] hover:translate-y-0.5 hover:shadow-[0px_0px_0px_var(--foreground)] transition-all bg-background">
                        <ExternalLink size={14} className="text-foreground" />
                      </a>
                    </CardItem>

                    <CardItem
                      translateZ="30"
                      className="text-sm font-medium text-foreground/80 leading-relaxed flex-1 mb-4"
                    >
                      {repo.description || 'No description provided.'}
                    </CardItem>

                    {repo.topics.length > 0 && (
                      <CardItem translateZ="40" className="flex flex-wrap gap-2 mb-6">
                        {repo.topics.slice(0, 4).map(t => (
                          <span key={t} className="text-[10px] font-bold uppercase px-2 py-1 rounded-sm border-2 border-foreground bg-secondary/20 text-foreground shadow-[2px_2px_0px_var(--foreground)]">
                            {t}
                          </span>
                        ))}
                      </CardItem>
                    )}

                    <CardItem translateZ="10" className="w-full flex items-center justify-between pt-4 border-t-2 border-foreground mt-auto">
                      <div className="flex items-center gap-3 text-xs font-bold uppercase text-foreground">
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 border-2 border-foreground rounded-sm" style={{ background: getLanguageColor(repo.language) }} />
                            {repo.language}
                          </div>
                        )}
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-accent" />
                            {repo.stargazers_count}
                          </div>
                        )}
                        {repo.forks_count > 0 && (
                          <div className="flex items-center gap-1">
                            <GitFork size={14} />
                            {repo.forks_count}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-bold uppercase text-foreground/60">{timeAgo(repo.updated_at)}</span>
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
