<template>
  <div v-if="visible" class="geo-banner">
    <h3 class="geo-title">
      Suspicious Connection Detected
    </h3>

    <ul class="geo-list">
      <li v-for="r in reasons" :key="r">{{ r }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  reasons: string[]
}>()
</script>

<style scoped>
.geo-banner {
  padding: 1.4rem;
  margin: 1.5rem 0;
  border-radius: 14px;
  background: rgba(255, 60, 60, 0.12);
  border: 1px solid rgba(255, 60, 60, 0.45);
  backdrop-filter: blur(14px);
  color: #ff6b6b;
  box-shadow: 0 0 25px rgba(255, 60, 60, 0.45);
  animation: fadeIn 0.4s ease;
}

.geo-title {
  margin-bottom: 0.6rem;
  font-size: 1.2rem;
  font-weight: 700;
}

.geo-list {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.95rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
