<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '@/i18n/useT'
import { useMeta } from '@/composables/useMeta'
import { CONTACT, RESUME_URL } from '@/config/site'

const t = useT()
const a = computed(() => t.value.about)

useMeta(() => ({ title: t.value.meta.aboutTitle, description: t.value.meta.homeDescription }))
</script>

<template>
  <article class="about">
    <header class="wrap about-head">
      <h1 class="about-title">{{ a.title }}</h1>
      <p class="about-intro">{{ a.intro }}</p>
    </header>

    <ol class="wrap chapters">
      <li v-for="c in a.chapters" :key="c.mark" class="chapter">
        <p class="chapter-mark" aria-hidden="true">{{ c.mark }}</p>
        <div>
          <h2 class="chapter-title">{{ c.title }}</h2>
          <p class="prose chapter-text">{{ c.text }}</p>
        </div>
      </li>
    </ol>

    <section class="band">
      <div class="wrap band-grid">
        <h2 class="band-title">{{ a.bringTitle }}</h2>
        <ul class="bring">
          <li v-for="b in a.bring" :key="b">{{ b }}</li>
        </ul>
      </div>
    </section>

    <section class="band">
      <div class="wrap band-grid">
        <h2 class="band-title">{{ a.toolsTitle }}</h2>
        <div>
          <dl class="tools">
            <div v-for="g in a.tools" :key="g.h" class="tools-row">
              <dt>{{ g.h }}</dt>
              <dd>{{ g.items }}</dd>
            </div>
          </dl>
          <h3 class="edu-title">{{ a.eduTitle }}</h3>
          <p class="edu">{{ a.edu }}</p>
          <div class="about-cta">
            <a v-if="RESUME_URL" class="btn btn-solid" :href="RESUME_URL" download>{{
              t.common.resume
            }}</a>
            <a
              class="btn"
              :class="RESUME_URL ? 'btn-line' : 'btn-solid'"
              :href="`mailto:${CONTACT.email}`"
              >{{ a.ctaTalk }}</a
            >
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.about-head {
  padding-block: clamp(2rem, 6vw, 5rem) clamp(2.5rem, 6vw, 4.5rem);
}
.about-title {
  margin: 0;
  font-size: clamp(2.75rem, 8vw, 6.5rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.05em;
  max-width: 13ch;
}
.about-intro {
  margin: 2rem 0 0;
  font-family: var(--serif);
  font-size: clamp(1.3125rem, 2.4vw, 1.625rem);
  line-height: 1.5;
  max-width: 44ch;
}

.chapters {
  list-style: none;
  margin: 0 auto;
  padding-bottom: clamp(3rem, 7vw, 5rem);
}
.chapter {
  display: grid;
  gap: 0.25rem 3rem;
  padding-block: 2rem;
  border-top: 1px solid var(--line);
}
@media (min-width: 900px) {
  .chapter {
    grid-template-columns: 15rem minmax(0, 1fr);
  }
}
.chapter-mark {
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.9;
  color: var(--mato);
  font-variant-numeric: tabular-nums;
}
.chapter-title {
  margin: 0 0 0.75rem;
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.chapter-text {
  margin: 0;
}

.bring {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 1rem;
}
.bring li {
  font-size: clamp(1.25rem, 2.4vw, 1.625rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.25;
  padding-left: 1.5rem;
  position: relative;
  max-width: 36ch;
}
.bring li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--mato);
}

.tools {
  margin: 0;
}
.tools-row {
  display: grid;
  gap: 0.25rem 2rem;
  padding-block: 1rem;
  border-bottom: 1px solid var(--line);
}
.tools-row:first-child {
  padding-top: 0;
}
@media (min-width: 640px) {
  .tools-row {
    grid-template-columns: 9.5rem minmax(0, 1fr);
  }
}
.tools dt {
  font-weight: 700;
}
.tools dd {
  margin: 0;
  color: var(--muted);
}
.edu-title {
  margin: 2.5rem 0 0.25rem;
  font-size: 1rem;
  font-weight: 700;
}
.edu {
  margin: 0;
  color: var(--muted);
}
.about-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.5rem;
}
</style>
