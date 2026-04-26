<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <div class="border border-accent text-[11px] font-mono px-4 py-1.5 opacity-85 select-none">
    <span>{{ text }}</span>
  </div>
</template>
