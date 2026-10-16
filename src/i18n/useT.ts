import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { locales, saveLocale } from './index'
import type { Locale } from './index'

export function useT() {
  const { locale } = useI18n()
  return computed(() => locales[locale.value as Locale])
}

export function useLocale() {
  const { locale } = useI18n()
  const current = computed(() => locale.value as Locale)
  watch(
    current,
    (l) => {
      document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en'
    },
    { immediate: true },
  )
  return {
    locale: current,
    toggle: () => {
      const next: Locale = current.value === 'pt' ? 'en' : 'pt'
      locale.value = next
      saveLocale(next)
    },
  }
}
