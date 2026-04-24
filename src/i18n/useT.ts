import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { locales } from './index'
import type { Locale } from './index'

export function useT() {
  const { locale } = useI18n()
  return computed(() => locales[locale.value as Locale])
}

export function useLocale() {
  const { locale } = useI18n()
  return {
    locale,
    toggle: () => {
      locale.value = locale.value === 'pt' ? 'en' : 'pt'
    },
  }
}
