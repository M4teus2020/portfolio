<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Moldura em janela de terminal. Só anima enquanto está visível (pausa fora da tela).
defineProps<{ title: string }>()

const el = ref<HTMLElement>()
const on = ref(false)
let io: IntersectionObserver | undefined

onMounted(() => {
  io = new IntersectionObserver(([e]) => (on.value = !!e?.isIntersecting), { threshold: 0.2 })
  if (el.value) io.observe(el.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <figure ref="el" class="frame deep" :class="{ on }" aria-hidden="true">
    <div class="bar">
      <i></i><i></i><i></i>
      <span>{{ title }}</span>
    </div>
    <slot />
  </figure>
</template>

<style scoped>
.frame {
  --play: paused;
  margin: 0;
  border: 1px solid var(--deep-line);
  border-radius: 14px;
  overflow: hidden;
  background:
    radial-gradient(28rem circle at 85% 0%, rgb(22 118 83 / 0.22), transparent 60%), var(--deep);
  box-shadow: 0 24px 48px -28px rgb(0 0 0 / 0.55);
}
.frame.on {
  --play: running;
}
.bar {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 0.875rem;
  border-bottom: 1px solid var(--deep-line);
  font: 500 0.6875rem/1 var(--mono);
  color: var(--deep-muted);
}
.bar i {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--deep-line);
}
.bar i:first-child {
  background: var(--deep-accent);
}
.bar span {
  margin-left: 0.5rem;
  letter-spacing: 0.04em;
}
</style>
