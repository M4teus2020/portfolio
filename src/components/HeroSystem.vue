<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Mapa da plataforma em que trabalho: quatro integrações em produção alimentando o núcleo.
// Os pacotes andam por SMIL (<animateMotion>) e o parallax do mouse vem de --mx/--my (herói).
const svg = ref<SVGSVGElement>()

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) svg.value?.pauseAnimations()
})

const nodes = [
  { id: 'wa', x: 84, y: 112, label: 'WhatsApp', d: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z', delay: 0.5 },
  {
    id: 'tel',
    x: 436,
    y: 112,
    label: 'Telefonia',
    d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
    delay: 0.7,
  },
  {
    id: 'mail',
    x: 84,
    y: 408,
    label: 'E-mail',
    d: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7',
    delay: 0.9,
  },
  {
    id: 'bol',
    x: 436,
    y: 408,
    label: 'Boleto',
    d: 'M3 5v14M7 5v14M10 5v14M14 5v14M17 5v14M21 5v14',
    delay: 1.1,
  },
]

// Caminhos curvos de cada satélite até o núcleo (260, 260).
const paths: Record<string, string> = {
  wa: 'M112 130 C 170 150 205 190 232 232',
  tel: 'M408 130 C 350 150 315 190 288 232',
  mail: 'M112 390 C 170 370 205 330 232 288',
  bol: 'M408 390 C 350 370 315 330 288 288',
}
const chips = [
  { t: 'POST /webhook', x: 188, y: 54, d: 0 },
  { t: 'queue:work', x: 322, y: 470, d: 1.2 },
  { t: '200 OK', x: 392, y: 262, d: 0.6 },
  { t: 'SELECT …', x: 28, y: 262, d: 1.8 },
]
</script>

<template>
  <svg ref="svg" class="sys" viewBox="0 0 520 520" aria-hidden="true">
    <defs>
      <radialGradient id="hub-glow">
        <stop offset="0" stop-color="#3fb685" stop-opacity="0.45" />
        <stop offset="1" stop-color="#3fb685" stop-opacity="0" />
      </radialGradient>
    </defs>

    <g class="layer l0">
      <circle cx="260" cy="260" r="120" fill="url(#hub-glow)" />
      <circle class="ring r1" cx="260" cy="260" r="104" />
      <circle class="ring r2" cx="260" cy="260" r="168" />
      <circle class="ring r3" cx="260" cy="260" r="232" />
    </g>

    <g class="layer l1">
      <g v-for="n in nodes" :key="n.id">
        <path class="wire" :d="paths[n.id]" />
        <path :id="`p-${n.id}`" :d="paths[n.id]" fill="none" />
        <circle class="pkt" r="3.6">
          <animateMotion :dur="'3.4s'" :begin="`${n.delay}s`" repeatCount="indefinite">
            <mpath :href="`#p-${n.id}`" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.12;0.85;1"
            dur="3.4s"
            :begin="`${n.delay}s`"
            repeatCount="indefinite"
          />
        </circle>
        <circle class="pkt back" r="2.6">
          <animateMotion
            dur="3.4s"
            :begin="`${n.delay + 1.7}s`"
            repeatCount="indefinite"
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="linear"
          >
            <mpath :href="`#p-${n.id}`" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;0.8;0.8;0"
            keyTimes="0;0.12;0.85;1"
            dur="3.4s"
            :begin="`${n.delay + 1.7}s`"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </g>

    <!-- núcleo -->
    <g class="hub" transform="translate(260 260)">
      <circle class="wave w1" r="46" />
      <circle class="wave w2" r="46" />
      <circle class="core" r="46" />
      <text class="big" y="2" text-anchor="middle">150k+</text>
      <text class="small" y="20" text-anchor="middle">registros/dia</text>
    </g>

    <g class="layer l2">
      <g
        v-for="n in nodes"
        :key="n.id"
        class="node"
        :style="{ animationDelay: `${n.delay}s` }"
        :transform="`translate(${n.x} ${n.y})`"
      >
        <g class="node-in">
          <circle class="bubble" r="30" />
          <g transform="translate(-12 -12)">
            <path class="icon" :d="n.d" />
          </g>
          <text class="lbl" y="50" text-anchor="middle">{{ n.label }}</text>
        </g>
      </g>
    </g>

    <g class="layer l3">
      <g v-for="c in chips" :key="c.t" class="chip" :style="{ animationDelay: `${c.d}s` }">
        <rect :x="c.x" :y="c.y" :width="c.t.length * 6.2 + 16" height="20" rx="10" />
        <text :x="c.x + 8" :y="c.y + 13.5">{{ c.t }}</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.sys {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}
.layer {
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.l0 {
  transform: translate(calc(var(--mx, 0) * -6px), calc(var(--my, 0) * -6px));
}
.l1 {
  transform: translate(calc(var(--mx, 0) * 3px), calc(var(--my, 0) * 3px));
}
.l2 {
  transform: translate(calc(var(--mx, 0) * 10px), calc(var(--my, 0) * 10px));
}
.l3 {
  transform: translate(calc(var(--mx, 0) * 16px), calc(var(--my, 0) * 16px));
}
.ring {
  fill: none;
  stroke: color-mix(in srgb, var(--mato) 30%, transparent);
  stroke-width: 1;
  stroke-dasharray: 2 9;
  transform-origin: 260px 260px;
  animation: spin 60s linear infinite;
}
.r2 {
  animation-duration: 90s;
  animation-direction: reverse;
  stroke-dasharray: 1 12;
}
.r3 {
  animation-duration: 140s;
  stroke-dasharray: 3 16;
  stroke: color-mix(in srgb, var(--mato) 18%, transparent);
}
.wire {
  fill: none;
  stroke: color-mix(in srgb, var(--mato) 40%, transparent);
  stroke-width: 1.2;
  stroke-dasharray: 3 7;
  animation: flow 2s linear infinite;
}
.pkt {
  fill: var(--deep-accent);
  filter: drop-shadow(0 0 5px var(--deep-accent));
}
.pkt.back {
  fill: var(--on-deep);
  filter: none;
}
.core {
  fill: #0c120f;
  stroke: var(--deep-accent);
  stroke-width: 1.5;
}
.wave {
  fill: none;
  stroke: var(--deep-accent);
  stroke-width: 1.2;
  opacity: 0;
  animation: wave 3.2s ease-out infinite;
}
.w2 {
  animation-delay: 1.6s;
}
.hub .big {
  font: 800 22px var(--sans);
  fill: var(--on-deep);
  letter-spacing: -0.03em;
}
.hub .small {
  font: 500 8.5px var(--mono);
  fill: var(--deep-muted);
}
.node {
  opacity: 0;
  animation: rise 0.9s var(--ease) forwards;
}
.node-in {
  animation: bob 6s ease-in-out infinite;
}
.bubble {
  fill: #0c120f;
  stroke: color-mix(in srgb, var(--deep-accent) 55%, transparent);
  stroke-width: 1.2;
}
.icon {
  fill: none;
  stroke: var(--on-deep);
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lbl {
  font: 600 10px var(--mono);
  fill: var(--deep-muted);
  letter-spacing: 0.04em;
}
.chip {
  opacity: 0;
  animation: drift 7s ease-in-out infinite;
}
.chip rect {
  fill: color-mix(in srgb, var(--deep-accent) 10%, transparent);
  stroke: color-mix(in srgb, var(--deep-accent) 35%, transparent);
  stroke-width: 1;
}
.chip text {
  font: 500 9.5px var(--mono);
  fill: var(--deep-accent);
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes flow {
  to {
    stroke-dashoffset: -20;
  }
}
@keyframes wave {
  0% {
    opacity: 0.55;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(2.4);
  }
}
@keyframes rise {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes bob {
  50% {
    transform: translateY(-5px);
  }
}
@keyframes drift {
  0%,
  100% {
    opacity: 0;
    transform: translateY(6px);
  }
  20%,
  70% {
    opacity: 1;
  }
  50% {
    transform: translateY(-6px);
  }
}
.wave,
.core {
  transform-box: fill-box;
  transform-origin: center;
}
@media (prefers-reduced-motion: reduce) {
  .ring,
  .wire,
  .wave,
  .node-in,
  .chip {
    animation: none;
  }
  .node,
  .chip {
    opacity: 1;
  }
}
</style>
