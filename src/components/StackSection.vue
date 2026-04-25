<script setup lang="ts">
import { useT } from '@/i18n/useT'
import SectionShell from './ui/SectionShell.vue'
import AsciiHeader from './ui/AsciiHeader.vue'

const t = useT()
</script>

<template>
  <SectionShell id="stack" cmd="which laravel vue node docker claude" lazy>
    <AsciiHeader :text="`# ${t.stack.kicker.toUpperCase()}`" />
    <h2 class="text-[22px] mt-[18px] mb-[18px] text-fg font-semibold">{{ t.stack.title }}</h2>

    <div class="grid gap-3.5">
      <div v-for="group in t.stack.groups" :key="group.h">
        <div class="text-t-amber text-[11px] uppercase tracking-[0.1em] mb-1.5">
          ./{{ group.h.toLowerCase().replace(/[\s/]+/g, '-') }}/
        </div>
        <div>
          <span v-for="item in group.items" :key="item" class="va-chip">{{ item }}</span>
        </div>
      </div>
    </div>
  </SectionShell>
</template>
