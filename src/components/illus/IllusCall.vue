<script setup lang="ts">
import IllusFrame from './IllusFrame.vue'
const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8]
</script>

<template>
  <IllusFrame title="discador · navegador">
    <svg class="il" viewBox="0 0 480 300">
      <!-- lista de contatos -->
      <g>
        <circle class="s" cx="70" cy="86" r="9" />
        <rect class="s" x="88" y="80" width="86" height="12" rx="6" />
        <g class="a-active">
          <rect class="s acc" x="52" y="108" width="140" height="34" rx="10" />
          <circle class="s acc" cx="70" cy="125" r="9" />
          <rect class="s acc" x="88" y="119" width="70" height="12" rx="6" />
        </g>
        <circle class="s" cx="70" cy="164" r="9" />
        <rect class="s" x="88" y="158" width="60" height="12" rx="6" />
        <circle class="s" cx="70" cy="198" r="9" />
        <rect class="s" x="88" y="192" width="96" height="12" rx="6" />
      </g>

      <!-- chamada -->
      <g transform="translate(330 128)">
        <circle class="s acc a-ring r1" r="40" />
        <circle class="s acc a-ring r2" r="40" />
        <circle class="fill-acc" r="38" />
        <g transform="translate(-14 -14) scale(1.17)">
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            fill="none"
            stroke="#fff"
            stroke-width="1.8"
            stroke-linejoin="round"
          />
        </g>
      </g>
      <g class="t-wrap" text-anchor="middle" style="font-size: 12px">
        <text class="a-tick" x="330" y="194" style="animation-delay: 0s">00:01</text>
        <text class="a-tick" x="330" y="194" style="animation-delay: 1s">00:02</text>
        <text class="a-tick" x="330" y="194" style="animation-delay: 2s">00:03</text>
        <text class="a-tick" x="330" y="194" style="animation-delay: 3s">00:04</text>
      </g>
      <g transform="translate(330 232)">
        <rect
          v-for="(b, i) in bars"
          :key="b"
          class="fill-acc a-bar"
          :x="-36 + i * 8"
          y="-9"
          width="4"
          height="18"
          rx="2"
          :style="{ animationDelay: `${i * 0.11}s` }"
        />
      </g>
      <text x="262" y="262">conectado · sem sair do sistema</text>
    </svg>
  </IllusFrame>
</template>

<style scoped>
.a-ring {
  transform-box: fill-box;
  transform-origin: center;
  animation: ripple 2.6s ease-out infinite;
}
.r2 {
  animation-delay: 1.3s;
}
.a-tick {
  fill: var(--ink);
  opacity: 0;
  animation: tick 4s linear infinite;
}
.a-bar {
  transform-box: fill-box;
  transform-origin: center;
  animation: eq 0.9s ease-in-out infinite;
}
.a-active {
  animation: glow 4s ease-in-out infinite;
}
.a-ring,
.a-tick,
.a-bar,
.a-active {
  animation-play-state: var(--play, paused);
}
@keyframes ripple {
  0% {
    opacity: 0.7;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.9);
  }
}
@keyframes tick {
  0% {
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  25%,
  100% {
    opacity: 0;
  }
}
@keyframes eq {
  0%,
  100% {
    transform: scaleY(0.25);
  }
  50% {
    transform: scaleY(1);
  }
}
@keyframes glow {
  50% {
    opacity: 0.6;
  }
}
</style>
