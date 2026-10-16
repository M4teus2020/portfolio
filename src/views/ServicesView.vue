<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '@/i18n/useT'
import { useMeta } from '@/composables/useMeta'
import { CONTACT, WHATSAPP } from '@/config/site'
import { siteExamples } from '@/data/siteExamples'
import ContourField from '@/components/ContourField.vue'

const t = useT()
const s = computed(() => t.value.services)

// Sem número configurado, o contato cai para e-mail.
function contactHref(message: string) {
  return WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`
    : `mailto:${CONTACT.email}?subject=${encodeURIComponent(s.value.kicker)}&body=${encodeURIComponent(message)}`
}
const contactLabel = computed(() => (WHATSAPP ? s.value.whatsapp : s.value.whatsappFallback))
const contactTarget = WHATSAPP ? '_blank' : undefined

useMeta(() => ({
  title: t.value.meta.servicesTitle,
  description: t.value.meta.servicesDescription,
}))
</script>

<template>
  <section class="wrap hero">
    <div class="hero-text">
      <p class="kicker">{{ s.kicker }}</p>
      <h1 class="title">{{ s.title }}</h1>
      <p class="lede">{{ s.lede }}</p>
    </div>
    <div class="hero-art">
      <ContourField :label="s.pinLabel" :rings="10" />
    </div>
  </section>

  <nav class="wrap offers" :aria-label="s.kicker">
    <a v-for="o in s.offers" :key="o.id" :href="`#${o.id}`" class="offer">
      <span class="offer-k">{{ o.k }}</span>
      <span class="offer-d">{{ o.d }}</span>
      <span class="offer-cta">{{ o.cta }}</span>
    </a>
  </nav>

  <!-- Sites: /sites cai aqui (destino do crédito nos rodapés dos clientes). -->
  <section id="sites" class="offer-sec" aria-labelledby="sites-title">
    <header class="wrap sec-head">
      <p class="kicker">{{ s.sites.kicker }}</p>
      <h2 id="sites-title" class="sec-title">{{ s.sites.title }}</h2>
      <!-- Com o 1º cliente no ar, o lede fala com quem veio do rodapé dele. -->
      <p class="sec-lede">{{ siteExamples.length ? s.sites.ledeFromClient : s.sites.lede }}</p>
      <div class="cta-row">
        <a
          class="btn btn-solid big"
          :href="contactHref(s.sites.whatsappMessage)"
          :target="contactTarget"
          rel="noreferrer"
          >{{ contactLabel }}</a
        >
        <p class="identity">{{ s.sites.identity }}</p>
      </div>
    </header>

    <div class="wrap band-grid sub">
      <h3 class="band-title">{{ s.sites.whyTitle }}</h3>
      <ul class="cols3">
        <li v-for="w in s.sites.why" :key="w.k">
          <h4>{{ w.k }}</h4>
          <p>{{ w.d }}</p>
        </li>
      </ul>
    </div>

    <div class="wrap band-grid sub">
      <h3 class="band-title">{{ s.sites.howTitle }}</h3>
      <ol class="how">
        <li v-for="(step, i) in s.sites.how" :key="step.k">
          <span class="how-n" aria-hidden="true">{{ i + 1 }}</span>
          <div>
            <h4>{{ step.k }}</h4>
            <p>{{ step.d }}</p>
          </div>
        </li>
      </ol>
    </div>

    <div v-if="siteExamples.length" class="wrap band-grid sub">
      <h3 class="band-title">{{ s.sites.examplesTitle }}</h3>
      <ul class="examples">
        <li v-for="ex in siteExamples" :key="ex.url">
          <a :href="ex.url" target="_blank" rel="noreferrer" class="ex">
            <img v-if="ex.image" :src="ex.image" :alt="ex.name" loading="lazy" />
            <span class="ex-name">{{ ex.name }}</span>
            <span class="ex-city">{{ ex.city }}</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="wrap band-grid sub">
      <h3 class="band-title">{{ s.sites.priceTitle }}</h3>
      <p class="price">{{ s.sites.price }}</p>
    </div>
  </section>

  <section id="sistemas" class="offer-sec alt" aria-labelledby="sistemas-title">
    <header class="wrap sec-head">
      <p class="kicker">{{ s.systems.kicker }}</p>
      <h2 id="sistemas-title" class="sec-title">{{ s.systems.title }}</h2>
      <p class="sec-lede">{{ s.systems.lede }}</p>
      <a
        class="btn btn-solid big"
        :href="contactHref(s.systems.whatsappMessage)"
        :target="contactTarget"
        rel="noreferrer"
        >{{ contactLabel }}</a
      >
    </header>

    <div class="wrap band-grid sub">
      <h3 class="band-title">{{ s.systems.whatTitle }}</h3>
      <ul class="cols2">
        <li v-for="w in s.systems.what" :key="w.k">
          <h4>{{ w.k }}</h4>
          <p>{{ w.d }}</p>
        </li>
      </ul>
    </div>

    <div class="wrap band-grid sub">
      <h3 class="band-title">{{ s.systems.trustTitle }}</h3>
      <p class="trust">{{ s.systems.trust }}</p>
    </div>

    <div class="wrap band-grid sub">
      <h3 class="band-title">{{ s.systems.howTitle }}</h3>
      <div>
        <ol class="how">
          <li v-for="(step, i) in s.systems.how" :key="step.k">
            <span class="how-n" aria-hidden="true">{{ i + 1 }}</span>
            <div>
              <h4>{{ step.k }}</h4>
              <p>{{ step.d }}</p>
            </div>
          </li>
        </ol>
        <p class="tech">{{ s.systems.tech }}</p>
      </div>
    </div>

    <div class="wrap band-grid sub">
      <h3 class="band-title">{{ s.systems.priceTitle }}</h3>
      <p class="price">{{ s.systems.price }}</p>
    </div>
  </section>

  <section class="band">
    <div class="wrap band-grid">
      <h2 class="band-title">{{ s.faqTitle }}</h2>
      <div class="faq">
        <details v-for="f in s.faq" :key="f.q">
          <summary>{{ f.q }}</summary>
          <p>{{ f.a }}</p>
        </details>
      </div>
    </div>
  </section>

  <section class="band close">
    <div class="wrap">
      <h2 class="close-title">{{ s.closeTitle }}</h2>
      <a
        class="btn btn-solid big"
        :href="contactHref(s.closeMessage)"
        :target="contactTarget"
        rel="noreferrer"
        >{{ contactLabel }}</a
      >
      <p class="close-line">{{ s.closeLine }}</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  align-items: center;
  gap: 2rem;
  padding-block: clamp(2rem, 6vw, 4.5rem) clamp(2rem, 5vw, 3rem);
}
@media (min-width: 900px) {
  .hero {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  }
}
.hero-art {
  max-width: 24rem;
  width: 100%;
  justify-self: center;
}
@media (max-width: 899px) {
  .hero-art {
    max-width: 16rem;
    order: -1;
    justify-self: start;
    margin-left: -1rem;
  }
}
.kicker {
  margin: 0 0 1rem;
  font-weight: 600;
  color: var(--mato);
}
.title {
  margin: 0;
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.045em;
  max-width: 14ch;
}
.lede {
  margin: 1.5rem 0 0;
  font-size: clamp(1.125rem, 2vw, 1.3125rem);
  max-width: 46ch;
  color: var(--muted);
}
.big {
  min-height: 3.5rem;
  padding-inline: 1.75rem;
  font-size: 1.0625rem;
}

/* As duas ofertas, lado a lado */
.offers {
  display: grid;
  gap: 1rem;
  padding-bottom: clamp(3.5rem, 8vw, 6rem);
}
@media (min-width: 720px) {
  .offers {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
}
.offer {
  display: grid;
  gap: 0.5rem;
  align-content: start;
  padding: 1.5rem 1.5rem 1.75rem;
  border: 1.5px solid var(--ink);
  border-radius: 8px;
  text-decoration: none;
  transition:
    background-color 0.2s,
    color 0.2s;
}
.offer:hover {
  background: var(--ink);
  color: var(--paper);
}
.offer-k {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
}
.offer-d {
  color: var(--muted);
  max-width: 36ch;
  transition: color 0.2s;
}
.offer:hover .offer-d {
  color: #b9c4bc;
}
.offer-cta {
  margin-top: 0.75rem;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.25em;
  text-decoration-color: var(--broto);
}

/* Cada oferta é um bloco com cabeçalho grande e sub-seções */
.offer-sec {
  border-top: 1px solid var(--line);
  padding-bottom: clamp(2rem, 5vw, 3.5rem);
  scroll-margin-top: 0.5rem;
}
.offer-sec.alt {
  background: var(--paper-2);
}
.sec-head {
  padding-block: clamp(3.5rem, 8vw, 6rem) clamp(2rem, 5vw, 3rem);
}
.sec-title {
  margin: 0;
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: -0.045em;
  max-width: 16ch;
}
.sec-lede {
  margin: 1.25rem 0 2rem;
  font-size: clamp(1.125rem, 2vw, 1.3125rem);
  max-width: 48ch;
  color: var(--muted);
}
.cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
}
.identity {
  margin: 0;
  max-width: 30ch;
  font-weight: 500;
  line-height: 1.4;
}
.sub {
  padding-block: 2.5rem;
  border-top: 1px solid var(--line);
}

.cols3,
.cols2 {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 2rem 3rem;
}
@media (min-width: 720px) {
  .cols3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .cols2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
.cols3 h4,
.cols2 h4,
.how h4 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.25;
}
.cols3 p,
.cols2 p,
.how p {
  margin: 0.5rem 0 0;
  color: var(--muted);
  max-width: 42ch;
}

.how {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.75rem;
}
@media (min-width: 720px) {
  .how {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2.5rem 3rem;
  }
}
.how li {
  display: grid;
  grid-template-columns: 3.25rem minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}
.how-n {
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  border: 2px solid var(--mato);
  color: var(--mato);
  font-size: 1.375rem;
  font-weight: 800;
}

.trust {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(1.375rem, 2.6vw, 1.875rem);
  line-height: 1.4;
  max-width: 36ch;
  padding-left: 1.25rem;
  border-left: 3px solid var(--broto);
}
.tech {
  margin: 2.5rem 0 0;
  font-size: 0.9375rem;
  color: var(--muted);
}

.examples {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
}
.ex {
  display: grid;
  gap: 0.25rem;
  text-decoration: none;
}
.ex img {
  border-radius: 6px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border: 1px solid var(--line);
}
.ex-name {
  font-weight: 800;
  font-size: 1.125rem;
}
.ex-city {
  color: var(--muted);
}

.price {
  margin: 0;
  font-size: clamp(1.375rem, 2.8vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  max-width: 30ch;
}

.faq {
  /* Deixa o navegador animar até "auto" (altura do conteúdo). */
  interpolate-size: allow-keywords;
}
.faq details {
  border-bottom: 1px solid var(--line);
}
.faq details:first-child {
  border-top: 1px solid var(--line);
}
.faq summary {
  cursor: pointer;
  list-style: none;
  padding-block: 1.125rem;
  font-weight: 700;
  font-size: 1.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  transition: color 0.2s;
}
.faq summary:hover {
  color: var(--mato);
}
.faq summary::-webkit-details-marker {
  display: none;
}
/* O "+" gira e vira "x" ao abrir. */
.faq summary::after {
  content: "+";
  flex: none;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1.5px solid var(--line);
  font-weight: 500;
  font-size: 1.375rem;
  line-height: 1;
  color: var(--mato);
  transition:
    transform 0.35s cubic-bezier(0.3, 1.4, 0.5, 1),
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
}
.faq details[open] summary::after {
  transform: rotate(135deg);
  background: var(--mato);
  border-color: var(--mato);
  color: var(--paper);
}
/* Altura abre e fecha suave (Chrome, Edge e Safari recentes). */
.faq details::details-content {
  block-size: 0;
  overflow: hidden;
  transition:
    block-size 0.35s cubic-bezier(0.25, 1, 0.5, 1),
    content-visibility 0.35s allow-discrete;
}
.faq details[open]::details-content {
  block-size: auto;
}
/* A resposta desliza e aparece; funciona em qualquer navegador. */
.faq details p {
  margin: 0 0 1.25rem;
  color: var(--muted);
  max-width: 56ch;
}
.faq details[open] p {
  animation: answer-in 0.4s cubic-bezier(0.25, 1, 0.5, 1) both;
}
@keyframes answer-in {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
}

.close {
  background: var(--ink);
  color: var(--paper);
  border-top: 0;
}
.close-title {
  margin: 0 0 2rem;
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: -0.045em;
  max-width: 14ch;
}
.close .btn-solid {
  background: var(--broto);
  color: var(--ink);
  border-color: var(--broto);
}
.close .btn-solid:hover {
  background: var(--paper);
  border-color: var(--paper);
}
.close-line {
  margin: 1.5rem 0 0;
  color: #b9c4bc;
}
</style>
