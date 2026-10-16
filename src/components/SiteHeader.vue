<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter, type RouteLocationRaw } from 'vue-router'
import { anchorOffset, skipScroll } from '@/router'
import { lockScroll, scrollToY } from '@/motion/scroll'
import { theme, toggleTheme } from '@/motion/theme'
import { useT, useLocale } from '@/i18n/useT'
import { cases } from '@/data/cases'
import LogoMark from '@/components/LogoMark.vue'

const t = useT()
const { locale, toggle } = useLocale()
const route = useRoute()
const router = useRouter()

const links = computed(() => [
  ...(cases.length ? [{ to: { path: '/', hash: '#projetos' }, label: t.value.nav.projects }] : []),
  { to: { path: '/sobre' }, label: t.value.nav.about },
  { to: { path: '/servicos' }, label: t.value.nav.services },
  { to: { path: '/', hash: '#contato' }, label: t.value.nav.contact },
])

const isCurrent = (path: string, hash?: string) => !hash && route.path === path

// Mesma rota (ex.: em /servicos#sites clicar Serviços, ou Contato duas vezes): o router não rola
// ou pularia seco, então a rolagem suave é feita aqui e a navegação só acerta a URL.
const go = (e: MouseEvent, to: RouteLocationRaw, navigate: (e: MouseEvent) => unknown) => {
  closeMenu()
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

// Ilha flutuante: publica a altura em --head-h (âncoras descontam ela) e encolhe ao rolar.
const head = ref<HTMLElement>()
const island = ref<HTMLElement>()
const scrolled = ref(false)
const themeBtn = ref<HTMLButtonElement>()
let ro: ResizeObserver | undefined

const onScroll = () => {
  scrolled.value = window.scrollY > 80
  const max = document.documentElement.scrollHeight - window.innerHeight
  document.documentElement.style.setProperty(
    '--progress',
    String(max > 0 ? Math.min(1, window.scrollY / max) : 0),
  )
}
const publishHeight = () => {
  const h = island.value ? island.value.offsetHeight + island.value.offsetTop : 0
  document.documentElement.style.setProperty('--head-h', `${h}px`)
}

// Pílula deslizante que segue o mouse (ou fica na página atual).
const navEl = ref<HTMLElement>()
const linkEls = ref<HTMLElement[]>([])
const hover = ref<number | null>(null)
const ind = reactive({ x: 0, w: 0, on: false })
const active = computed(() => links.value.findIndex((l) => isCurrent(l.to.path, l.to.hash)))
const measure = () => {
  const i = hover.value ?? active.value
  const el = linkEls.value[i]
  if (!el) return void (ind.on = false)
  ind.x = el.offsetLeft
  ind.w = el.offsetWidth
  ind.on = true
}
watch([hover, active, locale], () => nextTick(measure))

// Menu em tela cheia no celular.
const open = ref(false)
const closeMenu = () => {
  if (!open.value) return
  open.value = false
  lockScroll(false)
}
const toggleMenu = () => {
  open.value = !open.value
  lockScroll(open.value)
}
const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu()
watch(
  () => route.fullPath,
  () => closeMenu(),
)

const roles = ['Laravel', 'Vue', 'full-stack']

onMounted(() => {
  publishHeight()
  ro = new ResizeObserver(() => {
    publishHeight()
    measure()
  })
  if (island.value) ro.observe(island.value)
  onScroll()
  measure()
  document.fonts?.ready.then(measure)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  lockScroll(false)
})
</script>

<template>
  <header ref="head" class="head">
    <div ref="island" class="island deep" :class="{ compact: scrolled }">
      <RouterLink v-slot="{ href, navigate }" to="/" custom>
        <a :href="href" class="brand" aria-label="Mateus Felini" @click="go($event, '/', navigate)">
          <LogoMark />
          <span class="brand-text">
            <span class="brand-name">Mateus Felini</span>
            <span class="brand-role">
              <span class="roll">
                <span v-for="r in [...roles, roles[0]]" :key="r">{{ r }}</span>
              </span>
            </span>
          </span>
        </a>
      </RouterLink>

      <nav ref="navEl" class="nav" aria-label="Principal" @mouseleave="hover = null">
        <span
          class="pill"
          :class="{ on: ind.on }"
          :style="{ transform: `translateX(${ind.x}px)`, width: `${ind.w}px` }"
        ></span>
        <RouterLink
          v-for="(l, i) in links"
          :key="l.label"
          v-slot="{ href, navigate }"
          :to="l.to"
          custom
        >
          <a
            :ref="(el) => (linkEls[i] = el as HTMLElement)"
            :href="href"
            class="nav-link"
            :aria-current="isCurrent(l.to.path, l.to.hash) ? 'page' : undefined"
            @mouseenter="hover = i"
            @focus="hover = i"
            @blur="hover = null"
            @click="go($event, l.to, navigate)"
          >
            {{ l.label }}
          </a>
        </RouterLink>
      </nav>

      <div class="tools">
        <button
          type="button"
          class="tool lang"
          :aria-label="t.nav.switchLocale"
          :title="t.nav.switchLocale"
          @click="toggle"
        >
          {{ locale === 'pt' ? 'EN' : 'PT' }}
        </button>
        <button
          ref="themeBtn"
          type="button"
          class="tool theme"
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
        <button
          type="button"
          class="tool burger"
          :class="{ open }"
          :aria-label="open ? t.nav.close : t.nav.menu"
          :aria-expanded="open"
          aria-controls="sheet"
          @click="toggleMenu"
        >
          <span></span><span></span>
        </button>
      </div>
      <span class="progress" aria-hidden="true"></span>
    </div>

    <div id="sheet" class="sheet deep" :class="{ open }" :inert="!open">
      <nav class="sheet-nav" aria-label="Menu">
        <RouterLink
          v-for="(l, i) in links"
          :key="l.label"
          v-slot="{ href, navigate }"
          :to="l.to"
          custom
        >
          <a
            :href="href"
            class="sheet-link"
            :style="{ transitionDelay: open ? `${0.12 + i * 0.07}s` : '0s' }"
            @click="go($event, l.to, navigate)"
          >
            <small>0{{ i + 1 }}</small
            >{{ l.label }}
          </a>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.head {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 40;
  display: flex;
  justify-content: center;
  padding: calc(env(safe-area-inset-top) + 0.75rem) 0.75rem 0;
  pointer-events: none;
}
.island {
  position: relative;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: min(100%, 64rem);
  padding: 0.375rem 0.5rem 0.375rem 0.4rem;
  border: 1px solid color-mix(in srgb, white 10%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--deep) 90%, transparent);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  backdrop-filter: blur(18px) saturate(1.4);
  box-shadow:
    0 14px 40px -14px rgb(0 0 0 / 0.55),
    inset 0 1px 0 color-mix(in srgb, white 8%, transparent);
  transition:
    width 0.6s var(--ease),
    padding 0.4s var(--ease);
  z-index: 2;
}
.island.compact {
  width: min(100%, 44rem);
}

/* Marca */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  min-height: 44px;
  text-decoration: none;
  color: var(--on-deep);
}
.brand-text {
  display: grid;
  line-height: 1.1;
}
.brand-name {
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: -0.02em;
}
.brand-role {
  display: block;
  height: 1.3em;
  overflow: hidden;
  font: 500 0.6875rem/1.3 var(--mono);
  color: var(--deep-accent);
  letter-spacing: 0.03em;
  max-height: 1.3em;
  transition:
    max-height 0.4s var(--ease),
    opacity 0.3s;
  margin-top: 0.2rem;
}
.island.compact .brand-role {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
}
.roll {
  display: grid;
  animation: roll 9s var(--ease) infinite;
}
.roll span {
  height: 1.3em;
  line-height: 1.3;
}
@keyframes roll {
  0%,
  28% {
    transform: translateY(0);
  }
  33%,
  61% {
    transform: translateY(-1.3em);
  }
  66%,
  94% {
    transform: translateY(-2.6em);
  }
  100% {
    transform: translateY(-3.9em);
  }
}

/* Navegação com pílula deslizante */
.nav {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.125rem;
  margin-left: auto;
}
.pill {
  position: absolute;
  left: 0;
  top: 50%;
  height: 2.25rem;
  margin-top: -1.125rem;
  border-radius: 999px;
  background: color-mix(in srgb, white 10%, transparent);
  opacity: 0;
  transition:
    transform 0.45s var(--ease),
    width 0.45s var(--ease),
    opacity 0.25s;
  pointer-events: none;
}
.pill.on {
  opacity: 1;
}
.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 0.875rem;
  font: 500 0.9375rem/1 var(--sans);
  color: var(--deep-muted);
  text-decoration: none;
  border-radius: 999px;
  transition: color 0.2s;
}
.nav-link:hover,
.nav-link:focus-visible,
.nav-link[aria-current='page'] {
  color: var(--on-deep);
}
.nav-link[aria-current='page']::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0.4rem;
  width: 4px;
  height: 4px;
  margin-left: -2px;
  border-radius: 50%;
  background: var(--deep-accent);
}

/* Ferramentas */
.tools {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}
.tool {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid color-mix(in srgb, white 12%, transparent);
  border-radius: 50%;
  background: transparent;
  color: var(--on-deep);
  font: 700 0.75rem/1 var(--mono);
  letter-spacing: 0.04em;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    transform 0.3s var(--ease);
}
.tool:hover {
  background: color-mix(in srgb, white 10%, transparent);
  border-color: var(--deep-accent);
}
.tool:active {
  transform: scale(0.92);
}
.ico {
  width: 1.125rem;
  height: 1.125rem;
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

.burger {
  display: none;
  flex-direction: column;
  gap: 0.3125rem;
}
.burger span {
  display: block;
  width: 1rem;
  height: 1.5px;
  background: currentColor;
  transition: transform 0.4s var(--ease);
}
.burger.open span:first-child {
  transform: translateY(3.4px) rotate(45deg);
}
.burger.open span:last-child {
  transform: translateY(-3.4px) rotate(-45deg);
}

/* Barra de leitura sob a ilha */
.progress {
  position: absolute;
  left: 1.5rem;
  right: 1.5rem;
  bottom: -7px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--deep-accent), #d9f0e3);
  transform: scaleX(var(--progress, 0));
  transform-origin: left;
  pointer-events: none;
}

/* Menu cheio (celular) */
.sheet {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: grid;
  align-content: center;
  padding: 6rem var(--gutter) 3rem;
  pointer-events: none;
  clip-path: circle(0 at calc(100% - 2rem) 2.25rem);
  transition: clip-path 0.7s var(--ease);
  background:
    radial-gradient(40rem circle at 90% 0, rgb(22 118 83 / 0.35), transparent 60%), var(--deep);
}
.sheet.open {
  pointer-events: auto;
  clip-path: circle(150% at calc(100% - 2rem) 2.25rem);
}
.sheet-nav {
  display: grid;
  gap: 0.25rem;
}
.sheet-link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.5rem 0;
  font-size: clamp(2.25rem, 11vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  text-decoration: none;
  color: var(--on-deep);
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.5s var(--ease),
    transform 0.6s var(--ease);
}
.sheet-link small {
  font: 500 0.75rem/1 var(--mono);
  color: var(--deep-accent);
}
.sheet.open .sheet-link {
  opacity: 1;
  transform: none;
}

@media (max-width: 759px) {
  .nav {
    display: none;
  }
  .burger {
    display: inline-flex;
  }
  .brand-role {
    display: none;
  }
  .island,
  .island.compact {
    width: 100%;
  }
}
@media (min-width: 760px) {
  .sheet {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .roll {
    animation: none;
  }
}
</style>
