import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/sobre', name: 'about', component: () => import('@/views/AboutView.vue') },
    { path: '/sites', name: 'sites', component: () => import('@/views/SitesView.vue') },
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
    if (to.hash) return { el: to.hash, top: 24 }
    return { top: 0 }
  },
})
