<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useT, useLocale } from '@/i18n/useT'
import { startScroll } from '@/motion/scroll'
import { initMotion } from '@/motion/init'

const t = useT()
useLocale()

// O movimento de cada página nasce quando o <div class="page"> entra no <main> e morre quando sai.
// Observar o DOM (em vez dos hooks do <Transition>) cobre também a primeira carga.
const undos = new Map<Element, () => void>()
let mo: MutationObserver | undefined

let mainEl: HTMLElement | null = null
// Páginas com herói escuro começam sob a ilha do header; as demais ganham padding no topo.
const syncHero = () =>
  document.documentElement.classList.toggle('has-hero', !!mainEl?.querySelector('[data-hero]'))

const enter = (el: Element, tries = 0) => {
  if (undos.has(el) || !el.isConnected) return
  // Div ainda vazio (o Vue monta o conteúdo logo depois): tenta de novo no próximo frame.
  if (!el.firstElementChild && tries < 30)
    return void requestAnimationFrame(() => enter(el, tries + 1))
  // O router espera este evento pra rolar (âncora ou topo) só quando a página nova já existe.
  window.dispatchEvent(new Event('page:entering'))
  undos.set(el, initMotion(el as HTMLElement))
  syncHero()
  requestAnimationFrame(() => ScrollTrigger.refresh())
}
const leave = (el: Element) => {
  undos.get(el)?.()
  undos.delete(el)
  syncHero()
}

onMounted(() => {
  startScroll()
  const m = document.getElementById('conteudo')
  if (!m) return
  mainEl = m
  m.querySelectorAll('.page').forEach((el) => enter(el))
  mo = new MutationObserver((records) =>
    records.forEach((r) => {
      r.removedNodes.forEach(
        (n) => n instanceof Element && n.classList.contains('page') && leave(n),
      )
      r.addedNodes.forEach((n) => n instanceof Element && n.classList.contains('page') && enter(n))
    }),
  )
  mo.observe(m, { childList: true })
})
onBeforeUnmount(() => mo?.disconnect())
</script>

<template>
  <a class="skip" href="#conteudo">{{ t.nav.skip }}</a>
  <SiteHeader />
  <main id="conteudo" tabindex="-1">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in" appear>
        <div :key="route.path" class="page">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>
