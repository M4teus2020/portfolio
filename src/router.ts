import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// Desconta o header fixo (SiteHeader publica a altura em --head-h) e um respiro.
export const anchorOffset = () =>
  (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head-h')) || 72) + 24

export const scrollMotion = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'

// O header rola na mão quando o destino é a rota atual; aí a navegação só atualiza a URL.
let skipNextScroll = false
export const skipScroll = () => (skipNextScroll = true)

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/sobre', name: 'about', component: () => import('@/views/AboutView.vue') },
    { path: '/servicos', name: 'services', component: () => import('@/views/ServicesView.vue') },
    // Destino do crédito "Site por Mateus Felini" nos rodapés dos clientes: não mudar.
    { path: '/sites', redirect: { path: '/servicos', hash: '#sites' } },
    {
      path: '/projetos/:slug',
      name: 'case',
      component: () => import('@/views/CaseView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, _from, saved) {
    if (skipNextScroll) {
      skipNextScroll = false
      return false
    }
    // 'instant' explícito: o html tem scroll-behavior: smooth, e 'auto' herdaria a animação.
    if (saved) return { ...saved, behavior: 'instant' }
    if (to.hash) return { el: to.hash, top: anchorOffset(), behavior: scrollMotion() }
    return { top: 0, behavior: 'instant' }
  },
})
