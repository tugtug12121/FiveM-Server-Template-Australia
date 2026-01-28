<template>
  <!-- HERO SECTION -->
  <section class="hero" ref="heroRef" @mousemove="handleParallax">
    <div class="hero-bg-layer"></div>
    <div class="hero-particles"></div>

    <div class="hero-inner" :class="{ visible: heroVisible }">
      <h1 class="hero-title">
        <span class="gradient-text">{{ typedTitle }}</span>
      </h1>

      <p class="hero-subtitle">
        Serious RP · Custom scripts · Active staff · 24/7 uptime
      </p>

      <div class="hero-actions">
        <a href="https://discord.gg/YOURINVITE" target="_blank" class="btn primary">
          Join Discord
        </a>
        <button class="btn ghost" @click="scrollToConnect">How to connect</button>
      </div>

      <div class="scroll-indicator">▼</div>
    </div>
  </section>

  <!-- NEON BANNER -->
  <NeonGlassBanner
    title="Why players choose us"
    subtitle="A cinematic, immersive roleplay experience"
  />

  <!-- FEATURE GRID -->
  <section class="features" ref="featuresRef">
    <div class="feature-grid" :class="{ visible: featuresVisible }">
      <div class="feature-card slide-bounce">
        <h3>⚙️ Custom Scripts</h3>
        <p>Unique systems built in‑house for immersive RP.</p>
      </div>

      <div class="feature-card slide-bounce">
        <h3>👮 Active Staff</h3>
        <p>Friendly, fair, and available around the clock.</p>
      </div>

      <div class="feature-card slide-bounce">
        <h3>🚗 Optimised Performance</h3>
        <p>Low latency, stable FPS, and zero lag spikes.</p>
      </div>

      <div class="feature-card slide-bounce">
        <h3>🌍 Serious Roleplay</h3>
        <p>A mature community with high standards.</p>
      </div>
    </div>
  </section>

  <!-- NEON BANNER -->
  <NeonGlassBanner title="Server Status" />

  <!-- SERVER STATUS -->
  <section class="status-section" ref="statusRef">
    <div class="status-card glass-card" :class="{ visible: statusVisible }">
      <div class="status-light online"></div>
      <p class="status-text">Online — 42 players</p>
    </div>
  </section>

  <!-- NEON BANNER -->
  <NeonGlassBanner
    title="In‑Game Showcase"
    subtitle="A glimpse into the world"
  />

  <!-- SHOWCASE GRID -->
  <section class="showcase" ref="showcaseRef">
    <div class="showcase-grid" :class="{ visible: showcaseVisible }">
      <div class="showcase-card slide-bounce">
        <div class="showcase-img vehicles"></div>
        <h3>Custom Vehicles</h3>
      </div>

      <div class="showcase-card slide-bounce">
        <div class="showcase-img jobs"></div>
        <h3>Unique Jobs</h3>
      </div>

      <div class="showcase-card slide-bounce">
        <div class="showcase-img interiors"></div>
        <h3>Mapped Interiors</h3>
      </div>
    </div>
  </section>

  <!-- STEAM/ROCKSTAR SLIDER -->
  <CardSlider
    title="Featured Content"
    :items="sliderItems"
  />

  <!-- NEON BANNER -->
  <NeonGlassBanner title="Connect in seconds" />

  <!-- CONNECT SECTION -->
  <section id="connect" class="connect" ref="connectRef">
    <div class="connect-card glass-card" :class="{ visible: connectVisible }">
      <h2>Direct Connect</h2>
      <p>Open FiveM and paste this:</p>

      <div class="connect-row">
        <code>connect your.server.ip:30120</code>
        <button class="copy-btn" @click="copyIP">Copy</button>
      </div>
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="cta-banner neon-cta">
    <h2>Ready to start your story?</h2>
    <a href="https://discord.gg/YOURINVITE" target="_blank" class="btn primary large">
      Join the Community
    </a>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import gsap from "gsap"

// Components
import NeonGlassBanner from "../components/NeonGlassBanner.vue"
import CardSlider from "../components/CardSlider.vue"

// Static slider items
const sliderItems = [
  { title: "Custom Vehicles", text: "High‑quality imports", image: "/img/vehicles.jpg" },
  { title: "Unique Jobs", text: "Deep progression paths", image: "/img/jobs.jpg" },
  { title: "Mapped Interiors", text: "Immersive environments", image: "/img/interiors.jpg" },
  { title: "Heists", text: "Multi‑stage criminal missions", image: "/img/heists.jpg" },
  { title: "EMS System", text: "Advanced medical gameplay", image: "/img/ems.jpg" }
]

// Refs
const heroRef = ref<HTMLElement | null>(null)
const featuresRef = ref<HTMLElement | null>(null)
const statusRef = ref<HTMLElement | null>(null)
const showcaseRef = ref<HTMLElement | null>(null)
const connectRef = ref<HTMLElement | null>(null)

// Visibility states
const heroVisible = ref(false)
const featuresVisible = ref(false)
const statusVisible = ref(false)
const showcaseVisible = ref(false)
const connectVisible = ref(false)

// Typewriter
const fullTitle = "YourFiveMServer"
const typedTitle = ref("")
let typeIndex = 0

function typeWriter() {
  if (typeIndex < fullTitle.length) {
    typedTitle.value += fullTitle[typeIndex]
    typeIndex++
    setTimeout(typeWriter, 70)
  }
}

// Parallax
function handleParallax(e: MouseEvent) {
  const layer = document.querySelector(".hero-bg-layer") as HTMLElement
  if (!layer) return

  const x = (e.clientX / window.innerWidth - 0.5) * 20
  const y = (e.clientY / window.innerHeight - 0.5) * 20

  layer.style.transform = `translate(${x}px, ${y}px)`
}

// Scroll
function scrollToConnect() {
  document.querySelector("#connect")?.scrollIntoView({ behavior: "smooth" })
}

// Copy
function copyIP() {
  navigator.clipboard.writeText("connect your.server.ip:30120")
}

// Reveal observer
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === heroRef.value && entry.isIntersecting) {
          heroVisible.value = true
          typeWriter()
        }
        if (entry.target === featuresRef.value && entry.isIntersecting) {
          featuresVisible.value = true
        }
        if (entry.target === statusRef.value && entry.isIntersecting) {
          statusVisible.value = true
        }
        if (entry.target === showcaseRef.value && entry.isIntersecting) {
          showcaseVisible.value = true
        }
        if (entry.target === connectRef.value && entry.isIntersecting) {
          connectVisible.value = true
        }
      })
    },
    { threshold: 0.2 }
  )

  ;[heroRef, featuresRef, statusRef, showcaseRef, connectRef].forEach((r) => {
    if (r.value) observer.observe(r.value)
  })
})
</script>
