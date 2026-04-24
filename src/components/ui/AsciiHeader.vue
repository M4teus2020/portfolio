<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ text: string }>()

const padded = computed(() => props.text.padEnd(55))
</script>

<template>
  <pre
    class="font-mono text-accent text-[11px] leading-[1.15] m-0 whitespace-pre opacity-85 select-none overflow-x-auto"
  >╭─────────────────────────────────────────────────────────╮
│  {{ padded }}│
╰─────────────────────────────────────────────────────────╯</pre>
</template>
