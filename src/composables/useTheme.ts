import { ref, watch } from 'vue'
import { AVAILABILITY } from '@/config/availability'
import type { Accent, Theme } from '@/config/availability'

function getSaved<T extends string>(key: string, fallback: T): T {
  try {
    return (localStorage.getItem(key) as T) || fallback
  } catch {
    return fallback
  }
}

const theme = ref<Theme>(getSaved('va-theme', AVAILABILITY.defaultTheme))
const accent = ref<Accent>(getSaved('va-accent', AVAILABILITY.accent))

function applyToDOM(t: Theme, a: Accent) {
  const root = document.documentElement
  if (t === 'light') root.setAttribute('data-theme', 'light')
  else root.removeAttribute('data-theme')
  root.setAttribute('data-accent', a)
}

applyToDOM(theme.value, accent.value)

watch([theme, accent], ([t, a]) => {
  applyToDOM(t, a)
  try {
    localStorage.setItem('va-theme', t)
    localStorage.setItem('va-accent', a)
  } catch {}
})

export function useTheme() {
  return {
    theme,
    accent,
    toggleTheme: () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    },
    setAccent: (a: Accent) => {
      accent.value = a
    },
  }
}
