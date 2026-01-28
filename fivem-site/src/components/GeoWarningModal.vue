<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal neon-glass">
      <h2 class="modal-title">Suspicious Connection</h2>

      <p class="modal-sub">
        Your network appears to be using a VPN, proxy, hosting provider, or spoofed connection.
      </p>

      <ul class="modal-reasons">
        <li v-for="r in reasons" :key="r">{{ r }}</li>
      </ul>

      <button class="modal-btn" @click="close">I Understand</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  reasons: string[]
}>()

const emit = defineEmits(["close"])

function close() {
  emit("close")
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  animation: fadeIn 0.3s ease;
}

.modal {
  width: min(90%, 420px);
  padding: 2rem;
  border-radius: 16px;
  background: rgba(15, 18, 30, 0.55);
  border: 1px solid rgba(255, 60, 60, 0.35);
  box-shadow: 0 0 35px rgba(255, 60, 60, 0.45);
  animation: popIn 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.modal-title {
  font-size: 1.6rem;
  color: #ff6b6b;
  margin-bottom: 0.5rem;
}

.modal-sub {
  color: #ffb3b3;
  margin-bottom: 1rem;
}

.modal-reasons {
  margin: 0 0 1.5rem 1rem;
  padding: 0;
  color: #ffd6d6;
}

.modal-btn {
  width: 100%;
  padding: 0.8rem;
  border-radius: 10px;
  background: rgba(255, 60, 60, 0.25);
  border: 1px solid rgba(255, 60, 60, 0.45);
  color: #ffb3b3;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
}

.modal-btn:hover {
  background: rgba(255, 60, 60, 0.35);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}
</style>
