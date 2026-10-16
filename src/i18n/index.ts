import { createI18n } from 'vue-i18n'
import type { Messages } from './locales/pt'
import pt from './locales/pt'
import en from './locales/en'

export type Locale = 'pt' | 'en'
export const locales: Record<Locale, Messages> = { pt, en }

const STORAGE_KEY = 'felini-locale'

function initialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    // sem storage: segue no padrão
  }
  return 'pt'
}

export function saveLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // ignora
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale(),
  fallbackLocale: 'pt' as Locale,
  messages: { pt: {} as never, en: {} as never },
})
