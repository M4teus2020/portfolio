<script setup lang="ts">
// Marca: curvas de nível do planalto em volta de um ponto (sem fundo). Os anéis se fecham ao carregar
// e o ponto pulsa; no hover da marca (.brand, no header) os anéis giram em sentidos opostos.
</script>

<template>
  <svg class="logo" viewBox="0 0 32 32" aria-hidden="true">
    <g class="ring r1">
      <g class="spin">
        <ellipse cx="16" cy="16.4" rx="13" ry="10.4" transform="rotate(-18 16 16)" />
      </g>
    </g>
    <g class="ring r2">
      <g class="spin">
        <ellipse cx="16" cy="16.1" rx="7.4" ry="5.8" transform="rotate(-6 16 16)" />
      </g>
    </g>
    <circle class="pulse" cx="16" cy="16" r="3" />
    <circle class="dot" cx="16" cy="16" r="3" />
  </svg>
</template>

<style scoped>
.logo {
  width: 2.25rem;
  height: 2.25rem;
  flex: none;
  overflow: visible;
}
.ring {
  transform-box: view-box;
  transform-origin: 16px 16px;
  opacity: 0;
  animation: close-in 0.9s var(--ease) forwards;
}
/* Respiração no hover da marca: o anel de fora abre um pouco e o de dentro fecha, só isso. */
.spin {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.6s var(--ease);
}
.ring ellipse {
  fill: none;
  stroke: #2fa97b;
  stroke-width: 2.7;
}
.r1 {
  animation-delay: 0.1s;
  --o: 0.5;
}
.r2 {
  animation-delay: 0.35s;
  --o: 1;
}
.dot {
  fill: #2fa97b;
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: pop 0.5s var(--ease) 0.7s forwards;
}
.pulse {
  fill: none;
  stroke: #2fa97b;
  stroke-width: 1.4;
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: ping 3s ease-out 1.4s infinite;
}
:global(.brand:hover) .r1 .spin {
  transform: scale(1.06);
}
:global(.brand:hover) .r2 .spin {
  transform: scale(0.92);
}
@keyframes close-in {
  from {
    opacity: 0;
    transform: scale(1.5);
  }
  to {
    opacity: var(--o, 1);
    transform: scale(1);
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
@keyframes ping {
  0% {
    opacity: 0.7;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(3.2);
  }
}
@media (prefers-reduced-motion: reduce) {
  .ring {
    opacity: var(--o, 1);
    animation: none;
  }
  .dot {
    opacity: 1;
    animation: none;
  }
  .pulse {
    display: none;
  }
}
</style>
