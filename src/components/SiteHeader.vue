<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useT, useLocale } from '@/i18n/useT'
import { cases } from '@/data/cases'

const t = useT()
const { locale, toggle } = useLocale()
const route = useRoute()

const links = computed(() => [
  ...(cases.length ? [{ to: { path: '/', hash: '#projetos' }, label: t.value.nav.projects }] : []),
  { to: { path: '/sobre' }, label: t.value.nav.about },
  { to: { path: '/sites' }, label: t.value.nav.sites },
  { to: { path: '/', hash: '#contato' }, label: t.value.nav.contact },
])

const isCurrent = (path: string, hash?: string) => !hash && route.path === path
</script>

<template>
  <header class="head">
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
  position: relative;
  z-index: 5;
}
.head-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  padding-block: 1.25rem;
}
.mark {
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
  padding: 0.375rem 0.5rem;
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
}
.lang:hover {
  border-color: var(--ink);
}
</style>
