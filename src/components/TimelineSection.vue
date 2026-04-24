<script setup lang="ts">
import { useT } from '@/i18n/useT'
import SectionShell from './ui/SectionShell.vue'
import AsciiHeader from './ui/AsciiHeader.vue'

const t = useT()
</script>

<template>
  <SectionShell id="timeline" cmd="git log --oneline --graph career">
    <AsciiHeader :text="`# ${t.timeline.kicker.toUpperCase()}`" />
    <h2 class="text-[22px] mt-[18px] mb-[18px] text-fg font-semibold">{{ t.timeline.title }}</h2>

    <div class="pl-5 ml-1.5" style="border-left: 1px dashed var(--line);">
      <div
        v-for="(item, i) in t.timeline.items"
        :key="i"
        class="relative mb-7"
      >
        <span
          class="absolute text-accent text-[14px]"
          style="left: -27px; top: 5px;"
        >●</span>

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
