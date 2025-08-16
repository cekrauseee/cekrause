'use server'

import { cookies } from 'next/headers'
import { Language } from './utils/types'

export async function setLanguageCookie(language: Language) {
  const store = await cookies()
  store.set('language', language)
}
