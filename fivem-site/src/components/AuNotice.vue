<template>
  <Transition name="au-notice-fade">
    <div
      v-if="visible"
      class="au-notice-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="au-notice-title"
      tabindex="-1"
      v-bind="$attrs"
    >
      <div class="au-notice" ref="cardRef">
        <h2 id="au-notice-title">Important Notice for Australian Users</h2>

        <p>
          Due to recent regulatory changes, young people in Australia may experience
          major changes in how they access online services after today.
        </p>

        <button class="btn primary" @click="dismiss">I Understand</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"

/* ---------------------------------------------------------
   Props + Emits (Vue 6 composability)
--------------------------------------------------------- */
const props = defineProps<{
  autoFocus?: boolean
}>()

const emit = defineEmits<{
  (e: "dismiss"): void
}>()

/* ---------------------------------------------------------
   State
--------------------------------------------------------- */
const visible = ref(false)
const cardRef = ref<HTMLElement | null>(null)

/* ---------------------------------------------------------
   Public API (parent can call noticeRef.show())
--------------------------------------------------------- */
function show() {
  visible.value = true

  // Lock body scroll
  document.body.style.overflow = "hidden"

  nextTick(() => {
    if (props.autoFocus !== false) {
      cardRef.value?.focus()
    }
  })
}

function dismiss() {
  visible.value = false
  document.body.style.overflow = ""
  localStorage.setItem("auNoticeDismissed", "true")
  emit("dismiss")
}

defineExpose({ show })

/* ---------------------------------------------------------
   Escape key to close
--------------------------------------------------------- */
function handleKey(e: KeyboardEvent) {
  if (e.key === "Escape" && visible.value) {
    dismiss()
  }
}

/* ---------------------------------------------------------
   Focus trap (basic, safe)
--------------------------------------------------------- */
function trapFocus(e: FocusEvent) {
  if (!visible.value) return
  if (!cardRef.value?.contains(e.target as Node)) {
    cardRef.value?.focus()
  }
}

/* ---------------------------------------------------------
   Lifecycle
--------------------------------------------------------- */
onMounted(() => {
  window.addEventListener("keydown", handleKey)
  window.addEventListener("focusin", trapFocus)
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKey)
  window.removeEventListener("focusin", trapFocus)
})
</script>
