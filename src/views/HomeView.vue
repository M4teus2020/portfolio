<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useT } from '@/i18n/useT'
import type { Locale } from '@/i18n'
import { useMeta } from '@/composables/useMeta'
import { CONTACT, RESUME_URL, PHOTO_URL } from '@/config/site'
import { cases } from '@/data/cases'
import ContourField from '@/components/ContourField.vue'
import CopyEmail from '@/components/CopyEmail.vue'

const t = useT()
const { locale } = useI18n()
const h = computed(() => t.value.home)
const caseCards = computed(() =>
  cases.map((c) => ({ ...c, text: c.content[locale.value as Locale] })),
)

useMeta(() => ({ title: t.value.meta.homeTitle, description: t.value.meta.homeDescription }))

// Brilho esmeralda que segue o mouse no herói (posição em --gx/--gy, lida pelo CSS de .hero-bleed).
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
          <a v-if="RESUME_URL" class="btn btn-line" :href="RESUME_URL" download>{{
            t.common.resume
          }}</a>
          <a class="link actions-link" :href="CONTACT.linkedin" target="_blank" rel="noreferrer"
            >LinkedIn</a
          >
        </div>
      </div>
      <div class="hero-art" :class="{ 'has-photo': PHOTO_URL }">
        <ContourField />
        <img
          v-if="PHOTO_URL"
          class="photo"
          :src="PHOTO_URL"
          alt="Mateus Felini"
          width="480"
          height="600"
        />
      </div>
    </section>
  </div>

  <section class="wrap proof" :aria-label="h.kicker">
    <div v-for="p in h.proof" :key="p.big" class="proof-item">
      <p class="proof-big">{{ p.big }}</p>
      <p class="proof-small">{{ p.small }}</p>
    </div>
  </section>

  <section class="band delivered">
    <div class="wrap">
      <h2 class="band-title">{{ h.delivered.title }}</h2>
      <ul class="dl-list">
        <li v-for="d in h.delivered.items" :key="d.k" class="dl-item">
          <h3 class="dl-k">{{ d.k }}</h3>
          <p class="dl-d">{{ d.d }}</p>
        </li>
      </ul>
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
      <h2 class="band-title">{{ h.work.title }}</h2>
      <div>
        <ul class="work">
          <li v-for="w in h.work.items" :key="w.k">
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
      <h2 class="band-title">{{ h.timeline.title }}</h2>
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
    <div class="wrap">
      <h2 class="band-title">{{ h.contact.title }}</h2>
      <p class="contact-text">{{ h.contact.text }}</p>
      <CopyEmail />
      <ul class="contact-links">
        <li>
          <a class="link" :href="CONTACT.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        </li>
        <li><a class="link" :href="CONTACT.github" target="_blank" rel="noreferrer">GitHub</a></li>
        <li v-if="RESUME_URL">
          <a class="link" :href="RESUME_URL" download>{{ t.common.resume }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Hero */
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
    radial-gradient(34rem circle at var(--gx) var(--gy), rgb(22 118 83 / 0.32), transparent 65%),
    radial-gradient(60rem circle at 100% 0, rgb(63 182 133 / 0.08), transparent 60%);
  pointer-events: none;
  transition: background-position 0.4s;
}
.hero {
  position: relative;
  display: grid;
  align-items: center;
  padding-block: clamp(1.5rem, 5vw, 4rem) clamp(3rem, 7vw, 5.5rem);
  min-height: min(52rem, calc(100svh - 4.5rem));
}
.hero-text {
  position: relative;
  z-index: 1;
}
.hero-art {
  position: absolute;
  right: -20%;
  bottom: 0;
  width: min(26rem, 80vw);
  opacity: 0.25;
}
@media (max-width: 899px) {
  .hero {
    align-items: start;
    min-height: auto;
    padding-top: 1.5rem;
    overflow-x: clip;
  }
}
@media (min-width: 900px) {
  .hero {
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    gap: 2rem;
  }
  .hero-art {
    position: relative;
    right: auto;
    bottom: auto;
    width: 100%;
    max-width: 26rem;
    justify-self: end;
    opacity: 1;
  }
}
.hero-art.has-photo {
  display: grid;
}
.hero-art.has-photo > * {
  grid-area: 1 / 1;
}
.photo {
  width: 72%;
  justify-self: center;
  align-self: center;
  border-radius: 6px;
  object-fit: cover;
  aspect-ratio: 4 / 5;
}

.kicker {
  margin: 0 0 1rem;
  font-weight: 600;
  color: var(--mato);
}
.name {
  margin: 0 0 0 -0.04em;
  font-size: clamp(4rem, 15.5vw, 10.5rem);
  font-weight: 900;
  line-height: 0.84;
  letter-spacing: -0.055em;
}
.title {
  margin: clamp(1.5rem, 3vw, 2.25rem) 0 0;
  font-size: clamp(1.5rem, 3.2vw, 2.25rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.025em;
  max-width: 20ch;
}
.lede {
  margin: 1rem 0 0;
  color: var(--muted);
  font-size: 1.125rem;
  max-width: 50ch;
}
.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 1.25rem;
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  font-size: 0.9375rem;
  font-weight: 500;
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
  border: 1.5px solid var(--mato);
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

/* Faixa de prova */
.proof {
  display: grid;
  gap: 1.5rem;
  padding-bottom: clamp(3rem, 7vw, 5rem);
}
@media (min-width: 720px) {
  .proof {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;
  }
}
.proof-item {
  border-top: 2px solid var(--ink);
  padding-top: 1rem;
}
.proof-big {
  margin: 0;
  font-size: clamp(1.75rem, 3.6vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  font-variant-numeric: tabular-nums;
}
.proof-small {
  margin: 0.5rem 0 0;
  color: var(--muted);
  max-width: 30ch;
}

/* Projetos */
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
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.15s;
}
.case-link:hover {
  border-color: var(--ink);
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
  font-size: 0.875rem;
}
.case-read {
  margin-top: 0.5rem;
  font-weight: 600;
  color: var(--mato);
}

/* Como eu trabalho */
.work {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 2rem 3rem;
}
@media (min-width: 720px) {
  .work {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
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
  border-left: 3px solid var(--broto);
}

/* Trajetória */
.tl {
  list-style: none;
  margin: 0;
  padding: 0;
}
.tl-item {
  display: grid;
  gap: 0.25rem 2rem;
  padding-block: 1.5rem;
  border-bottom: 1px solid var(--line);
}
.tl-item:first-child {
  padding-top: 0;
}
@media (min-width: 640px) {
  .tl-item {
    grid-template-columns: 9.5rem minmax(0, 1fr);
  }
}
.tl-years {
  margin: 0;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--mato);
}
.tl-company {
  margin: 0;
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.tl-text {
  margin: 0.75rem 0 0;
  max-width: 58ch;
}
.tl-more {
  margin-top: 1rem;
}

/* Faixa pro cliente: discreta, pra não competir com a trajetória */
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

/* O que já entreguei: largura total, quebra a espinha título/coluna */
.dl-list {
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
}
.dl-item {
  display: grid;
  gap: 0.5rem 3rem;
  padding-block: 1.75rem;
  border-top: 1px solid var(--line);
}
@media (min-width: 900px) {
  .dl-item {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: baseline;
  }
}
.dl-k {
  margin: 0;
  font-size: clamp(1.5rem, 3.2vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  max-width: 20ch;
}
.dl-d {
  margin: 0;
  color: var(--muted);
  font-size: 1.0625rem;
  max-width: 52ch;
}

/* Contato */
.contact {
  background: var(--paper-2);
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
</style>
