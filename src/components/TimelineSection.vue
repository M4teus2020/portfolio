<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { useT } from '@/i18n/useT'
import SectionShell from './ui/SectionShell.vue'
import AsciiHeader from './ui/AsciiHeader.vue'

const t = useT()

function shortHash(index: number): string {
  const h = (((index + 1) * 0x2f6b4e3d) ^ 0xa1b2c3d4) >>> 0
  return h.toString(16).slice(0, 7)
}

const itemVisible = ref<boolean[]>([])
const observers = new Map<number, IntersectionObserver>()

function observeItem(el: Element | null, index: number) {
  if (!el) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting) {
        itemVisible.value[index] = true
        observer.disconnect()
        observers.delete(index)
      }
    },
    { threshold: 0.2 },
  )
  observers.set(index, observer)
  observer.observe(el)
}

function setItemRef(el: Element | null, index: number) {
  if (!el) {
    observers.get(index)?.disconnect()
    observers.delete(index)
    return
  }
  observeItem(el, index)
}

onBeforeUnmount(() => {
  observers.forEach(obs => obs.disconnect())
  observers.clear()
})
</script>

<template>
  <SectionShell id="timeline" cmd="git log --oneline --graph career" lazy>
    <AsciiHeader :text="`# ${t.timeline.kicker.toUpperCase()}`" />
    <h2 class="text-[22px] mt-[18px] mb-[18px] text-fg font-semibold">{{ t.timeline.title }}</h2>

    <div class="pl-5 ml-1.5" style="border-left: 1px dashed var(--line);">
      <div
        v-for="(item, i) in t.timeline.items"
        :key="i"
        :ref="(el) => setItemRef(el as Element | null, i)"
        class="relative mb-7"
        :style="{
          opacity: itemVisible[i] ? '1' : '0',
          transform: itemVisible[i] ? 'none' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          transitionDelay: `${i * 80}ms`,
        }"
      >
        <span
          class="absolute text-accent text-[14px]"
          style="left: -24.5px; top: 5px;"
        >●</span>

        <!-- git log header -->
        <div class="text-[11px] mb-1 font-mono">
          <span class="text-t-amber">{{ shortHash(i) }}</span>
          <span class="text-dim"> feat: </span>
          <span class="text-t-blue">{{ item.role.toLowerCase() }} @ {{ item.company }}</span>
        </div>

        <div class="text-dim text-[11px] uppercase tracking-[0.08em]">{{ item.year }}</div>
        <div class="text-fg text-[14px] font-semibold mt-1 mb-0.5">
          {{ item.role }}
          <span class="text-accent font-normal"> @ {{ item.company }}</span>
        </div>
        <div class="text-dim text-[11px] mb-2">{{ item.location }}</div>
        <ul class="m-0 pl-3.5 text-dim2 text-[12px] leading-[1.7]">
          <li v-for="(bullet, j) in item.bullets" :key="j">{{ bullet }}</li>
        </ul>
      </div>
    </div>
  </SectionShell>
</template>
