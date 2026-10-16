<script setup lang="ts">
import { useT } from '@/i18n/useT'
import { CONTACT, RESUME_URL } from '@/config/site'

const t = useT()
</script>

<template>
  <footer class="foot deep">
    <div class="wrap foot-row">
      <p class="foot-line"><strong>Mateus Felini</strong> {{ t.footer.line }}</p>
      <ul class="foot-links">
        <li>
          <RouterLink class="link" to="/servicos">{{ t.nav.services }}</RouterLink>
        </li>
        <li><a class="link" :href="`mailto:${CONTACT.email}`">E-mail</a></li>
        <li>
          <a class="link" :href="CONTACT.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        </li>
        <li><a class="link" :href="CONTACT.github" target="_blank" rel="noreferrer">GitHub</a></li>
        <li v-if="RESUME_URL">
          <a class="link" :href="RESUME_URL" download>{{ t.common.resume }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  border-top: 1px solid var(--line);
  padding-block: 2rem 2.5rem;
  color: var(--muted);
  font-size: 0.9375rem;
}
.foot-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem 2rem;
}
.foot-line {
  margin: 0;
}
.foot-line strong {
  color: var(--ink);
}
.foot-links a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
}
.foot-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
