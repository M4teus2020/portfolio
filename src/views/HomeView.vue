<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useT } from '@/i18n/useT'
import type { Locale } from '@/i18n'
import { useMeta } from '@/composables/useMeta'
import { CONTACT } from '@/config/site'
import { cases } from '@/data/cases'
import HeroSystem from '@/components/HeroSystem.vue'
import StackMarquee from '@/components/StackMarquee.vue'
import CopyEmail from '@/components/CopyEmail.vue'
import IllusMail from '@/components/illus/IllusMail.vue'
import IllusCall from '@/components/illus/IllusCall.vue'
import IllusQuery from '@/components/illus/IllusQuery.vue'
import IllusShield from '@/components/illus/IllusShield.vue'

const t = useT()
const { locale } = useI18n()
const h = computed(() => t.value.home)
const caseCards = computed(() =>
  cases.map((c) => ({ ...c, text: c.content[locale.value as Locale] })),
)

// Uma ilustração por entrega, na mesma ordem de home.delivered.items (pt e en).
const illus = [IllusMail, IllusCall, IllusQuery, IllusShield]
const tags = [
  ['Microsoft Graph', 'Kanban', 'Regras em nodes'],
  ['API de telefonia', 'Discador web'],
  ['CTE', 'Eager loading', 'N+1'],
  ['Segurança', 'SQL'],
]

useMeta(() => ({ title: t.value.meta.homeTitle, description: t.value.meta.homeDescription }))

// Brilho esmeralda e parallax que seguem o mouse no herói (--gx/--gy e --mx/--my, lidos pelo CSS).
const bleed = ref<HTMLElement>()
let raf = 0
const glow = (e: PointerEvent) => {
  if (raf || !bleed.value) return
  const r = bleed.value.getBoundingClientRect()
  raf = requestAnimationFrame(() => {
    raf = 0
    bleed.value?.style.setProperty('--gx', `${e.clientX - r.left}px`)
    bleed.value?.style.setProperty('--gy', `${e.clientY - r.top}px`)
    bleed.value?.style.setProperty('--mx', String((e.clientX / window.innerWidth - 0.5) * 2))
    bleed.value?.style.setProperty('--my', String((e.clientY / window.innerHeight - 0.5) * 2))
  })
}
</script>

<template>
  <div ref="bleed" class="deep hero-bleed" data-hero @pointermove="glow">
    <section class="hero wrap">
      <div class="hero-text">
        <p class="kicker">{{ h.kicker }}</p>
        <h1 class="name">Mateus<br />Felini</h1>
        <p class="title">{{ h.title }}</p>
        <p class="lede">{{ h.lede }}</p>
        <ul class="facts">
          <li v-for="f in h.facts" :key="f">{{ f }}</li>
        </ul>
        <div class="actions">
          <a class="btn btn-solid" href="#contato">{{ h.ctaTalk }}</a>
          <a class="btn btn-line" href="#trajetoria">{{ h.ctaTimeline }}</a>
          <a class="link actions-link" :href="CONTACT.linkedin" target="_blank" rel="noreferrer"
            >LinkedIn</a
          >
        </div>
      </div>
      <div class="hero-art">
        <HeroSystem />
      </div>
    </section>
    <div class="hero-foot">
      <p class="wrap foot-label">
        <span class="eyebrow">{{ h.labels.stack }}</span>
      </p>
      <StackMarquee />
    </div>
  </div>

  <section class="wrap proof" :aria-label="h.kicker">
    <div v-for="p in h.proof" :key="p.big" class="proof-item">
      <p class="proof-big">{{ p.big }}</p>
      <p class="proof-small">{{ p.small }}</p>
    </div>
  </section>

  <section id="entregas" class="band delivered">
    <div class="wrap">
      <p class="eyebrow">01 / {{ h.labels.delivered }}</p>
      <h2 class="band-title big">{{ h.delivered.title }}</h2>
      <ol class="stack">
        <li v-for="(d, i) in h.delivered.items" :key="d.k" class="card" :style="{ '--i': i }">
          <div class="card-text">
            <p class="card-n">
              0{{ i + 1 }} <span>/ 0{{ h.delivered.items.length }}</span>
            </p>
            <h3 class="dl-k">{{ d.k }}</h3>
            <p class="dl-d">{{ d.d }}</p>
            <ul class="tags">
              <li v-for="tag in tags[i]" :key="tag">{{ tag }}</li>
            </ul>
          </div>
          <div class="card-art">
            <component :is="illus[i]" />
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section v-if="caseCards.length" id="projetos" class="band">
    <div class="wrap band-grid">
      <div>
        <h2 class="band-title">{{ h.projects.title }}</h2>
        <p class="band-sub">{{ h.projects.sub }}</p>
      </div>
      <ul class="cases">
        <li v-for="c in caseCards" :key="c.slug">
          <RouterLink :to="`/projetos/${c.slug}`" class="case-link">
            <span class="case-name">{{ c.text.name }}</span>
            <span class="case-summary">{{ c.text.summary }}</span>
            <span class="case-stack">{{ c.stack.slice(0, 3).join(', ') }}</span>
            <span class="case-read">{{ h.projects.read }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <section class="band">
    <div class="wrap band-grid">
      <div>
        <p class="eyebrow">02 / {{ h.labels.work }}</p>
        <h2 class="band-title">{{ h.work.title }}</h2>
      </div>
      <div>
        <ul class="work">
          <li v-for="(w, i) in h.work.items" :key="w.k">
            <span class="work-n">0{{ i + 1 }}</span>
            <h3 class="work-k">{{ w.k }}</h3>
            <p class="work-d">{{ w.d }}</p>
          </li>
        </ul>
        <p class="work-close">{{ h.work.close }}</p>
      </div>
    </div>
  </section>

  <section id="trajetoria" class="band">
    <div class="wrap band-grid">
      <div>
        <p class="eyebrow">03 / {{ h.labels.timeline }}</p>
        <h2 class="band-title">{{ h.timeline.title }}</h2>
      </div>
      <div>
        <ol class="tl">
          <li v-for="it in h.timeline.items" :key="it.company" class="tl-item">
            <p class="tl-years">{{ it.years }}</p>
            <div>
              <h3 class="tl-company">{{ it.company }}</h3>
              <p class="tl-text">{{ it.text }}</p>
            </div>
          </li>
        </ol>
        <RouterLink to="/sobre" class="link tl-more">{{ h.timeline.more }}</RouterLink>
      </div>
    </div>
  </section>

  <section class="band client">
    <div class="wrap client-row">
      <div>
        <h2 class="band-title">{{ h.client.title }}</h2>
        <p class="client-text">{{ h.client.text }}</p>
      </div>
      <RouterLink to="/servicos" class="btn btn-solid client-cta">{{ h.client.cta }}</RouterLink>
    </div>
  </section>

  <section id="contato" class="band contact deep">
    <div class="big-mq" aria-hidden="true">
      <div class="big-lane">
        <span v-for="n in 8" :key="n">{{ h.contact.title }}</span>
      </div>
    </div>
    <div class="wrap">
      <p class="eyebrow">04 / {{ h.labels.contact }}</p>
      <h2 class="band-title">{{ h.contact.title }}</h2>
      <p class="contact-text">{{ h.contact.text }}</p>
      <CopyEmail />
      <ul class="contact-links">
        <li>
          <a class="link" :href="CONTACT.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        </li>
        <li><a class="link" :href="CONTACT.github" target="_blank" rel="noreferrer">GitHub</a></li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* ─── Herói ─── */
.hero-bleed {
  position: relative;
  overflow: clip;
  --gx: 72%;
  --gy: 30%;
}
.hero-bleed::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(36rem circle at var(--gx) var(--gy), rgb(22 118 83 / 0.3), transparent 65%),
    radial-gradient(60rem circle at 100% 0, rgb(63 182 133 / 0.08), transparent 60%);
  pointer-events: none;
}
/* Malha sutil de pontos no fundo do herói, esmaecendo pra baixo. */
.hero-bleed::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    color-mix(in srgb, var(--on-deep) 16%, transparent) 1px,
    transparent 1px
  );
  background-size: 28px 28px;
  mask-image: linear-gradient(180deg, #000, transparent 75%);
  pointer-events: none;
  opacity: 0.5;
}
.hero {
  position: relative;
  z-index: 1;
  display: grid;
  align-items: center;
  gap: 2rem;
  padding-block: calc(var(--head-h, 5rem) + 2rem) 2.5rem;
}
@media (min-width: 960px) {
  .hero {
    grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
    min-height: min(54rem, calc(100svh - 8rem));
  }
}
.hero-text {
  position: relative;
}
.hero-art {
  width: 100%;
  max-width: 34rem;
  justify-self: center;
}
.kicker {
  margin: 0 0 1.25rem;
  font: 500 0.8125rem/1.2 var(--mono);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--mato);
}
.name {
  margin: 0 0 0 -0.04em;
  font-size: clamp(4.5rem, 9.4vw, 8.5rem);
  font-weight: 900;
  line-height: 0.86;
  letter-spacing: -0.055em;
}
.title {
  margin: clamp(1.5rem, 3vw, 2.25rem) 0 0;
  font-size: clamp(1.4rem, 2.6vw, 2rem);
  font-weight: 700;
  line-height: 1.14;
  letter-spacing: -0.025em;
  max-width: 22ch;
}
.lede {
  margin: 1rem 0 0;
  color: var(--muted);
  font-size: 1.0625rem;
  max-width: 48ch;
}
.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 1.25rem;
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  font: 500 0.8125rem/1.4 var(--mono);
}
.facts li {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.facts li::before {
  content: '';
  width: 0.4375rem;
  height: 0.4375rem;
  border-radius: 50%;
  background: var(--mato);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--mato) 25%, transparent);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
  margin-top: 2rem;
}
.actions-link,
.tl-more {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-weight: 600;
}
.hero-foot {
  position: relative;
  z-index: 1;
  padding-bottom: 2.25rem;
}
.foot-label {
  margin: 0 auto 0.875rem;
}
.foot-label .eyebrow {
  margin: 0;
}

/* ─── Prova ─── */
.proof {
  display: grid;
  gap: 1.5rem;
  padding-block: clamp(2.5rem, 6vw, 4.5rem);
}
@media (min-width: 720px) {
  .proof {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;
  }
}
.proof-item {
  border-top: 1px solid var(--line);
  padding-top: 1rem;
}
.proof-big {
  margin: 0;
  font-size: clamp(2rem, 3.9vw, 3.1rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  white-space: nowrap;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(120deg, var(--ink) 40%, var(--mato));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.proof-small {
  margin: 0.625rem 0 0;
  color: var(--muted);
  max-width: 30ch;
}

/* ─── Entregas: cartões que empilham ao rolar ─── */
.band-title.big {
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  letter-spacing: -0.045em;
  line-height: 0.98;
}
.stack {
  list-style: none;
  margin: clamp(2rem, 5vw, 3.5rem) 0 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;
}
.card {
  display: grid;
  gap: 1.5rem 3rem;
  padding: clamp(1.25rem, 3vw, 2.25rem);
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--card);
  box-shadow: 0 30px 60px -40px rgb(16 23 19 / 0.35);
}
@media (min-width: 900px) {
  .card {
    position: sticky;
    top: calc(var(--head-h, 5rem) + 1rem + var(--i) * 0.875rem);
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr);
    align-items: center;
    min-height: 26rem;
  }
  .card:nth-child(even) .card-art {
    order: -1;
  }
}
.card-n {
  margin: 0 0 1rem;
  font: 600 0.8125rem/1 var(--mono);
  color: var(--mato);
}
.card-n span {
  color: var(--muted);
}
.dl-k {
  margin: 0;
  font-size: clamp(1.625rem, 3.2vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.06;
  max-width: 18ch;
}
.dl-d {
  margin: 1rem 0 0;
  color: var(--muted);
  max-width: 46ch;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
}
.tags li {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font: 500 0.75rem/1 var(--mono);
  color: var(--muted);
}

/* ─── Projetos ─── */
.cases {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}
.case-link {
  display: grid;
  gap: 0.375rem;
  padding: 1.5rem;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  text-decoration: none;
  transition: border-color 0.15s;
}
.case-link:hover {
  border-color: var(--mato);
}
.case-name {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.case-summary {
  color: var(--muted);
}
.case-stack {
  font: 500 0.8125rem/1.4 var(--mono);
}
.case-read {
  margin-top: 0.5rem;
  font-weight: 600;
  color: var(--mato);
}

/* ─── Método ─── */
.work {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}
@media (min-width: 720px) {
  .work {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
.work li {
  position: relative;
  padding: 1.5rem;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--card);
  transition:
    border-color 0.25s,
    transform 0.4s var(--ease);
}
.work li:hover {
  border-color: var(--mato);
  transform: translateY(-4px);
}
.work-n {
  display: block;
  margin-bottom: 1.25rem;
  font: 600 0.8125rem/1 var(--mono);
  color: var(--mato);
}
.work-k {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.25;
}
.work-d {
  margin: 0.5rem 0 0;
  color: var(--muted);
  max-width: 42ch;
}
.work-close {
  margin: 3rem 0 0;
  font-family: var(--serif);
  font-size: clamp(1.375rem, 2.6vw, 1.875rem);
  line-height: 1.35;
  max-width: 34ch;
  padding-left: 1.25rem;
  border-left: 3px solid var(--mato);
}

/* ─── Trajetória: linha que se preenche ao rolar (--tl vem do ScrollTrigger) ─── */
.tl {
  --tl: 0;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0 0 0 2rem;
}
.tl::before,
.tl::after {
  content: '';
  position: absolute;
  left: 0.3125rem;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 2px;
  border-radius: 2px;
}
.tl::before {
  background: var(--line);
}
.tl::after {
  background: var(--mato);
  transform: scaleY(var(--tl));
  transform-origin: top;
}
.tl-item {
  position: relative;
  display: grid;
  gap: 0.25rem 2rem;
  padding-block: 0 2.5rem;
}
.tl-item:last-child {
  padding-bottom: 0;
}
.tl-item::before {
  content: '';
  position: absolute;
  left: -2rem;
  top: 0.35rem;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid var(--mato);
  border-radius: 50%;
  background: var(--paper);
}
@media (min-width: 640px) {
  .tl-item {
    grid-template-columns: 9.5rem minmax(0, 1fr);
  }
}
.tl-years {
  margin: 0;
  font: 600 0.8125rem/1.6 var(--mono);
  color: var(--mato);
}
.tl-company {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.2;
}
.tl-text {
  margin: 0.75rem 0 0;
  max-width: 58ch;
  color: var(--muted);
}
.tl-more {
  margin-top: 1.5rem;
}

/* ─── Faixa pro cliente ─── */
.client {
  background: var(--paper-2);
  padding-block: clamp(2.5rem, 6vw, 4rem);
}
.client-row {
  display: grid;
  gap: 1.5rem;
  align-items: center;
}
@media (min-width: 900px) {
  .client-row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 4rem;
  }
}
.client-text {
  margin: 0.5rem 0 0;
  color: var(--muted);
  font-size: 1.125rem;
  max-width: 52ch;
}
.client-cta {
  justify-self: start;
}

/* ─── Contato ─── */
.contact {
  position: relative;
  overflow: clip;
  padding-top: clamp(5rem, 12vw, 9rem);
}
.big-mq {
  position: absolute;
  inset: 1.5rem 0 auto 0;
  overflow: hidden;
  pointer-events: none;
}
.big-lane {
  display: flex;
  width: max-content;
  animation: bigrun 60s linear infinite;
}
.big-lane span {
  flex: none;
  padding-right: 3rem;
  font-size: clamp(5rem, 14vw, 11rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--on-deep) 14%, transparent);
  white-space: nowrap;
}
@keyframes bigrun {
  to {
    transform: translateX(-50%);
  }
}
.contact .wrap {
  position: relative;
}
.contact-text {
  margin: 0.75rem 0 2rem;
  color: var(--muted);
}
.contact-links a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
}
.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0 1.5rem;
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  font-weight: 600;
}
@media (prefers-reduced-motion: reduce) {
  .big-lane {
    animation: none;
  }
}
</style>
