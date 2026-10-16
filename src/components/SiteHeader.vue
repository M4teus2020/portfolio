<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useT, useLocale } from '@/i18n/useT'
import { cases } from '@/data/cases'

const t = useT()
const { locale, toggle } = useLocale()
const route = useRoute()

const links = computed(() => [
  ...(cases.length ? [{ to: { path: '/', hash: '#projetos' }, label: t.value.nav.projects }] : []),
  { to: { path: '/sobre' }, label: t.value.nav.about },
  { to: { path: '/servicos' }, label: t.value.nav.services },
  { to: { path: '/', hash: '#contato' }, label: t.value.nav.contact },
])

const isCurrent = (path: string, hash?: string) => !hash && route.path === path

// Header fixo: publica a altura em --head-h (âncoras descontam ela) e marca a rolagem pra mostrar a linha.
const head = ref<HTMLElement>()
const scrolled = ref(false)
let ro: ResizeObserver | undefined
const onScroll = () => (scrolled.value = window.scrollY > 4)

const publishHeight = () =>
  document.documentElement.style.setProperty('--head-h', `${head.value?.offsetHeight ?? 0}px`)

onMounted(() => {
  publishHeight()
  ro = new ResizeObserver(publishHeight)
  if (head.value) ro.observe(head.value)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header ref="head" class="head" :class="{ scrolled }">
    <div class="wrap head-row">
      <RouterLink to="/" class="mark">Mateus Felini</RouterLink>
      <nav class="nav" aria-label="Principal">
        <RouterLink
          v-for="l in links"
          :key="l.label"
          :to="l.to"
          class="nav-link"
          :aria-current="isCurrent(l.to.path, l.to.hash) ? 'page' : undefined"
        >
          {{ l.label }}
        </RouterLink>
        <button
          type="button"
          class="nav-link lang"
          :aria-label="t.nav.switchLocale"
          :title="t.nav.switchLocale"
          @click="toggle"
        >
          {{ locale === 'pt' ? 'EN' : 'PT' }}
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.head {
  position: sticky;
  /* top 0 + padding no lugar de top: env(): com notch, o recorte fica coberto de papel em vez de vazar conteúdo. */
  top: 0;
  padding-top: env(safe-area-inset-top);
  z-index: 40;
  background: var(--paper);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}
.head.scrolled {
  border-bottom-color: var(--line);
}
.head-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  padding-block: 0.75rem;
}
/* No celular a nav quebra em 2 linhas: menos respiro pra o header fixo não comer a tela. */
@media (max-width: 599px) {
  .head-row {
    row-gap: 0;
    padding-block: 0.25rem;
  }
}
.mark {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: 1.0625rem;
  text-decoration: none;
}
.nav {
  display: flex;
  align-items: center;
  gap: 0.25rem 1.25rem;
  flex-wrap: wrap;
}
.nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font: 500 0.9375rem/1 var(--sans);
  color: var(--muted);
  text-decoration: none;
  padding: 0.5rem 0;
  background: none;
  border: 0;
  cursor: pointer;
}
.nav-link:hover,
.nav-link[aria-current='page'] {
  color: var(--ink);
}
.nav-link[aria-current='page'] {
  text-decoration: underline;
  text-decoration-color: var(--mato);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.4em;
}
.lang {
  font-weight: 700;
  color: var(--ink);
  border: 1.5px solid var(--line);
  border-radius: 4px;
  min-width: 44px;
  justify-content: center;
  padding: 0.375rem 0.5rem;
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
}
.lang:hover {
  border-color: var(--ink);
}
</style>
