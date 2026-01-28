import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import "./assets/style.css"


/* ---------------------------------------------------------
   CREATE APP
--------------------------------------------------------- */
const app = createApp(App)

/* ---------------------------------------------------------
   GLOBAL EVENT BUS (Typed + Safe)
--------------------------------------------------------- */
type EventCallback = (payload?: any) => void

interface EventBus {
  events: Map<string, Set<EventCallback>>
  on: (event: string, callback: EventCallback) => void
  emit: (event: string, payload?: any) => void
}

const eventBus: EventBus = {
  events: new Map(),

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    this.events.get(event)!.add(callback)
  },

  emit(event, payload) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach((cb) => cb(payload))
    }
  }
}

app.provide("eventBus", eventBus)

/* ---------------------------------------------------------
   GLOBAL ERROR HANDLING
--------------------------------------------------------- */
app.config.errorHandler = (err, instance, info) => {
  console.error("[Vue Error]", err)
  console.warn("[Component]", instance)
  console.warn("[Info]", info)
}

window.addEventListener("error", (event: ErrorEvent) => {
  console.error("[Window Error]", event.error)
})

window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
  console.error("[Unhandled Promise Rejection]", event.reason)
})

/* ---------------------------------------------------------
   ROUTER ERROR HANDLING
--------------------------------------------------------- */
router.onError((err) => {
  console.error("[Router Error]", err)
})

/* ---------------------------------------------------------
   USE ROUTER BEFORE MOUNT
--------------------------------------------------------- */
app.use(router as unknown as Parameters<typeof app.use>[0])

/* ---------------------------------------------------------
   SAFE MOUNT (Vue 6)
--------------------------------------------------------- */
router.isReady().then(() => {
  app.mount("#app")
  console.log("[Vue] App mounted successfully")

  /* ---------------------------------------------------------
     GLOBAL LISTENERS — SAFE AFTER MOUNT
  --------------------------------------------------------- */

  // Hotkeys
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
      eventBus.emit("hotkey:commandPalette")
      e.preventDefault()
    }
    if (e.key === "Escape") {
      eventBus.emit("hotkey:escape")
    }
  })

  // Network status
  window.addEventListener("online", () => eventBus.emit("network:online"))
  window.addEventListener("offline", () => eventBus.emit("network:offline"))

  // Accessibility: focus ring
  const handleFirstTab = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      document.body.classList.add("show-focus-outline")
      window.removeEventListener("keydown", handleFirstTab)
    }
  }
  window.addEventListener("keydown", handleFirstTab)
})

/* ---------------------------------------------------------
   HMR CLEANUP (Vite)
--------------------------------------------------------- */
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    console.log("[HMR] Cleaning up global listeners")
  })
}
