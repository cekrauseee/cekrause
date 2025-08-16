'use client'

import { setLanguageCookie } from '@/actions'
import de from '@/assets/de.json'
import en from '@/assets/en.json'
import fr from '@/assets/fr.json'
import ja from '@/assets/ja.json'
import { Language } from '@/utils/types'
import { createContext, useContext, useState } from 'react'

const TRANSLATIONS: { [language in Language]: typeof en } = { en, de, fr, ja }

const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
  getTranslation: (key: keyof typeof en) => string
} | null>(null)

export function LanguageProvider({ children, language: defaultLanguage }: Readonly<{ children: React.ReactNode; language: Language }>) {
  const [language, setLanguage] = useState(defaultLanguage)
  const translations = TRANSLATIONS[language]

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: (language: Language) => {
          setLanguage(language)
          setLanguageCookie(language)
        },
        getTranslation: (key: keyof typeof translations) => {
          const translation = translations[key]
          if (!translation) throw new Error('Translation not found')
          return translation
        }
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
