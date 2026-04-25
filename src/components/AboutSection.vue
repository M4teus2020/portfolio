<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '@/i18n/useT'
import { AVAILABILITY } from '@/config/availability'
import SectionShell from './ui/SectionShell.vue'
import AsciiHeader from './ui/AsciiHeader.vue'

const t = useT()

const nowItems = computed(() =>
  AVAILABILITY.available
    ? [...t.value.about.nowItemsBase, t.value.about.nowItemLooking]
    : t.value.about.nowItemsBase,
)
</script>

<template>
  <SectionShell id="about" cmd="cat about.md" lazy>
    <AsciiHeader :text="`# ${t.about.kicker.toUpperCase()}`" />
    <h2 class="text-[22px] mt-[18px] mb-2.5 text-fg font-semibold leading-snug">
      {{ t.about.title }}
    </h2>
    <p class="text-fg leading-relaxed text-[13px] max-w-[540px] mb-6">{{ t.about.body }}</p>

    <!-- Facts grid -->
    <div class="grid grid-cols-2 gap-2.5 mb-6">
      <div
        v-for="([k, v]) in t.about.facts"
        :key="k"
        class="border border-line px-3 py-2.5"
      >
        <div class="text-dim text-[10px] uppercase tracking-[0.1em]">{{ k }}</div>
        <div class="text-fg text-[13px] mt-[3px]">{{ v }}</div>
      </div>
    </div>

    <!-- Right now -->
    <div class="text-t-amber text-[12px] mb-2"># {{ t.about.now }}</div>
    <ul class="pl-4 m-0 text-fg text-[13px] leading-[1.8]">
      <li v-for="item in nowItems" :key="item">{{ item }}</li>
    </ul>
  </SectionShell>
</template>
