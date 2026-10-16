<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useT, useLocale } from '@/i18n/useT'

const t = useT()
useLocale()
</script>

<template>
  <a class="skip" href="#conteudo">{{ t.nav.skip }}</a>
  <SiteHeader />
  <main id="conteudo" tabindex="-1">
    <RouterView />
  </main>
  <SiteFooter />
</template>
