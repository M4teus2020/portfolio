<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useT } from '@/i18n/useT'
import type { Locale } from '@/i18n'
import { useMeta } from '@/composables/useMeta'
import { cases, findCase } from '@/data/cases'
import NotFoundView from './NotFoundView.vue'

const props = defineProps<{ slug: string }>()

const t = useT()
const { locale } = useI18n()
const c = computed(() => findCase(props.slug))
const txt = computed(() => c.value?.content[locale.value as Locale])
const L = computed(() => t.value.caseStudy)
const nextCase = computed(() => {
  if (!c.value || cases.length < 2) return undefined
  const i = cases.indexOf(c.value)
  return cases[(i + 1) % cases.length]
})

useMeta(() =>
  txt.value
    ? { title: `${txt.value.name} · Mateus Felini`, description: txt.value.summary }
    : { title: t.value.meta.notFoundTitle },
)
</script>

<template>
  <NotFoundView v-if="!c || !txt" />
  <article v-else class="case">
    <header class="wrap case-head">
      <h1 class="case-title">{{ txt.name }}</h1>
      <p class="case-summary">{{ txt.summary }}</p>
      <div class="case-links">
        <a v-if="c.liveUrl" class="btn btn-solid" :href="c.liveUrl" target="_blank" rel="noreferrer">{{
          L.live
        }}</a>
        <a v-if="c.codeUrl" class="btn btn-line" :href="c.codeUrl" target="_blank" rel="noreferrer">{{
          L.code
        }}</a>
      </div>
      <dl class="case-facts">
        <div>
          <dt>{{ L.year }}</dt>
          <dd>{{ c.year }}</dd>
        </div>
        <div>
          <dt>{{ L.role }}</dt>
          <dd>{{ txt.role }}</dd>
        </div>
        <div>
          <dt>{{ L.stack }}</dt>
          <dd>{{ c.stack.join(', ') }}</dd>
        </div>
        <div>
          <dt>{{ L.reading }}</dt>
          <dd>{{ c.readingMinutes }} {{ L.minutes }}</dd>
        </div>
      </dl>
    </header>

    <div class="wrap case-body">
      <section class="case-sec">
        <h2>{{ L.sections.problem }}</h2>
        <p class="prose">{{ txt.problem }}</p>
      </section>
      <section class="case-sec">
        <h2>{{ L.sections.role }}</h2>
        <p class="prose">{{ txt.myRole }}</p>
      </section>
      <section class="case-sec">
        <h2>{{ L.sections.decisions }}</h2>
        <ol class="decisions">
          <li v-for="d in txt.decisions" :key="d.chose">
            <dl>
              <dt>{{ L.chose }}</dt>
              <dd>{{ d.chose }}</dd>
              <dt>{{ L.discarded }}</dt>
              <dd>{{ d.discarded }}</dd>
              <dt>{{ L.why }}</dt>
              <dd>{{ d.why }}</dd>
            </dl>
          </li>
        </ol>
      </section>
      <section class="case-sec">
        <h2>{{ L.sections.result }}</h2>
        <p class="prose">{{ txt.result }}</p>
        <figure v-for="img in c.images ?? []" :key="img.src" class="case-img">
          <img :src="img.src" :alt="img.alt[locale as Locale]" loading="lazy" />
        </figure>
      </section>
      <section class="case-sec">
        <h2>{{ L.sections.next }}</h2>
        <p class="prose">{{ txt.next }}</p>
      </section>

      <nav class="case-nav">
        <RouterLink v-if="nextCase" :to="`/projetos/${nextCase.slug}`" class="btn btn-solid">{{
          L.next
        }}</RouterLink>
        <RouterLink to="/" class="link">{{ L.back }}</RouterLink>
      </nav>
    </div>
  </article>
</template>

<style scoped>
.case-head {
  padding-block: clamp(2rem, 6vw, 5rem) clamp(2rem, 5vw, 3.5rem);
}
.case-title {
  margin: 0;
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.045em;
  max-width: 16ch;
}
.case-summary {
  margin: 1.25rem 0 0;
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  color: var(--muted);
  max-width: 48ch;
}
.case-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}
.case-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem 2rem;
  margin: 2.5rem 0 0;
  padding-top: 1.25rem;
  border-top: 2px solid var(--ink);
}
.case-facts dt {
  font-size: 0.875rem;
  color: var(--muted);
}
.case-facts dd {
  margin: 0.25rem 0 0;
  font-weight: 600;
}
.case-body {
  padding-bottom: clamp(3rem, 8vw, 6rem);
}
.case-sec {
  display: grid;
  gap: 0.5rem 3rem;
  padding-block: 2rem;
  border-top: 1px solid var(--line);
}
@media (min-width: 900px) {
  .case-sec {
    grid-template-columns: 15rem minmax(0, 1fr);
  }
  .case-sec > :not(h2) {
    grid-column: 2;
  }
}
.case-sec h2 {
  margin: 0;
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.case-sec .prose {
  margin: 0;
}
.decisions {
  margin: 0;
  padding-left: 1.5rem;
  display: grid;
  gap: 1.5rem;
}
.decisions li::marker {
  font-weight: 800;
  color: var(--mato);
}
.decisions dl {
  margin: 0;
  display: grid;
  grid-template-columns: 6.5rem minmax(0, 1fr);
  gap: 0.375rem 1rem;
}
.decisions dt {
  font-weight: 700;
}
.decisions dd {
  margin: 0;
  font-family: var(--serif);
  font-size: 1.125rem;
}
.case-img {
  margin: 1.5rem 0 0;
}
.case-img img {
  border-radius: 6px;
  border: 1px solid var(--line);
}
.case-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
  font-weight: 600;
}
</style>
