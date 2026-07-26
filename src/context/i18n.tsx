import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type Language = 'en' | 'id' | 'zh'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = {
  en: {
    'nav.lobby': 'Lobby',
    'nav.stats': 'Player Stats',
    'nav.about': 'About',
    'nav.quests': 'Quests',
    'nav.inventory': 'Inventory',
    'nav.connect': 'Connect',
    'btn.next': 'Next Page',
    'hero.level': 'Level 17',
    'hero.title': 'Information Systems Student & Graphic Designer',
    'stats.title': 'Player Stats',
    'stats.str': 'Strength',
    'stats.agi': 'Agility',
    'stats.int': 'Intelligence',
    'stats.wis': 'Wisdom',
    'stats.cha': 'Charisma',
    'stats.dex': 'Dexterity',
    'about.title': 'Who I Am',
    'about.coreSkills': 'Core Skills',
    'about.badges': 'Badges & Achievements',
    'exp.title': 'Experience & Education',
    'exp.edu': 'Education',
    'exp.stats': 'Impact Stats',
    'projects.title': 'Inventory',
    'contact.title': 'Get In Touch',
    'contact.desc': 'Ready to start a new quest? Drop me a message to collaborate!',
    'contact.email': 'Send me an Email',
    'footer.rights': 'All rights reserved.',
    'footer.built': 'Built with React + Tailwind v4 + Gamification',
  },
  id: {
    'nav.lobby': 'Beranda',
    'nav.stats': 'Status Karakter',
    'nav.about': 'Tentang Saya',
    'nav.quests': 'Misi & Edukasi',
    'nav.inventory': 'Portofolio',
    'nav.connect': 'Kontak',
    'btn.next': 'Halaman Selanjutnya',
    'hero.level': 'Level 17',
    'hero.title': 'Mahasiswa Sistem Informasi & Desainer Grafis',
    'stats.title': 'Status Karakter',
    'stats.str': 'Kekuatan',
    'stats.agi': 'Kelincahan',
    'stats.int': 'Kecerdasan',
    'stats.wis': 'Kebijaksanaan',
    'stats.cha': 'Karisma',
    'stats.dex': 'Ketangkasan',
    'about.title': 'Siapa Saya',
    'about.coreSkills': 'Keahlian Utama',
    'about.badges': 'Penghargaan & Prestasi',
    'exp.title': 'Pengalaman & Pendidikan',
    'exp.edu': 'Pendidikan',
    'exp.stats': 'Statistik Pencapaian',
    'projects.title': 'Portofolio Proyek',
    'contact.title': 'Hubungi Saya',
    'contact.desc': 'Siap memulai misi baru? Kirimkan pesan untuk berkolaborasi!',
    'contact.email': 'Kirim Email ke Saya',
    'footer.rights': 'Hak cipta dilindungi.',
    'footer.built': 'Dibuat dengan React + Tailwind v4',
  },
  zh: {
    'nav.lobby': '大厅',
    'nav.stats': '玩家状态',
    'nav.about': '关于我',
    'nav.quests': '经验与教育',
    'nav.inventory': '作品集',
    'nav.connect': '联系我',
    'btn.next': '下一页',
    'hero.level': '等级 17',
    'hero.title': '信息系统学生 & 平面设计师',
    'stats.title': '玩家状态',
    'stats.str': '力量',
    'stats.agi': '敏捷',
    'stats.int': '智力',
    'stats.wis': '智慧',
    'stats.cha': '魅力',
    'stats.dex': '灵巧',
    'about.title': '我是谁',
    'about.coreSkills': '核心技能',
    'about.badges': '徽章与成就',
    'exp.title': '经验与教育',
    'exp.edu': '教育背景',
    'exp.stats': '影响数据',
    'projects.title': '作品集',
    'contact.title': '联系我',
    'contact.desc': '准备好开始新任务了吗？给我发信息合作吧！',
    'contact.email': '给我发邮件',
    'footer.rights': '版权所有。',
    'footer.built': '使用 React + Tailwind v4 构建',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
