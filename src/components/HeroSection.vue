<script setup lang="ts">
import { useT } from '@/i18n/useT'
import { AVAILABILITY } from '@/config/availability'
import TerminalPrompt from './ui/TerminalPrompt.vue'
import AsciiHeader from './ui/AsciiHeader.vue'

const t = useT()
</script>

<template>
  <section class="va-section px-9 py-11 relative overflow-hidden">
    <TerminalPrompt cmd="whoami --verbose" />

    <!-- Name + tagline -->
    <div class="mt-6">
      <AsciiHeader text="HELLO WORLD" />
      <div class="mt-4 text-[10px] text-dim tracking-[0.12em] uppercase">{{ t.hero.role }}</div>
      <div class="text-[10px] text-dim tracking-[0.12em] uppercase">{{ t.hero.location }}</div>
      <h1 class="text-[30px] my-2.5 font-mono font-semibold leading-[1.05] text-fg">
        <span class="text-dim">&gt; </span>{{ t.hero.name
        }}<span class="animate-[blink_1s_steps(1)_infinite] text-accent">_</span>
      </h1>
    </div>

    <p class="text-[16px] text-fg mt-5 mb-1.5">{{ t.hero.tagline }}</p>
    <p class="text-[13px] text-dim2 mb-5 leading-relaxed max-w-[540px]">{{ t.hero.sub }}</p>

    <div class="flex gap-2.5 flex-wrap mb-6">
      <a href="#timeline" class="va-btn">→ {{ t.hero.cta }}</a>
      <a href="#contact" class="va-btn">↗ {{ t.hero.cta2 }}</a>
    </div>

    <!-- Availability badge -->
    <div class="flex items-center gap-2 text-[12px]">
      <span
        class="w-2 h-2 rounded-full inline-block"
        :style="{
          background: AVAILABILITY.available ? 'var(--accent)' : 'var(--amber)',
          boxShadow: AVAILABILITY.available ? '0 0 8px var(--accent)' : 'none',
        }"
      />
      <span class="text-dim2">{{ AVAILABILITY.available ? t.hero.available : t.hero.busy }}</span>
    </div>
  </section>
</template>
