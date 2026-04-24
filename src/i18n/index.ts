import { createI18n } from 'vue-i18n'
import type { Messages } from './types'
import pt from './locales/pt'
import en from './locales/en'

export type Locale = 'pt' | 'en'
export const locales: Record<Locale, Messages> = { pt, en }

export const i18n = createI18n({
  legacy: false,
  locale: 'pt' as Locale,
  fallbackLocale: 'en' as Locale,
  messages: { pt: {} as never, en: {} as never },
})
