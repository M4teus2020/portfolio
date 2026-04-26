<script setup lang="ts">
import { useT } from '@/i18n/useT'
import SectionShell from './ui/SectionShell.vue'
import AsciiHeader from './ui/AsciiHeader.vue'

const t = useT()
</script>

<template>
  <SectionShell id="ai" cmd="./agent --pair-program" lazy>
    <AsciiHeader :text="`# ${t.ai.kicker.toUpperCase()}`" />
    <h2 class="text-[22px] mt-[18px] mb-2 text-fg font-semibold leading-snug">{{ t.ai.title }}</h2>
    <p class="text-dim2 text-[13px] leading-relaxed mb-[18px] max-w-[540px]">{{ t.ai.sub }}</p>

    <div class="grid gap-2.5 mb-[18px]">
      <div
        v-for="(item, i) in t.ai.items"
        :key="i"
        class="va-card px-4 py-3.5"
      >
        <div class="flex items-baseline gap-2.5">
          <span class="text-accent font-mono text-[12px]">[{{ String(i + 1).padStart(2, '0') }}]</span>
          <span class="text-fg text-[14px] font-semibold">{{ item.k }}</span>
        </div>
        <p class="mt-1.5 ml-8 text-dim2 text-[12px] leading-relaxed m-0 mt-1.5">{{ item.d }}</p>
      </div>
    </div>

    <blockquote
      class="m-0 py-3.5 px-[18px] text-fg text-[13px] leading-relaxed italic bg-bg2"
      style="border-left: 2px solid var(--accent);"
    >
      {{ t.ai.quote }}
    </blockquote>
  </SectionShell>
</template>
