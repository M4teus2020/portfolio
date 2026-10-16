<script setup lang="ts">
import { ref } from 'vue'
import { useT } from '@/i18n/useT'
import { CONTACT } from '@/config/site'

const t = useT()
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(CONTACT.email)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 2200)
  } catch {
    window.location.href = `mailto:${CONTACT.email}`
  }
}
</script>

<template>
  <div class="mail">
    <a class="mail-addr" :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a>
    <button type="button" class="btn btn-line mail-copy" @click="copy">
      {{ copied ? t.common.copied : t.common.copyEmail }}
    </button>
    <span class="sr" aria-live="polite">{{ copied ? t.common.copied : '' }}</span>
  </div>
</template>

<style scoped>
.mail {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
}
.mail-addr {
  font-size: clamp(1.5rem, 6.2vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.05;
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 0.16em;
  text-decoration-color: var(--broto);
  overflow-wrap: anywhere;
}
.mail-addr:hover {
  text-decoration-color: var(--mato);
}
.mail-copy {
  min-width: 10.5rem;
  justify-content: center;
}
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
