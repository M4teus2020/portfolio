import { ref, onBeforeUnmount } from 'vue'

export function useCountUp(target: number, duration = 800) {
  const count = ref(0)
  let rafId: number | null = null

  function start() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      count.value = target
      return
    }
    if (rafId !== null) cancelAnimationFrame(rafId)
    count.value = 0
    const startTime = performance.now()
    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      count.value = Math.round(eased * target)
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        rafId = null
      }
    }
    rafId = requestAnimationFrame(tick)
  }

  onBeforeUnmount(() => {
    if (rafId !== null) cancelAnimationFrame(rafId)
  })

  return { count, start }
}
