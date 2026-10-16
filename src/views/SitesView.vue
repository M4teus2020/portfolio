<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '@/i18n/useT'
import { useMeta } from '@/composables/useMeta'
import { CONTACT, WHATSAPP } from '@/config/site'
import { siteExamples } from '@/data/siteExamples'
import ContourField from '@/components/ContourField.vue'

const t = useT()
const s = computed(() => t.value.sites)

// Sem número configurado, o contato cai para e-mail.
const contactHref = computed(() =>
  WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(s.value.whatsappMessage)}`
    : `mailto:${CONTACT.email}?subject=${encodeURIComponent(s.value.kicker)}&body=${encodeURIComponent(s.value.whatsappMessage)}`,
)
const contactLabel = computed(() => (WHATSAPP ? s.value.whatsapp : s.value.whatsappFallback))
const contactTarget = WHATSAPP ? '_blank' : undefined

useMeta(() => ({ title: t.value.meta.sitesTitle, description: t.value.meta.sitesDescription }))
</script>

<template>
  <section class="hero wrap">
    <div class="hero-text">
      <p class="kicker">{{ s.kicker }}</p>
      <h1 class="title">{{ s.title }}</h1>
      <p class="lede">{{ s.lede }}</p>
      <a class="btn btn-solid big" :href="contactHref" :target="contactTarget" rel="noreferrer">{{
        contactLabel
      }}</a>
    </div>
    <div class="hero-art">
      <ContourField :label="s.pinLabel" :rings="10" />
    </div>
  </section>

  <section class="band">
    <div class="wrap band-grid">
      <h2 class="band-title">{{ s.whyTitle }}</h2>
      <ul class="why">
        <li v-for="w in s.why" :key="w.k">
          <h3>{{ w.k }}</h3>
          <p>{{ w.d }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="band">
    <div class="wrap band-grid">
      <h2 class="band-title">{{ s.howTitle }}</h2>
      <ol class="how">
        <li v-for="(step, i) in s.how" :key="step.k">
          <span class="how-n" aria-hidden="true">{{ i + 1 }}</span>
          <div>
            <h3>{{ step.k }}</h3>
            <p>{{ step.d }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section v-if="siteExamples.length" class="band">
    <div class="wrap band-grid">
      <h2 class="band-title">{{ s.examplesTitle }}</h2>
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
  </section>

  <section class="band">
    <div class="wrap band-grid">
      <h2 class="band-title">{{ s.priceTitle }}</h2>
      <p class="price">{{ s.price }}</p>
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
      <a class="btn btn-solid big" :href="contactHref" :target="contactTarget" rel="noreferrer">{{
        contactLabel
      }}</a>
      <p class="close-line">{{ s.closeLine }}</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  align-items: center;
  gap: 2rem;
  padding-block: clamp(2rem, 6vw, 5rem) clamp(3.5rem, 8vw, 6rem);
}
@media (min-width: 900px) {
  .hero {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  }
}
.hero-art {
  max-width: 26rem;
  width: 100%;
  justify-self: center;
}
@media (max-width: 899px) {
  .hero-art {
    max-width: 18rem;
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
  margin: 1.5rem 0 2rem;
  font-size: clamp(1.125rem, 2vw, 1.3125rem);
  max-width: 46ch;
  color: var(--muted);
}
.big {
  min-height: 3.5rem;
  padding-inline: 1.75rem;
  font-size: 1.0625rem;
}

.why {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 2rem;
}
@media (min-width: 720px) {
  .why {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
.why h3,
.how h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.25;
}
.why p,
.how p {
  margin: 0.5rem 0 0;
  color: var(--muted);
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
  max-width: 28ch;
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
  gap: 1rem;
}
.faq summary::-webkit-details-marker {
  display: none;
}
.faq summary::after {
  content: "+";
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--mato);
}
.faq details[open] summary::after {
  content: "\2212";
}
.faq details p {
  margin: 0 0 1.25rem;
  color: var(--muted);
  max-width: 56ch;
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
