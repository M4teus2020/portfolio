<script setup lang="ts">
import { useT } from '@/i18n/useT'

const t = useT()
</script>

<template>
  <footer class="px-9 py-7 border-t border-dashed border-line text-dim text-[11px] font-mono">
    <span class="text-accent">$</span> exit 0 — <span>{{ t.footer.built }}</span>
  </footer>
</template>
