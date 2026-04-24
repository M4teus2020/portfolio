<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { useLocale } from '@/i18n/useT'
import { useT } from '@/i18n/useT'

const { theme, accent, toggleTheme, setAccent } = useTheme()
const { locale, toggle: toggleLocale } = useLocale()
const t = useT()

const accentColors: Record<string, { dark: string; light: string }> = {
  green: { dark: '#7ee787', light: '#2a7a35' },
  amber: { dark: '#ffb86b', light: '#c96b1b' },
  cyan:  { dark: '#7ed9e7', light: '#1b7a8f' },
  pink:  { dark: '#ff9ec7', light: '#b0376f' },
}
</script>

<template>
  <header
    class="sticky top-0 z-20 backdrop-blur-sm border-b border-dashed border-line flex items-center gap-2.5 px-5 py-2.5 text-[12px] font-mono"
    style="background: var(--bg-bar);"
  >
    <!-- macOS traffic lights -->
    <span class="text-t-red text-[10px] leading-none">●</span>
    <span class="text-t-amber text-[10px] leading-none">●</span>
    <span class="text-accent text-[10px] leading-none">●</span>
    <span class="ml-2.5 text-dim hidden sm:inline">mateus@felini: ~/portfolio</span>

    <div class="flex-1" />

    <!-- Nav links -->
    <nav class="hidden lg:flex gap-5 mr-4">
      <a
        v-for="(label, key) in t.nav"
        :key="key"
        :href="`#${key}`"
        class="text-dim2 hover:text-fg transition-colors no-underline text-[11px] uppercase tracking-widest"
      >{{ label }}</a>
    </nav>

    <!-- Accent swatches -->
    <div class="flex gap-1 mr-1">
      <button
        v-for="(colors, key) in accentColors"
        :key="key"
        class="w-4 h-4 border border-line cursor-pointer p-0 transition-all"
        :class="accent === key ? 'border-fg' : ''"
        :style="{
          background: colors[theme],
          boxShadow: accent === key ? '0 0 0 1px var(--accent)' : 'none',
        }"
        :title="key"
        @click="setAccent(key as any)"
      />
    </div>

    <!-- Theme toggle -->
    <button
      class="w-7 h-7 bg-transparent border border-line text-fg text-[12px] flex items-center justify-center cursor-pointer hover:border-accent hover:text-accent transition-all font-mono"
      :title="theme === 'dark' ? 'Light mode' : 'Dark mode'"
      @click="toggleTheme"
    >
      {{ theme === 'dark' ? '☀' : '☾' }}
    </button>

    <!-- Language toggle -->
    <button
      class="bg-transparent border border-line text-fg font-mono text-[11px] px-2.5 h-7 cursor-pointer hover:border-accent hover:text-accent transition-all uppercase tracking-wider"
      @click="toggleLocale"
    >
      {{ locale === 'pt' ? '» EN' : '» PT' }}
    </button>
  </header>
</template>
