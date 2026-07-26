import { motion } from 'framer-motion'
import { Activity, Star, Users, Trophy, Target, Zap, Crown } from 'lucide-react'
import { EXPERIENCE, PROJECTS, CERTIFICATIONS } from '../data'

function StatCard({ label, value, icon: Icon, color, suffix = '' }: { label: string; value: string | number; icon: React.ElementType; color: string; suffix?: string }) {
  return (
    <div className="liquid-glass p-6 flex flex-col gap-4 cursor-default w-full bg-background group hover:-translate-y-2 hover:shadow-[8px_8px_0px_var(--foreground)] transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">{label}</span>
        <div className="p-3 rounded-xl liquid-glass" style={{ background: `${color}30`, borderColor: color }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl sm:text-5xl font-black text-foreground uppercase">{value}</span>
        {suffix && <span className="text-xl font-bold text-foreground/50 uppercase">{suffix}</span>}
      </div>
    </div>
  )
}

function SkillProgress({ skill, level, color }: { skill: string, level: number, color: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center text-xs font-black uppercase">
        <span className="text-foreground">{skill}</span>
        <span className="text-foreground/50">Lvl {level}</span>
      </div>
      <div className="h-4 rounded-full liquid-glass p-0.5 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}

export default function Dashboard() {
  // --- Factual Calculations ---
  
  // Total achievements combined (Roles + Projects + Certs)
  const totalQuests = EXPERIENCE.length + PROJECTS.length + CERTIFICATIONS.length
  
  // Level: Base 1 + 1 for each quest completed
  const currentLevel = 1 + totalQuests

  // XP Progress: Since we can't easily parse mixed dates, let's derive it from the total projects/certs mod 10 for visual progress
  const xpPercentage = (totalQuests % 10) * 10 // E.g. 16 quests = 60% progress to next major level tier
  
  // Calculate specific skill levels (Max 99)
  // Cloud Computing: 4 GCP certs + 1 Bangkit experience
  const cloudCount = CERTIFICATIONS.filter(c => c.name.includes('Cloud')).length + EXPERIENCE.filter(e => e.role.includes('Cloud')).length
  const cloudLevel = Math.min(99, 50 + (cloudCount * 8)) // Base 50 + 8 per relevant achievement
  
  // Graphic Design: Star Champs + Fastwork + Design Projects
  const designCount = EXPERIENCE.filter(e => e.role.includes('Design')).length + PROJECTS.filter(p => p.category.includes('Design')).length
  const designLevel = Math.min(99, 60 + (designCount * 10))

  // Event Management: The Journey of Hope + HIMPSI
  const eventCount = EXPERIENCE.filter(e => e.role.includes('Coordinator') || e.highlights.some(h => h.includes('Event'))).length + PROJECTS.filter(p => p.category.includes('Event')).length
  const eventLevel = Math.min(99, 55 + (eventCount * 12))

  // Video Editing: Fastwork + CapCut project
  const videoCount = EXPERIENCE.filter(e => e.role.includes('Video')).length + PROJECTS.filter(p => p.category.includes('Video')).length
  const videoLevel = Math.min(99, 50 + (videoCount * 15))

  // Web Architecture: TheraCare, E-Voting, GCP Web
  const webCount = PROJECTS.filter(p => p.category.includes('Web') || p.category.includes('Cloud')).length
  const webLevel = Math.min(99, 45 + (webCount * 10))

  return (
    <section className="relative py-12 h-full flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-3">
            <Trophy size={16} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent border border-accent/30 px-3 py-1 rounded-full liquid-glass bg-accent/10">Player Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground tracking-tighter">Real Growth Stats</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Level Card - 4 cols */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 liquid-glass p-8 flex flex-col items-center text-center glass-primary"
          >
            <div className="w-24 h-24 rounded-2xl liquid-glass bg-accent/20 flex items-center justify-center mb-6 rotate-3 border-accent/30">
              <Crown size={40} className="text-accent" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">Current Level</h3>
            <div className="text-6xl font-black uppercase tracking-tighter mb-4">{currentLevel}</div>
            
            <div className="w-full text-left mt-auto">
              <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                <span>XP Progress</span>
                <span>{xpPercentage}%</span>
              </div>
              <div className="h-3 rounded-full liquid-glass p-0.5 bg-black/10 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercentage}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-secondary"
                />
              </div>
            </div>
          </motion.div>

          {/* Core Stats - 8 cols */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <StatCard label="Quests Completed" value={totalQuests} icon={Target} color="#10b981" />
            <StatCard label="Experience (Years)" value={new Date().getFullYear() - 2022} icon={Star} color="#f59e0b" />
            <StatCard label="Community Impact" value="300" suffix="+" icon={Users} color="#6366f1" />
            <StatCard label="Creative Assets" value="200" suffix="+" icon={Zap} color="#ec4899" />
          </motion.div>

          {/* Skill Trees - 12 cols */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-12 liquid-glass p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <Activity size={24} className="text-secondary" />
              <h3 className="text-lg font-black uppercase tracking-tight text-foreground">Verified Skill Mastery</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <SkillProgress skill="Graphic Design" level={designLevel} color="#ec4899" />
              <SkillProgress skill="Cloud Computing" level={cloudLevel} color="#38bdf8" />
              <SkillProgress skill="Video Editing" level={videoLevel} color="#f59e0b" />
              <SkillProgress skill="Web Architecture" level={webLevel} color="#10b981" />
              <SkillProgress skill="Event Management" level={eventLevel} color="#6366f1" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
