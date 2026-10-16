import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { scrollToY } from '@/motion/scroll'

// Desconta o header fixo (SiteHeader publica a altura em --head-h) e um respiro.
export const anchorOffset = () =>
  (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head-h')) || 72) + 24

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
  scrollBehavior(to, from, saved) {
    if (skipNextScroll) {
      skipNextScroll = false
      return false
    }
    // Troca de rota: a página nova só existe depois da saída da antiga (App.vue avisa); rola então.
    const arrive = (): Promise<void> =>
      to.path === from.path
        ? Promise.resolve()
        : new Promise((resolve) => {
            const done = () => resolve()
            window.addEventListener('page:entering', done, { once: true })
            setTimeout(done, 700)
          })
    return arrive().then(() => {
      if (saved) return void scrollToY(saved.top ?? 0, { immediate: true })
      if (to.hash) {
        const el = document.querySelector(to.hash)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - anchorOffset()
          // Vindo de outra rota o salto é seco (a página já entra animada); na mesma, desliza.
          return void scrollToY(top, { immediate: to.path !== from.path })
        }
      }
      return void scrollToY(0, { immediate: true })
    })
  },
})
