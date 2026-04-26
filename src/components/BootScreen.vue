<!-- src/components/BootScreen.vue -->
<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useBootScreen } from '@/composables/useBootScreen'

const { visible, init, finish, hide } = useBootScreen()

type Line = { text: string; delay: number; class?: string }

const LINES: Line[] = [
  { text: '$ npm run dev', delay: 0, class: 'text-fg' },
  { text: '', delay: 300 },
  { text: '  VITE v5.4.19  ready in 247ms', delay: 600, class: 'text-dim' },
  { text: '', delay: 900 },
  { text: '  ➜  Local:   http://localhost:5173/', delay: 1100, class: 'text-dim' },
  { text: '  ➜  Network: use --host to expose', delay: 1350, class: 'text-dim' },
  { text: '', delay: 1600 },
  { text: 'Initializing mateus.felini()...', delay: 1900, class: 'text-fg' },
  { text: '⚡ Portfolio ready. Welcome.', delay: 2700, class: 'text-accent' },
]

const shown = ref<number[]>([])
const showHint = ref(false)
const closing = ref(false)
const skippable = ref(false)

let timers: ReturnType<typeof setTimeout>[] = []

function skip() {
  if (!skippable.value) return
  timers.forEach(clearTimeout)
  timers = []
  shown.value = LINES.map((_, i) => i)
  finish()
  closing.value = true
  const hideTimer = setTimeout(() => hide(), 400)
  timers.push(hideTimer)
}

function startSequence() {
  shown.value = []
  closing.value = false
  skippable.value = false
  showHint.value = false

  LINES.forEach((line, i) => {
    const t = setTimeout(() => { shown.value.push(i) }, line.delay)
    timers.push(t)
  })

  const lastDelay = LINES[LINES.length - 1]!.delay
  const hintTimer = setTimeout(() => {
    showHint.value = true
    skippable.value = true
  }, 1000)
  timers.push(hintTimer)

  const doneTimer = setTimeout(() => {
    finish()
    const closeTimer = setTimeout(() => {
      closing.value = true
      const hideTimer = setTimeout(() => hide(), 400)
      timers.push(hideTimer)
    }, 600)
    timers.push(closeTimer)
  }, lastDelay + 800)
  timers.push(doneTimer)
}

function onKey() { skip() }

onMounted(() => {
  init()
  if (visible.value) {
    startSequence()
    window.addEventListener('keydown', onKey)
  }
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  window.removeEventListener('keydown', onKey)
})

watch(visible, (val) => {
  if (val) {
    window.removeEventListener('keydown', onKey)
    window.addEventListener('keydown', onKey)
    startSequence()
  } else {
    window.removeEventListener('keydown', onKey)
  }
})
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 bg-bg flex items-start justify-start p-10 sm:p-16"
    :class="{ 'pointer-events-none': closing }"
    :style="closing ? 'opacity:0;transition:opacity 0.4s ease' : ''"
    @click="skip"
  >
      <div class="font-mono text-[13px] leading-[1.8] max-w-[520px] w-full">
        <div
          v-for="(line, i) in LINES"
          :key="i"
          :class="[line.class ?? 'text-dim', shown.includes(i) ? 'opacity-100' : 'opacity-0']"
          style="transition: opacity 0.15s ease; min-height: 1.8em"
        >
          <span
            v-if="line.text.includes('http://localhost')"
          >
            <span class="text-dim">{{ line.text.split('http://')[0] }}</span><span class="text-accent">http://{{ line.text.split('http://')[1] }}</span>
          </span>
          <span v-else>{{ line.text }}</span>
        </div>

        <div
          v-if="showHint"
          class="mt-6 text-dim text-[11px] tracking-widest uppercase animate-[blink_1s_steps(1)_infinite]"
        >
          [ pressione qualquer tecla ou clique para pular ]
        </div>
      </div>
  </div>
</template>
