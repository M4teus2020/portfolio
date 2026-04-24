import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useIntersect(el: Ref<Element | null>, onEnter: () => void) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!el.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          onEnter()
          observer?.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el.value)
  })

  onBeforeUnmount(() => observer?.disconnect())
}
