<script setup lang="ts">
import IllusFrame from './IllusFrame.vue'
</script>

<template>
  <IllusFrame title="inbox → regras → kanban">
    <svg class="il" viewBox="0 0 480 300">
      <!-- e-mail -->
      <g class="a-float">
        <rect class="s ink" x="36" y="128" width="56" height="40" rx="6" />
        <path class="s ink" d="M36 135 L64 155 L92 135" />
      </g>
      <text x="36" y="188">novo e-mail</text>

      <path class="s il-dash a-dash" d="M100 148 H184" />
      <circle class="fill-acc a-pkt1" cx="100" cy="148" r="4.5" />

      <!-- motor de regras -->
      <rect class="s a-rule" x="186" y="92" width="116" height="112" rx="12" />
      <text x="198" y="112">regras</text>
      <g class="a-row1">
        <rect class="s" x="196" y="122" width="96" height="20" rx="6" />
        <text x="203" y="135">assunto ~ "boleto"</text>
      </g>
      <g class="a-row2">
        <rect class="s" x="196" y="150" width="96" height="20" rx="6" />
        <text x="203" y="163">anexo = pdf</text>
      </g>
      <text x="198" y="193" class="fill-acc" style="fill: var(--mato)">→ criar demanda</text>

      <path class="s il-dash a-dash" d="M304 148 H328" />
      <circle class="fill-acc a-pkt2" cx="304" cy="148" r="4.5" />

      <!-- kanban -->
      <g>
        <rect class="s" x="330" y="70" width="46" height="156" rx="8" />
        <rect class="s" x="379" y="70" width="46" height="156" rx="8" />
        <rect class="s" x="428" y="70" width="46" height="156" rx="8" />
        <text x="338" y="86">novo</text>
        <text x="385" y="86">fazendo</text>
        <text x="441" y="86">feito</text>
        <rect class="s" x="384" y="100" width="36" height="18" rx="4" />
        <rect class="s" x="433" y="100" width="36" height="18" rx="4" />
        <rect class="s" x="433" y="124" width="36" height="18" rx="4" />
      </g>
      <rect class="a-card" x="335" y="100" width="36" height="18" rx="4" />
    </svg>
  </IllusFrame>
</template>

<style scoped>
.a-float {
  animation: float 3s ease-in-out infinite;
}
.a-pkt1 {
  animation: pkt1 6s ease-in-out infinite;
  opacity: 0;
}
.a-pkt2 {
  animation: pkt2 6s ease-in-out infinite;
  opacity: 0;
}
.a-rule {
  animation: rule 6s ease-in-out infinite;
}
.a-row1 {
  animation: row1 6s ease-in-out infinite;
}
.a-row2 {
  animation: row2 6s ease-in-out infinite;
}
.a-card {
  fill: var(--mato);
  opacity: 0;
  animation: card 6s ease-in-out infinite;
}
.a-dash {
  animation-play-state: var(--play, paused);
}
@keyframes float {
  50% {
    transform: translateY(-4px);
  }
}
@keyframes pkt1 {
  0%,
  4% {
    opacity: 0;
    transform: translateX(0);
  }
  8% {
    opacity: 1;
  }
  28% {
    opacity: 1;
    transform: translateX(82px);
  }
  32%,
  100% {
    opacity: 0;
    transform: translateX(82px);
  }
}
@keyframes rule {
  0%,
  28% {
    stroke: var(--deep-muted);
    fill: transparent;
  }
  34%,
  58% {
    stroke: var(--mato);
    fill: color-mix(in srgb, var(--mato) 12%, transparent);
  }
  66%,
  100% {
    stroke: var(--deep-muted);
    fill: transparent;
  }
}
@keyframes row1 {
  0%,
  32% {
    opacity: 0.45;
  }
  38%,
  52% {
    opacity: 1;
  }
  60%,
  100% {
    opacity: 0.45;
  }
}
@keyframes row2 {
  0%,
  40% {
    opacity: 0.45;
  }
  46%,
  56% {
    opacity: 1;
  }
  62%,
  100% {
    opacity: 0.45;
  }
}
@keyframes pkt2 {
  0%,
  54% {
    opacity: 0;
    transform: translateX(0);
  }
  58% {
    opacity: 1;
  }
  64% {
    opacity: 1;
    transform: translateX(28px);
  }
  66%,
  100% {
    opacity: 0;
    transform: translateX(28px);
  }
}
@keyframes card {
  0%,
  64% {
    opacity: 0;
    transform: translateX(0);
  }
  68% {
    opacity: 1;
  }
  76% {
    opacity: 1;
    transform: translateX(0);
  }
  84%,
  90% {
    opacity: 1;
    transform: translateX(49px);
  }
  97% {
    opacity: 1;
    transform: translateX(98px);
  }
  100% {
    opacity: 0;
    transform: translateX(98px);
  }
}
.a-float,
.a-pkt1,
.a-pkt2,
.a-rule,
.a-row1,
.a-row2,
.a-card {
  animation-play-state: var(--play, paused);
}
</style>
