<script setup lang="ts">
import { useT } from '@/i18n/useT'
import { useMeta } from '@/composables/useMeta'

const t = useT()
useMeta(() => ({ title: t.value.meta.notFoundTitle }))
</script>

<template>
  <section class="wrap nf">
    <h1 class="nf-title">{{ t.notFound.title }}</h1>
    <p class="nf-text">{{ t.notFound.text }}</p>
    <RouterLink to="/" class="btn btn-solid">{{ t.notFound.cta }}</RouterLink>
  </section>
</template>

<style scoped>
.nf {
  padding-block: clamp(4rem, 12vw, 9rem);
  min-height: 60svh;
}
.nf-title {
  margin: 0;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 0.95;
  max-width: 14ch;
}
.nf-text {
  margin: 1.25rem 0 2rem;
  color: var(--muted);
  max-width: 44ch;
}
</style>
