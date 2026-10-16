<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, type RouteLocationRaw } from 'vue-router'
import { anchorOffset, skipScroll } from '@/router'
import { scrollToY } from '@/motion/scroll'
import { theme, toggleTheme } from '@/motion/theme'
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

// Mesma rota (ex.: em /servicos#sites clicar Serviços, ou Contato duas vezes): o router não rola
// ou pularia seco, então a rolagem suave é feita aqui e a navegação só acerta a URL.
const router = useRouter()
const go = (e: MouseEvent, to: RouteLocationRaw, navigate: (e: MouseEvent) => unknown) => {
  const target = router.resolve(to)
  const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0
  if (modified || target.path !== route.path) return navigate(e)
  e.preventDefault()
  const el = target.hash ? document.querySelector(target.hash) : null
  const top = el ? el.getBoundingClientRect().top + window.scrollY - anchorOffset() : 0
  scrollToY(top)
  if (target.fullPath !== route.fullPath) {
    skipScroll()
    router.replace(target)
  }
}

// Header fixo: publica a altura em --head-h (âncoras descontam ela) e marca a rolagem pra mostrar a linha.
const head = ref<HTMLElement>()
const scrolled = ref(false)
const overDeep = ref(false)
const themeBtn = ref<HTMLButtonElement>()
let ro: ResizeObserver | undefined
let routeTimer: number | undefined

// Na home o header veste o grafite enquanto o herói escuro está atrás dele; a barra mostra o quanto já foi lido.
const onScroll = () => {
  scrolled.value = window.scrollY > 4
  const hero = document.querySelector('[data-hero]')
  overDeep.value = !!hero && hero.getBoundingClientRect().bottom > (head.value?.offsetHeight ?? 0)
  const max = document.documentElement.scrollHeight - window.innerHeight
  document.documentElement.style.setProperty(
    '--progress',
    String(max > 0 ? Math.min(1, window.scrollY / max) : 0),
  )
}
// A página nova entra depois da saída da antiga: reavalia quando ela já estiver no lugar.
watch(
  () => route.path,
  () => {
    clearTimeout(routeTimer)
    routeTimer = window.setTimeout(onScroll, 450)
  },
)

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
  <header ref="head" class="head" :class="{ scrolled, deep: overDeep }">
    <div class="wrap head-row">
      <RouterLink v-slot="{ href, navigate }" to="/" custom>
        <a :href="href" class="mark" @click="go($event, '/', navigate)">Mateus Felini</a>
      </RouterLink>
      <nav class="nav" aria-label="Principal">
        <RouterLink v-for="l in links" :key="l.label" v-slot="{ href, navigate }" :to="l.to" custom>
          <a
            :href="href"
            class="nav-link"
            :aria-current="isCurrent(l.to.path, l.to.hash) ? 'page' : undefined"
            @click="go($event, l.to, navigate)"
          >
            {{ l.label }}
          </a>
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
        <button
          ref="themeBtn"
          type="button"
          class="nav-link lang theme"
          :aria-label="t.nav.switchTheme"
          :title="t.nav.switchTheme"
          :aria-pressed="theme === 'dark'"
          @click="toggleTheme(themeBtn)"
        >
          <svg class="ico" viewBox="0 0 24 24" aria-hidden="true">
            <g class="sun">
              <circle cx="12" cy="12" r="4.2" />
              <path
                d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"
              />
            </g>
            <path class="moon" d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z" />
          </svg>
        </button>
      </nav>
    </div>
    <span class="progress" aria-hidden="true"></span>
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
  transition:
    border-color 0.2s ease,
    background-color 0.35s ease,
    color 0.35s ease;
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
.theme {
  padding: 0;
}
.ico {
  width: 1.25rem;
  height: 1.25rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
/* Sol e lua trocam girando; o estado vem de aria-pressed. */
.sun,
.moon {
  transform-box: fill-box;
  transform-origin: center;
  transition:
    transform 0.5s var(--ease),
    opacity 0.3s;
}
.theme[aria-pressed='false'] .moon {
  transform: rotate(-60deg) scale(0.4);
  opacity: 0;
}
.theme[aria-pressed='true'] .sun {
  transform: rotate(90deg) scale(0.4);
  opacity: 0;
}
</style>
