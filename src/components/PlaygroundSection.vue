<script setup lang="ts">
import { ref, computed } from 'vue'
import { useT } from '@/i18n/useT'
import SectionShell from './ui/SectionShell.vue'
import AsciiHeader from './ui/AsciiHeader.vue'

const t = useT()
const activeDemo = ref(0)

/* ── Demo 1: FX Converter ───────────────────────── */
interface Currency { code: string; ratePerUSD: number }
const currencies: Currency[] = [
  { code: 'USD', ratePerUSD: 1 },
  { code: 'BRL', ratePerUSD: 5.12 },
  { code: 'EUR', ratePerUSD: 0.92 },
  { code: 'GBP', ratePerUSD: 0.79 },
  { code: 'ARS', ratePerUSD: 890 },
  { code: 'CAD', ratePerUSD: 1.37 },
]
const fxAmount = ref(100)
const fxFrom = ref('USD')
const fxTo = ref('BRL')
const fxResult = computed(() => {
  const from = currencies.find((c) => c.code === fxFrom.value)!
  const to = currencies.find((c) => c.code === fxTo.value)!
  return ((fxAmount.value / from.ratePerUSD) * to.ratePerUSD).toFixed(2)
})

/* ── Demo 2: Slug Generator ─────────────────────── */
const slugInput = ref('Meu primeiro post sobre Laravel')
const slug = computed(() =>
  slugInput.value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-'),
)

/* ── Demo 3: SQL → Eloquent ─────────────────────── */
const sqlInput = ref('SELECT * FROM users WHERE active = 1')
const eloquent = computed(() => {
  const fromMatch = sqlInput.value.match(/FROM\s+(\w+)/i)
  const whereMatch = sqlInput.value.match(/WHERE\s+(\w+)\s*=\s*([^\s;]+)/i)
  const orderMatch = sqlInput.value.match(/ORDER BY\s+(\w+)(?:\s+(ASC|DESC))?/i)
  const limitMatch = sqlInput.value.match(/LIMIT\s+(\d+)/i)

  if (!fromMatch?.[1]) return '// type a SELECT…'

  const table = fromMatch[1]
  const model = table.charAt(0).toUpperCase() + table.slice(1).replace(/s$/, '')
  let q = `${model}::`
  if (whereMatch) q += `where('${whereMatch[1]}', ${whereMatch[2]})\n    ->`
  if (orderMatch) {
    const dir = orderMatch[2]?.toLowerCase() === 'desc' ? 'desc' : 'asc'
    q += `orderBy('${orderMatch[1]}', '${dir}')\n    ->`
  }
  if (limitMatch) q += `limit(${limitMatch[1]})\n    ->`
  q += 'get();'
  return q
})
</script>

<template>
  <SectionShell id="play" cmd="./run-demo" lazy>
    <AsciiHeader :text="`# ${t.play.kicker.toUpperCase()}`" />
    <h2 class="text-[22px] mt-[18px] mb-1.5 text-fg font-semibold">{{ t.play.title }}</h2>
    <p class="text-dim2 text-[12px] mb-3.5">{{ t.play.sub }}</p>

    <!-- Tab bar -->
    <div class="flex gap-1.5 mb-3.5 flex-wrap">
      <button
        v-for="(item, i) in t.play.items"
        :key="i"
        class="va-tab"
        :class="{ active: activeDemo === i }"
        @click="activeDemo = i"
      >
        0{{ i + 1 }} · {{ item.t }}
      </button>
    </div>

    <!-- Demo panel -->
    <div class="border border-line bg-bg2 p-4">
      <div class="text-t-amber text-[11px] mb-2 uppercase tracking-[0.1em]">
        › {{ t.play.items[activeDemo]?.t }}
      </div>
      <div class="text-dim2 text-[11px] mb-2.5">{{ t.play.items[activeDemo]?.d }}</div>

      <!-- FX Converter -->
      <template v-if="activeDemo === 0">
        <div class="grid gap-2.5" style="grid-template-columns: 1fr auto 1fr auto 1fr; align-items: end;">
          <label class="block">
            <div class="text-[11px] text-dim mb-1">Amount</div>
            <input v-model.number="fxAmount" type="number" min="0" class="va-input" />
          </label>
          <div class="text-t-amber text-[12px] pb-2.5 px-1">·</div>
          <label class="block">
            <div class="text-[11px] text-dim mb-1">From</div>
            <select v-model="fxFrom" class="va-input">
              <option v-for="c in currencies" :key="c.code" :value="c.code">{{ c.code }}</option>
            </select>
          </label>
          <div class="text-accent text-[18px] pb-2 px-1">→</div>
          <label class="block">
            <div class="text-[11px] text-dim mb-1">To</div>
            <select v-model="fxTo" class="va-input">
              <option v-for="c in currencies" :key="c.code" :value="c.code">{{ c.code }}</option>
            </select>
          </label>
        </div>
        <div
          class="mt-3 font-mono text-accent text-[16px] font-semibold px-2.5 py-2 bg-bg border border-line"
        >
          {{ fxFrom }} {{ fxAmount }} → {{ fxTo }} {{ fxResult }}
        </div>
        <div class="mt-2 text-[11px] text-dim"># rates: hardcoded for demo · not live</div>
      </template>

      <!-- Slug Generator -->
      <template v-else-if="activeDemo === 1">
        <input v-model="slugInput" type="text" class="va-input" />
        <div class="mt-2.5 text-[11px] text-dim">{{ t.play.outputLabel }}:</div>
        <div class="font-mono text-accent text-[14px] mt-1 px-2.5 py-2 bg-bg border border-line break-all">
          /{{ slug || '—' }}
        </div>
      </template>

      <!-- SQL → Eloquent -->
      <template v-else>
        <textarea v-model="sqlInput" rows="2" class="va-input font-mono text-[12px]" />
        <div class="mt-2.5 text-[11px] text-dim">{{ t.play.outputLabel }}:</div>
        <pre class="font-mono text-accent text-[13px] mt-1 px-2.5 py-2 bg-bg border border-line m-0 overflow-x-auto whitespace-pre-wrap">{{ eloquent }}</pre>
      </template>
    </div>
  </SectionShell>
</template>
