import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Rolagem suave com inércia (Lenis) ligada ao ticker do GSAP, pro ScrollTrigger enxergar cada frame.
export function startScroll() {
  if (lenis || reduced()) return
  lenis = new Lenis({ lerp: 0.1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

// Único ponto de rolagem programática: usa o Lenis quando ligado, senão o nativo.
export function scrollToY(top: number, opts: { immediate?: boolean } = {}) {
  if (lenis) {
    lenis.scrollTo(top, {
      immediate: !!opts.immediate,
      duration: 1.1,
      easing: (x: number) => 1 - Math.pow(1 - x, 4),
    })
    return
  }
  window.scrollTo({ top, behavior: opts.immediate || reduced() ? 'instant' : 'smooth' })
}
