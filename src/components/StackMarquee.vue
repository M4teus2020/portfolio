<script setup lang="ts">
// Duas faixas de tecnologias correndo em sentidos opostos. A lista é a de "Ferramentas" do Sobre.
const row1 = [
  'PHP',
  'Laravel',
  'Vue 3',
  'TypeScript',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'Docker',
  'Git',
]
const row2 = [
  'Pest',
  'PHPUnit',
  'Vitest',
  'GitHub Actions',
  'Linux',
  'Claude Code',
  'Multi-tenant',
  'DDD',
  'Clean Architecture',
]
</script>

<template>
  <div class="mq" aria-hidden="true">
    <div v-for="(row, r) in [row1, row2]" :key="r" class="track" :class="{ rev: r === 1 }">
      <div class="lane">
        <span v-for="(t, i) in [...row, ...row]" :key="`${t}-${i}`" class="chip">{{ t }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mq {
  display: grid;
  gap: 0.75rem;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.track {
  overflow: hidden;
}
.lane {
  display: flex;
  width: max-content;
  gap: 0.75rem;
  animation: run 46s linear infinite;
}
.rev .lane {
  animation-direction: reverse;
  animation-duration: 56s;
}
.mq:hover .lane {
  animation-play-state: paused;
}
.chip {
  flex: none;
  padding: 0.5rem 1rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font: 500 0.8125rem/1 var(--mono);
  color: var(--muted);
  white-space: nowrap;
  transition:
    color 0.2s,
    border-color 0.2s,
    background-color 0.2s;
}
.chip:hover {
  color: var(--ink);
  border-color: var(--mato);
  background: color-mix(in srgb, var(--mato) 12%, transparent);
}
@keyframes run {
  to {
    transform: translateX(calc(-50% - 0.375rem));
  }
}
@media (prefers-reduced-motion: reduce) {
  .lane {
    animation: none;
  }
}
</style>
