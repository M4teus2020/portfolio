<script setup lang="ts">
import { ref } from 'vue'
import { useT } from '@/i18n/useT'
import SectionShell from './ui/SectionShell.vue'
import AsciiHeader from './ui/AsciiHeader.vue'

const t = useT()
const sent = ref(false)
const submitting = ref(false)
const error = ref<string | null>(null)

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const CONTACTS = {
  email: 'mfelini7@gmail.com',
  github: 'https://github.com/M4teus2020',
  githubLabel: 'github.com/M4teus2020',
  linkedin: 'https://www.linkedin.com/in/mateus-felini-dev',
  linkedinLabel: 'linkedin.com/in/mateus-felini-dev',
}

async function handleSubmit() {
  submitting.value = true
  error.value = null

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        from_name: formData.value.name,
        email: formData.value.email,
        subject: `[Portfolio] Mensagem de ${formData.value.name}`,
        message: formData.value.message,
      }),
    })

    if (!response.ok) {
      throw new Error('Falha ao enviar. Tente pelo email direto.')
    }

    sent.value = true
  } catch (err) {
    error.value = 'Falha ao enviar. Tente pelo email direto.'
  } finally {
    submitting.value = false
  }
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
          v-model="formData.name"
          type="text"
          class="va-input"
          :placeholder="t.contact.placeholderName"
          required
          :disabled="submitting"
        />
      </label>
      <label class="block">
        <div class="text-dim text-[11px] mb-1">--{{ t.contact.email.toLowerCase().replace('-', '') }}</div>
        <input
          v-model="formData.email"
          type="email"
          class="va-input"
          :placeholder="t.contact.placeholderEmail"
          required
          :disabled="submitting"
        />
      </label>
      <label class="block">
        <div class="text-dim text-[11px] mb-1">--{{ t.contact.msg.toLowerCase() }}</div>
        <textarea
          v-model="formData.message"
          rows="4"
          class="va-input resize-none"
          :placeholder="t.contact.placeholderMsg"
          required
          :disabled="submitting"
        />
      </label>
      <button type="submit" class="va-btn justify-self-start" :disabled="submitting">
        → {{ submitting ? 'Enviando...' : t.contact.send }}
      </button>
      <div v-if="error" class="text-red-500 text-[13px]">✕ {{ error }}</div>
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
