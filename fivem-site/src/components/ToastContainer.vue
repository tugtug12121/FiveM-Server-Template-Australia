<template>
  <div class="toast-container">
    <TransitionGroup name="toast" tag="div">
      <div
        v-for="t in toastStore.toasts"
        :key="t.id"
        class="toast"
        :class="t.type"
        @click="toastStore.remove(t.id)"
      >
        {{ t.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { toastStore } from "../stores/toast"
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}

/* Base toast */
.toast {
  padding: 0.9rem 1.2rem;
  border-radius: 8px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  min-width: 220px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  backdrop-filter: blur(6px);
  transition: 0.25s ease;
}

/* Types */
.toast.success { background: rgba(0, 180, 90, 0.85); }
.toast.error   { background: rgba(220, 50, 50, 0.85); }
.toast.warning { background: rgba(255, 170, 0, 0.85); }
.toast.info    { background: rgba(80, 140, 255, 0.85); }

/* Animations */
.toast-enter-from {
  opacity: 0;
  transform: translateY(-15px) scale(0.95);
}
.toast-enter-active {
  transition: all 0.25s ease;
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.95);
}
.toast-leave-active {
  transition: all 0.25s ease;
}
</style>
