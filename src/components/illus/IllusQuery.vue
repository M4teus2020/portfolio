<script setup lang="ts">
import IllusFrame from './IllusFrame.vue'
const rows = [0, 1, 2, 3, 4, 5, 6, 7]
</script>

<template>
  <IllusFrame title="relatório · antes e depois">
    <svg class="il" viewBox="0 0 480 300">
      <text x="36" y="44">antes · N+1</text>
      <g>
        <rect
          v-for="r in rows"
          :key="r"
          class="a-q"
          x="36"
          :y="56 + r * 15"
          :width="150 - (r % 3) * 18"
          height="8"
          rx="4"
          :style="{ animationDelay: `${r * 0.16}s` }"
        />
      </g>

      <path class="s il-dash a-dash" d="M204 108 H248" />
      <path class="s" d="M242 102 L250 108 L242 114" />

      <text x="266" y="44">depois · CTE + eager loading</text>
      <rect class="s acc" x="266" y="56" width="178" height="112" rx="10" />
      <text x="278" y="80" style="fill: var(--mato)">WITH base AS (</text>
      <text x="278" y="96">SELECT … FROM …</text>
      <text x="278" y="112">JOIN …</text>
      <text x="278" y="128" style="fill: var(--mato)">)</text>
      <text x="278" y="148">SELECT * FROM base;</text>
      <g class="a-badge">
        <rect class="fill-acc" x="386" y="148" width="50" height="14" rx="7" />
        <text x="411" y="158" text-anchor="middle" style="fill: #fff; font-size: 8px">1 query</text>
      </g>

      <text x="36" y="206">tempo de resposta</text>
      <rect class="s" x="36" y="216" width="408" height="8" rx="4" opacity="0.35" />
      <rect class="a-slow" x="36" y="216" width="408" height="8" rx="4" />
      <rect class="s" x="36" y="238" width="408" height="8" rx="4" opacity="0.35" />
      <rect class="a-fast" x="36" y="238" width="408" height="8" rx="4" />
      <text x="36" y="262">antes</text>
      <text x="444" y="262" text-anchor="end" style="fill: var(--mato)">depois</text>
    </svg>
  </IllusFrame>
</template>

<style scoped>
.a-q {
  fill: var(--deep-muted);
  opacity: 0.8;
  transform-box: fill-box;
  transform-origin: left;
  animation: q 5s ease-in-out infinite;
}
.a-slow {
  fill: var(--deep-muted);
  transform-box: fill-box;
  transform-origin: left;
  animation: slow 5s ease-in-out infinite;
}
.a-fast {
  fill: var(--mato);
  transform-box: fill-box;
  transform-origin: left;
  animation: fast 5s ease-in-out infinite;
}
.a-badge {
  animation: badge 5s ease-in-out infinite;
}
.a-q,
.a-slow,
.a-fast,
.a-badge,
.a-dash {
  animation-play-state: var(--play, paused);
}
@keyframes q {
  0% {
    transform: scaleX(0);
  }
  18%,
  80% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}
@keyframes slow {
  0% {
    transform: scaleX(0);
  }
  80% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes fast {
  0% {
    transform: scaleX(0);
  }
  14%,
  100% {
    transform: scaleX(0.16);
  }
}
@keyframes badge {
  0%,
  10% {
    opacity: 0;
  }
  20%,
  100% {
    opacity: 1;
  }
}
</style>
