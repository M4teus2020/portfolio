<script setup lang="ts">
// Curvas de nível com um ponto marcado no topo; o rótulo é opcional (no /sites: o negócio).
// Geradas de forma determinística: mesmo desenho em todo carregamento.
const props = withDefaults(defineProps<{ label?: string; rings?: number }>(), { rings: 12 })

const CX = 330
const CY = 300

function ring(i: number) {
  const base = 26 + i * 25
  const steps = 72
  const pts: string[] = []
  for (let s = 0; s <= steps; s++) {
    const a = (s / steps) * Math.PI * 2
    const wobble =
      1 +
      0.09 * Math.sin(3 * a + i * 0.35) +
      0.05 * Math.sin(5 * a - i * 0.6 + 1.3) +
      0.03 * Math.cos(2 * a + i * 0.9)
    // A encosta se alonga pra baixo e pra esquerda, como um morro de verdade.
    const r = base * wobble
    const x = CX + r * Math.cos(a) * (1 + i * 0.012)
    const y = CY + r * Math.sin(a) * 0.82 + i * 3.2
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return `M${pts.join('L')}Z`
}

const paths = Array.from({ length: props.rings }, (_, i) => ring(i))
</script>

<template>
  <figure class="contour" aria-hidden="true">
    <svg viewBox="0 0 660 640" preserveAspectRatio="xMidYMid meet">
      <path
        v-for="(d, i) in paths"
        :key="i"
        :d="d"
        pathLength="1"
        class="c-ring"
        :class="{ 'c-top': i === 0 }"
        :style="{ animationDelay: `${(paths.length - i) * 70}ms` }"
      />
      <g class="c-pin">
        <circle :cx="CX" :cy="CY" r="7" />
        <template v-if="label">
          <line :x1="CX" :y1="CY" :x2="CX + 92" :y2="CY - 58" />
          <text :x="CX + 98" :y="CY - 62">{{ label }}</text>
        </template>
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.contour {
  margin: 0;
  pointer-events: none;
}
svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}
.c-ring {
  fill: none;
  stroke: var(--line);
  stroke-width: 1.25;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 1.6s cubic-bezier(0.55, 0, 0.25, 1) forwards;
}
.c-top {
  stroke: var(--mato);
  stroke-width: 2;
}
.c-pin {
  opacity: 0;
  animation: pin 0.5s ease-out 1.5s forwards;
}
.c-pin circle {
  fill: var(--mato);
}
.c-pin line {
  stroke: var(--ink);
  stroke-width: 1.25;
}
.c-pin text {
  font: 600 19px var(--sans);
  fill: var(--ink);
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes pin {
  to {
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .c-ring {
    stroke-dashoffset: 0;
    animation: none;
  }
  .c-pin {
    opacity: 1;
    animation: none;
  }
}
</style>
