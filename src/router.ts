import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

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
    if (saved) return saved
    // Desconta o header fixo (SiteHeader publica a altura em --head-h).
    const head =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head-h')) || 72
    if (to.hash) return { el: to.hash, top: head + 24 }
    return { top: 0 }
  },
})
