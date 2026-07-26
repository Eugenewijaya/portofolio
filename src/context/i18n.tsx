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
    'nav.lobby': 'Home',
    'nav.stats': 'Dashboard',
    'nav.about': 'About',
    'nav.quests': 'Experience',
    'nav.inventory': 'Projects',
    'nav.connect': 'Contact',
    'btn.next': 'Next Page',
    'hero.level': '',
    'hero.title': 'Information Systems Student & Graphic Designer',
    'stats.title': 'Skill Analytics',
    'stats.str': 'Technical',
    'stats.agi': 'Efficiency',
    'stats.int': 'Logic',
    'stats.wis': 'Problem Solving',
    'stats.cha': 'Communication',
    'stats.dex': 'Creativity',
    'about.title': 'About Me',
    'about.coreSkills': 'Core Skills',
    'about.badges': 'Certifications & Achievements',
    'exp.title': 'Experience & Education',
    'exp.edu': 'Education',
    'exp.stats': 'Impact Stats',
    'projects.title': 'My Projects',
    'contact.title': 'Get In Touch',
    'contact.desc': 'Ready to start a new project? Drop me a message to collaborate!',
    'contact.email': 'Send me an Email',
    'footer.rights': 'All rights reserved.',
    'footer.built': 'Built with React + Tailwind v4',
  },
  id: {
    'nav.lobby': 'Beranda',
    'nav.stats': 'Dasbor',
    'nav.about': 'Tentang Saya',
    'nav.quests': 'Pengalaman',
    'nav.inventory': 'Proyek',
    'nav.connect': 'Kontak',
    'btn.next': 'Halaman Selanjutnya',
    'hero.level': '',
    'hero.title': 'Mahasiswa Sistem Informasi & Desainer Grafis',
    'stats.title': 'Analisis Keahlian',
    'stats.str': 'Teknis',
    'stats.agi': 'Efisiensi',
    'stats.int': 'Logika',
    'stats.wis': 'Pemecahan Masalah',
    'stats.cha': 'Komunikasi',
    'stats.dex': 'Kreativitas',
    'about.title': 'Tentang Saya',
    'about.coreSkills': 'Keahlian Utama',
    'about.badges': 'Sertifikasi & Prestasi',
    'exp.title': 'Pengalaman & Pendidikan',
    'exp.edu': 'Pendidikan',
    'exp.stats': 'Statistik Pencapaian',
    'projects.title': 'Proyek Saya',
    'contact.title': 'Hubungi Saya',
    'contact.desc': 'Siap memulai proyek baru? Kirimkan pesan untuk berkolaborasi!',
    'contact.email': 'Kirim Email ke Saya',
    'footer.rights': 'Hak cipta dilindungi.',
    'footer.built': 'Dibuat dengan React + Tailwind v4',
  },
  zh: {
    'nav.lobby': '首页',
    'nav.stats': '仪表盘',
    'nav.about': '关于我',
    'nav.quests': '经验',
    'nav.inventory': '项目',
    'nav.connect': '联系我',
    'btn.next': '下一页',
    'hero.level': '',
    'hero.title': '信息系统学生 & 平面设计师',
    'stats.title': '技能分析',
    'stats.str': '技术',
    'stats.agi': '效率',
    'stats.int': '逻辑',
    'stats.wis': '解决问题',
    'stats.cha': '沟通',
    'stats.dex': '创造力',
    'about.title': '关于我',
    'about.coreSkills': '核心技能',
    'about.badges': '证书与成就',
    'exp.title': '经验与教育',
    'exp.edu': '教育背景',
    'exp.stats': '影响数据',
    'projects.title': '我的项目',
    'contact.title': '联系我',
    'contact.desc': '准备好开始新项目了吗？给我发信息合作吧！',
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
