<script setup lang="ts">
import { ref } from 'vue'
import { useT } from '@/i18n/useT'
import { useIntersect } from '@/composables/useIntersect'
import SectionShell from './ui/SectionShell.vue'
import AsciiHeader from './ui/AsciiHeader.vue'

const t = useT()

const sectionEl = ref<Element | null>(null)
const revealed = ref(false)

useIntersect(sectionEl, () => { revealed.value = true })
</script>

<template>
  <SectionShell id="stack" cmd="which laravel vue node docker claude" lazy>
    <div ref="sectionEl">
      <AsciiHeader :text="`# ${t.stack.kicker.toUpperCase()}`" />
      <h2 class="text-[22px] mt-[18px] mb-[18px] text-fg font-semibold">{{ t.stack.title }}</h2>

      <div class="grid gap-3.5">
        <div v-for="group in t.stack.groups" :key="group.h">
          <div class="text-t-amber text-[11px] uppercase tracking-[0.1em] mb-1.5">
            ./{{ group.h.toLowerCase().replace(/[\s/]+/g, '-') }}/
          </div>
          <div>
            <span
              v-for="(item, i) in group.items"
              :key="item"
              class="va-chip"
              :style="{
                opacity: revealed ? '1' : '0',
                transition: 'opacity 0.3s ease',
                transitionDelay: revealed ? `${i * 60}ms` : '0ms',
              }"
            >{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </SectionShell>
</template>
