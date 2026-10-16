import { watchEffect } from 'vue'

// Título e descrição da página, reativos ao idioma.
export function useMeta(get: () => { title: string; description?: string }) {
  watchEffect(() => {
    const { title, description } = get()
    document.title = title
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  })
}
