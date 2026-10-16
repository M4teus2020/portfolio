<script setup lang="ts">
import IllusFrame from './IllusFrame.vue'
</script>

<template>
  <IllusFrame title="entrada do usuário · segurança">
    <svg class="il" viewBox="0 0 480 300">
      <defs>
        <clipPath id="il-shield">
          <path d="M280 70 L326 88 V134 C326 166 306 186 280 198 C254 186 234 166 234 134 V88 Z" />
        </clipPath>
        <clipPath id="il-type">
          <rect class="a-type" x="46" y="124" width="124" height="24" />
        </clipPath>
      </defs>

      <text x="36" y="104">campo de busca</text>
      <rect class="s" x="36" y="112" width="148" height="36" rx="8" />
      <text x="48" y="135" clip-path="url(#il-type)" style="fill: var(--ink); font-size: 12px">
        ' OR 1=1 --
      </text>
      <rect class="a-caret" x="48" y="122" width="1.5" height="16" />

      <path class="s il-dash a-dash" d="M190 130 H230" />
      <rect class="a-pkt" x="190" y="125" width="10" height="10" rx="2" />

      <!-- escudo -->
      <path
        class="s a-shield"
        d="M280 70 L326 88 V134 C326 166 306 186 280 198 C254 186 234 166 234 134 V88 Z"
      />
      <g clip-path="url(#il-shield)">
        <rect class="a-scan" x="230" y="70" width="100" height="14" />
      </g>
      <path class="a-check" d="M262 136 L275 149 L300 120" pathLength="1" />
      <text class="a-blocked" x="280" y="222" text-anchor="middle" style="fill: var(--mato)">
        bloqueado
      </text>

      <!-- banco -->
      <path class="s" d="M382 108 v52 M438 108 v52" />
      <ellipse class="s" cx="410" cy="108" rx="28" ry="9" />
      <path class="s" d="M382 160 a28 9 0 0 0 56 0" />
      <path class="s" d="M382 134 a28 9 0 0 0 56 0" opacity="0.5" />
      <text x="410" y="190" text-anchor="middle">banco</text>
      <path class="s" d="M330 134 H378" opacity="0.35" />
    </svg>
  </IllusFrame>
</template>

<style scoped>
.a-type {
  animation: type 6s steps(12) infinite;
}
.a-caret {
  fill: var(--mato);
  animation: caret 6s steps(1) infinite;
}
.a-pkt {
  fill: var(--ink);
  opacity: 0;
  animation: pkt 6s ease-in-out infinite;
}
.a-shield {
  animation: shield 6s ease-in-out infinite;
}
.a-scan {
  fill: color-mix(in srgb, var(--mato) 35%, transparent);
  animation: scan 2.4s linear infinite;
}
.a-check {
  fill: none;
  stroke: var(--mato);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: check 6s ease-in-out infinite;
}
.a-blocked {
  opacity: 0;
  animation: blocked 6s ease-in-out infinite;
}
.a-type,
.a-caret,
.a-pkt,
.a-shield,
.a-scan,
.a-check,
.a-blocked,
.a-dash {
  animation-play-state: var(--play, paused);
}
@keyframes type {
  0% {
    width: 0;
  }
  30%,
  100% {
    width: 124px;
  }
}
@keyframes caret {
  0%,
  50% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0;
  }
}
@keyframes pkt {
  0%,
  32% {
    opacity: 0;
    transform: translateX(0);
  }
  36% {
    opacity: 1;
  }
  50% {
    opacity: 1;
    transform: translateX(34px);
  }
  58% {
    opacity: 1;
    transform: translateX(-6px);
  }
  68%,
  100% {
    opacity: 0;
    transform: translateX(-26px);
  }
}
@keyframes shield {
  0%,
  48% {
    stroke: var(--deep-muted);
  }
  52%,
  90% {
    stroke: var(--mato);
    filter: drop-shadow(0 0 8px var(--mato));
  }
  100% {
    stroke: var(--deep-muted);
  }
}
@keyframes scan {
  from {
    transform: translateY(-14px);
  }
  to {
    transform: translateY(130px);
  }
}
@keyframes check {
  0%,
  50% {
    stroke-dashoffset: 1;
  }
  60%,
  92% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 1;
  }
}
@keyframes blocked {
  0%,
  54% {
    opacity: 0;
  }
  62%,
  92% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
