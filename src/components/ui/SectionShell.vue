<script setup lang="ts">
import TerminalPrompt from './TerminalPrompt.vue'

defineProps<{
  id?: string
  cmd: string
  lazy?: boolean
  blink?: boolean
}>()
</script>

<template>
  <section :id="id" class="va-section px-9 py-10 border-t border-dashed border-line">
    <TerminalPrompt :cmd="cmd" :lazy="lazy" :blink="blink" />
    <div class="mt-[18px]">
      <slot />
    </div>
  </section>
</template>
