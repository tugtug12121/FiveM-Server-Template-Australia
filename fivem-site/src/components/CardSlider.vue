<template>
  <section class="card-slider">
    <h2 class="section-title">{{ title }}</h2>

    <div
      class="slider-track"
      ref="track"
      @mousedown="startDrag"
      @mousemove="drag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart.passive="startDrag"
      @touchmove.prevent="drag"
      @touchend="endDrag"
    >
      <div
        class="slider-card glass-card"
        v-for="item in items"
        :key="item.title"
        :class="{ 'hover-lift': hoverEnabled }"
      >
        <div class="slider-img" :style="{ backgroundImage: `url(${item.image})` }"></div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue"

const props = defineProps<{
  title: string
  items: { title: string; text: string; image: string }[]
}>()

const track = ref<HTMLElement | null>(null)

let isDown = false
let startX = 0
let scrollLeft = 0
let velocity = 0
let lastX = 0
let momentumID: number | null = null
let dragStarted = false
const dragThreshold = 5
const hoverEnabled = ref(true)

/* ============================================================
   START DRAG
   ============================================================ */
function startDrag(e: MouseEvent | TouchEvent) {
  if (!track.value) return

  const pageX =
    "touches" in e ? (e.touches.length === 1 ? e.touches[0].pageX : null) : e.pageX

  if (pageX === null) return

  isDown = true
  dragStarted = false
  hoverEnabled.value = false

  startX = pageX - track.value.offsetLeft
  scrollLeft = track.value.scrollLeft
  lastX = pageX

  if (momentumID) cancelAnimationFrame(momentumID)
}

/* ============================================================
   DRAG
   ============================================================ */
function drag(e: MouseEvent | TouchEvent) {
  if (!isDown || !track.value) return

  const pageX =
    "touches" in e ? (e.touches.length === 1 ? e.touches[0].pageX : null) : e.pageX

  if (pageX === null) return

  const x = pageX - track.value.offsetLeft
  const walk = (x - startX) * 1.4

  // Prevent accidental clicks
  if (!dragStarted && Math.abs(pageX - lastX) > dragThreshold) {
    dragStarted = true
  }

  track.value.scrollLeft = scrollLeft - walk

  velocity = pageX - lastX
  lastX = pageX
}

/* ============================================================
   END DRAG + MOMENTUM
   ============================================================ */
function endDrag() {
  if (!isDown) return
  isDown = false

  momentum()
  setTimeout(() => (hoverEnabled.value = true), 150)
}

function momentum() {
  if (!track.value) return

  track.value.scrollLeft -= velocity
  velocity *= 0.92

  // Bounce at edges
  const maxScroll = track.value.scrollWidth - track.value.clientWidth

  if (track.value.scrollLeft <= 0 || track.value.scrollLeft >= maxScroll) {
    velocity *= -0.35
  }

  if (Math.abs(velocity) > 0.5) {
    momentumID = requestAnimationFrame(momentum)
  }
}

/* ============================================================
   CLEANUP
   ============================================================ */
onUnmounted(() => {
  if (momentumID) cancelAnimationFrame(momentumID)
})
</script>
