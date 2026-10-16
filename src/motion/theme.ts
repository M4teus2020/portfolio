import { ref } from 'vue'

export type Theme = 'light' | 'dark'
const KEY = 'felini-theme'
const COLORS: Record<Theme, string> = { light: '#F5F6F2', dark: '#101713' }

// O index.html já aplicou o tema salvo antes de pintar; aqui só espelhamos o estado.
export const theme = ref<Theme>(
  typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark'
    ? 'dark'
    : 'light',
)

function apply(next: Theme) {
  theme.value = next
  document.documentElement.dataset.theme = next
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[next])
  try {
    localStorage.setItem(KEY, next)
  } catch {
    // sem storage: vale só nesta visita
  }
}

// Círculo que cresce a partir do botão (View Transitions API); sem suporte ou com reduced-motion, troca seco.
export function toggleTheme(origin?: HTMLElement) {
  const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduce) return apply(next)

  const r = origin?.getBoundingClientRect()
  const x = r ? r.left + r.width / 2 : window.innerWidth / 2
  const y = r ? r.top + r.height / 2 : 0
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  const vt = document.startViewTransition(() => apply(next))
  vt.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      {
        duration: 650,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  })
}
