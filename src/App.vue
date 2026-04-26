<script setup lang="ts">
import AppTopBar from '@/components/AppTopBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import AiSection from '@/components/AiSection.vue'
import StackSection from '@/components/StackSection.vue'
import TimelineSection from '@/components/TimelineSection.vue'
import PlaygroundSection from '@/components/PlaygroundSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import BootScreen from '@/components/BootScreen.vue'
</script>

<template>
  <div class="min-h-screen bg-bg text-fg font-mono">
    <BootScreen />
    <AppTopBar />

    <main class="max-w-[760px] mx-auto">
      <HeroSection />
      <AboutSection />
      <AiSection />
      <StackSection />
      <TimelineSection />
      <PlaygroundSection />
      <ContactSection />
    </main>

    <div class="max-w-[760px] mx-auto">
      <AppFooter />
    </div>
  </div>
</template>
