<script setup lang="ts">
import { onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useT, useLocale } from '@/i18n/useT'
import { startScroll } from '@/motion/scroll'
import { initMotion } from '@/motion/init'

const t = useT()
useLocale()

let undo: (() => void) | undefined

onMounted(startScroll)

// A página nova só ganha movimento depois de montada; a antiga desfaz o dela ao sair.
const onBeforeLeave = () => {
  undo?.()
  undo = undefined
}
// O router espera este evento pra rolar (âncora ou topo) só quando a página nova já existe.
const onBeforeEnter = () => window.dispatchEvent(new Event('page:entering'))
const onEnter = (el: Element) => {
  undo = initMotion(el as HTMLElement)
  requestAnimationFrame(() => ScrollTrigger.refresh())
}
</script>

<template>
  <a class="skip" href="#conteudo">{{ t.nav.skip }}</a>
  <SiteHeader />
  <main id="conteudo" tabindex="-1">
    <RouterView v-slot="{ Component, route }">
      <Transition
        name="page"
        mode="out-in"
        @before-leave="onBeforeLeave"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
      >
        <div :key="route.path" class="page">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>
