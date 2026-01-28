<template>
  <section class="neon-banner">
    <div class="neon-banner-inner">
      <h2 class="neon-banner-title">{{ title }}</h2>
      <p class="neon-banner-subtitle" v-if="subtitle">{{ subtitle }}</p>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>
