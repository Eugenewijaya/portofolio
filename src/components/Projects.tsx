import { motion } from 'framer-motion'
import { PROJECTS } from '../data'
import { ExternalLink, Layers } from 'lucide-react'
import { CardContainer, CardBody, CardItem } from './ui/3d-card'

export default function Projects() {
  return (
    <section className="relative py-12 h-full flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-3">
            <Layers size={16} className="text-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary border border-secondary/30 px-3 py-1 rounded-full liquid-glass bg-secondary/10">Inventory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-3 tracking-tighter">My Quests & Loot</h2>
          <p className="text-foreground/70 font-bold max-w-xl">Hover over the cards to interact with the 3D gallery.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
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
                      <div className="w-4 h-4 rounded-full border border-foreground/20" style={{ background: repo.color, boxShadow: `0 0 10px ${repo.color}` }} />
                      <span className="text-lg font-black uppercase text-foreground truncate group-hover/card:text-accent transition-colors">
                        {repo.name}
                      </span>
                    </div>
                    {repo.link !== '#' && (
                      <a href={repo.link} target="_blank" rel="noopener noreferrer" className="p-2 liquid-glass rounded-lg hover:-translate-y-1 transition-all">
                        <ExternalLink size={14} className="text-foreground" />
                      </a>
                    )}
                  </CardItem>

                  <CardItem translateZ="30" className="w-full mb-4">
                    <img 
                      src={repo.image} 
                      alt={repo.name}
                      className="w-full h-32 object-cover rounded-xl filter grayscale group-hover/card:grayscale-0 transition-all duration-500"
                    />
                  </CardItem>

                  <CardItem
                    translateZ="20"
                    className="text-xs font-bold text-foreground/70 leading-relaxed flex-1 mb-4"
                  >
                    {repo.description}
                  </CardItem>

                  <CardItem translateZ="40" className="flex flex-wrap gap-2 mb-6">
                    {repo.tags.map(t => (
                      <span key={t} className="text-[10px] font-bold uppercase px-3 py-1 border border-foreground/10 rounded-full liquid-glass bg-foreground/5 text-foreground">
                        {t}
                      </span>
                    ))}
                  </CardItem>

                  <CardItem translateZ="10" className="w-full pt-4 border-t border-foreground/10 mt-auto text-right">
                    <span className="text-[10px] font-bold uppercase" style={{ color: repo.color }}>{repo.category}</span>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
