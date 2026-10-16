<script setup lang="ts">
// Monograma "M" desenhado como um grafo: três nós ligados por um traço que se desenha ao carregar.
</script>

<template>
  <svg class="logo" viewBox="0 0 32 32" aria-hidden="true">
    <rect class="tile" x="0.75" y="0.75" width="30.5" height="30.5" rx="9.5" />
    <path class="m" d="M8 23V10.5L16 18.5L24 10.5V23" pathLength="1" />
    <circle class="n n1" cx="8" cy="10.5" r="2.1" />
    <circle class="n n3" cx="24" cy="10.5" r="2.1" />
    <circle class="pulse" cx="16" cy="18.5" r="2.6" />
    <circle class="n n2" cx="16" cy="18.5" r="2.6" />
  </svg>
</template>

<style scoped>
.logo {
  width: 2.25rem;
  height: 2.25rem;
  flex: none;
  overflow: visible;
}
.tile {
  fill: var(--cta);
  stroke: color-mix(in srgb, white 22%, transparent);
  stroke-width: 1.5;
}
.m {
  fill: none;
  stroke: #fff;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 1.1s var(--ease) 0.2s forwards;
}
.n {
  fill: #fff;
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: pop 0.5s var(--ease) forwards;
}
.n1 {
  animation-delay: 0.3s;
}
.n2 {
  fill: #d9f0e3;
  animation-delay: 0.7s;
}
.n3 {
  animation-delay: 1.1s;
}
.pulse {
  fill: none;
  stroke: #d9f0e3;
  stroke-width: 1.2;
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: ping 2.8s ease-out 1.6s infinite;
}
/* Ao passar o mouse na marca (a classe .brand mora no header), os nós saltam em sequência. */
:global(.brand:hover) .n {
  animation: hop 0.6s var(--ease) both;
}
:global(.brand:hover) .n3 {
  animation-delay: 0.08s;
}
:global(.brand:hover) .n2 {
  animation-delay: 0.16s;
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes hop {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  40% {
    transform: translateY(-3px) scale(1.25);
    opacity: 1;
  }
}
@keyframes ping {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(3);
  }
}
@media (prefers-reduced-motion: reduce) {
  .m {
    stroke-dashoffset: 0;
    animation: none;
  }
  .n {
    opacity: 1;
    animation: none;
  }
  .pulse {
    display: none;
  }
}
</style>
