import { motion } from 'framer-motion'
import { Activity, Star, Users, Trophy, Target, Zap, Crown } from 'lucide-react'

function StatCard({ label, value, icon: Icon, color, suffix = '' }: { label: string; value: string | number; icon: React.ElementType; color: string; suffix?: string }) {
  return (
    <div className="liquid-glass p-6 flex flex-col gap-4 cursor-default w-full bg-background group hover:-translate-y-2 hover:shadow-[8px_8px_0px_var(--foreground)] transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">{label}</span>
        <div className="p-3 border-2 border-foreground shadow-[3px_3px_0px_var(--foreground)]" style={{ background: color }}>
          <Icon size={18} className="text-foreground" />
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
      <div className="h-4 border-2 border-foreground bg-background p-0.5 shadow-[2px_2px_0px_var(--foreground)]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-foreground"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}

export default function Dashboard() {
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
            <span className="text-xs font-bold uppercase tracking-widest text-accent border-2 border-accent px-2 py-0.5 rounded-full">Player Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-foreground tracking-tighter">Stats & Level</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Level Card - 4 cols */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 liquid-glass p-8 flex flex-col items-center text-center bg-primary text-primary-foreground"
          >
            <div className="w-24 h-24 border-4 border-primary-foreground bg-accent flex items-center justify-center mb-6 shadow-[4px_4px_0px_var(--primary-foreground)] rotate-3">
              <Crown size={40} className="text-accent-foreground" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">Current Level</h3>
            <div className="text-6xl font-black uppercase tracking-tighter mb-4">99</div>
            
            <div className="w-full text-left mt-auto">
              <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                <span>XP Progress</span>
                <span>85%</span>
              </div>
              <div className="h-3 border-2 border-primary-foreground bg-primary p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
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
            <StatCard label="Quests Completed" value="45" icon={Target} color="#10b981" />
            <StatCard label="Client Rating" value="4.9" suffix="/5" icon={Star} color="#f59e0b" />
            <StatCard label="Community Impact" value="10k" suffix="+" icon={Users} color="#6366f1" />
            <StatCard label="Creative Power" value="MAX" icon={Zap} color="#ec4899" />
          </motion.div>

          {/* Skill Trees - 12 cols */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-12 liquid-glass p-8 bg-background"
          >
            <div className="flex items-center gap-3 mb-8">
              <Activity size={24} className="text-secondary" />
              <h3 className="text-lg font-black uppercase tracking-tight text-foreground">Skill Tree Mastery</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <SkillProgress skill="Graphic Design (Canva/PS)" level={95} color="#ec4899" />
              <SkillProgress skill="Cloud Computing (GCP)" level={75} color="#38bdf8" />
              <SkillProgress skill="Video Editing (CapCut)" level={85} color="#f59e0b" />
              <SkillProgress skill="Web Architecture" level={70} color="#10b981" />
              <SkillProgress skill="Event Management" level={90} color="#6366f1" />
              <SkillProgress skill="UI/UX Design" level={80} color="#a855f7" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
