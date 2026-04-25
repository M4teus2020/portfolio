<script setup lang="ts">
import { ref } from 'vue'
import { useT } from '@/i18n/useT'
import SectionShell from './ui/SectionShell.vue'
import AsciiHeader from './ui/AsciiHeader.vue'

const t = useT()
const sent = ref(false)

const CONTACTS = {
  email: 'mfelini7@gmail.com',
  github: 'https://github.com/M4teus2020',
  githubLabel: 'github.com/M4teus2020',
  linkedin: 'https://www.linkedin.com/in/mateus-felini-dev',
  linkedinLabel: 'linkedin.com/in/mateus-felini-dev',
}

function handleSubmit() {
  sent.value = true
}
</script>

<template>
  <SectionShell id="contact" :cmd="`mail ${CONTACTS.email}`" lazy>
    <AsciiHeader :text="`# ${t.contact.kicker.toUpperCase()}`" />
    <h2 class="text-[22px] mt-[18px] mb-1.5 text-fg font-semibold">{{ t.contact.title }}</h2>
    <p class="text-dim2 text-[12px] mb-5">{{ t.contact.sub }}</p>

    <!-- Success state -->
    <div
      v-if="sent"
      class="border border-accent px-4 py-4 text-accent text-[13px]"
    >
      ✓ {{ t.contact.sent }}
    </div>

    <!-- Form -->
    <form v-else class="grid gap-3" @submit.prevent="handleSubmit">
      <label class="block">
        <div class="text-dim text-[11px] mb-1">--{{ t.contact.name.toLowerCase() }}</div>
        <input
          type="text"
          class="va-input"
          :placeholder="t.contact.placeholderName"
          required
        />
      </label>
      <label class="block">
        <div class="text-dim text-[11px] mb-1">--{{ t.contact.email.toLowerCase().replace('-', '') }}</div>
        <input
          type="email"
          class="va-input"
          :placeholder="t.contact.placeholderEmail"
          required
        />
      </label>
      <label class="block">
        <div class="text-dim text-[11px] mb-1">--{{ t.contact.msg.toLowerCase() }}</div>
        <textarea
          rows="4"
          class="va-input resize-none"
          :placeholder="t.contact.placeholderMsg"
          required
        />
      </label>
      <button type="submit" class="va-btn justify-self-start">→ {{ t.contact.send }}</button>
    </form>

    <!-- Direct links -->
    <div class="mt-5 text-[12px] text-dim2 border-t border-dashed border-line pt-3.5 flex flex-wrap gap-3.5">
      <span>{{ t.contact.or }}:</span>
      <a class="va-link" :href="`mailto:${CONTACTS.email}`">{{ CONTACTS.email }}</a>
      <a class="va-link" :href="CONTACTS.github" target="_blank" rel="noreferrer">{{ CONTACTS.githubLabel }}</a>
      <a class="va-link" :href="CONTACTS.linkedin" target="_blank" rel="noreferrer">{{ CONTACTS.linkedinLabel }}</a>
    </div>
  </SectionShell>
</template>
