// src/stores/toast.ts
import { reactive } from "vue"

export type ToastType = "success" | "error" | "warning" | "info"

export interface Toast {
  id: number
  message: string
  type: ToastType
  duration?: number
}

export const toastStore = reactive({
  toasts: [] as Toast[],

  show(message: string, type: ToastType = "info", duration = 3500) {
    const id = Date.now()
    this.toasts.push({ id, message, type, duration })

    setTimeout(() => {
      this.remove(id)
    }, duration)
  },

  remove(id: number) {
    const idx = this.toasts.findIndex(t => t.id === id)
    if (idx !== -1) {
      this.toasts.splice(idx, 1)
    }
  }
})
