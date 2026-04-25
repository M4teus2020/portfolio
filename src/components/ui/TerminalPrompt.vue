<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useIntersect } from '@/composables/useIntersect'

const props = defineProps<{
  cmd: string
  path?: string
  lazy?: boolean
}>()

const shown = ref(0)
const root = ref<Element | null>(null)
let timerId: ReturnType<typeof setTimeout> | null = null

function typeNext() {
  if (shown.value >= props.cmd.length) return
  timerId = setTimeout(() => {
    shown.value++
    typeNext()
  }, 22)
}

function startTyping() {
  shown.value = 0
  if (timerId) clearTimeout(timerId)
  typeNext()
}

if (!props.lazy) {
  watch(
    () => props.cmd,
    () => startTyping(),
    { immediate: true },
  )
} else {
  useIntersect(root, startTyping)
}

onBeforeUnmount(() => {
  if (timerId) clearTimeout(timerId)
})
</script>

<template>
  <div ref="root" class="font-mono text-[13px] text-fg leading-relaxed">
    <span class="text-accent">mateus@felini</span><span class="text-dim">:</span><span
      class="text-t-blue"
    >{{ path ?? '~/portfolio' }}</span><span class="text-dim">$ </span><span>{{ cmd.slice(0, shown) }}</span><span
      class="animate-[blink_1s_steps(1)_infinite]"
      :class="{ 'opacity-0': shown >= cmd.length }"
    >▊</span>
  </div>
</template>
