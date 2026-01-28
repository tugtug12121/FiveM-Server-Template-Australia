<template>
  <div class="notfound">
    <div class="glow"></div>

    <h1 class="code">404</h1>

    <p class="msg">
      {{ randomMessage }}
    </p>

    <p class="attempt">
      You tried to visit:
      <span class="path">{{ attemptedPath }}</span>
    </p>

    <div v-if="suggestions.length" class="suggestions">
      <h3>Did you mean:</h3>
      <ul>
        <li v-for="s in suggestions" :key="s">
          <RouterLink :to="s">{{ s }}</RouterLink>
        </li>
      </ul>
    </div>

    <div class="actions">
      <RouterLink to="/" class="btn">Return Home</RouterLink>
      <a :href="reportUrl" target="_blank" class="btn ghost">Report Issue</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'

// Get attempted path
const route = useRoute()
const attemptedPath = route.fullPath

// Random fallback messages
const messages = [
  "The page you’re looking for drifted into the void.",
  "Looks like this route took a wrong turn.",
  "This page escaped police custody.",
  "Nothing to see here… move along.",
  "You’ve reached a dead end, officer.",
  "This location doesn’t exist in this universe.",
  "Dispatch: We’ve lost visual on that page."
]

const randomMessage = messages[Math.floor(Math.random() * messages.length)]

// Suggest closest matching pages
const knownRoutes = [
  "/", "/server-info", "/rules", "/how-to-join",
  "/staff", "/donate", "/contact"
]

function getSuggestions(input: string) {
  const cleaned = input.toLowerCase().replace(/[^a-z0-9-]/g, "")
  return knownRoutes.filter(r => r.includes(cleaned)).slice(0, 3)
}

const suggestions = getSuggestions(attemptedPath)

// Report issue link (Discord, GitHub, etc.)
const reportUrl = "https://discord.gg/yourserver"
</script>

<style scoped>
.notfound {
  position: relative;
  text-align: center;
  padding: 120px 20px;
  color: #fff;
}

.code {
  font-size: 8rem;
  font-weight: 800;
  letter-spacing: -5px;
  margin: 0;
  animation: float 3s ease-in-out infinite;
}

.msg {
  font-size: 1.3rem;
  opacity: 0.85;
  margin-bottom: 1.5rem;
}

.attempt {
  opacity: 0.7;
  margin-bottom: 1.5rem;
}

.path {
  font-weight: 600;
  color: #4f8cff;
}

.suggestions {
  margin-bottom: 2rem;
}

.suggestions ul {
  list-style: none;
  padding: 0;
}

.suggestions li {
  margin: 0.4rem 0;
}

.suggestions a {
  color: #6fa3ff;
  text-decoration: none;
}

.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.6rem;
  border-radius: 999px;
  background: #4f8cff;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: 0.2s;
}

.btn:hover {
  background: #6fa3ff;
}

.btn.ghost {
  background: transparent;
  border: 1px solid #4f8cff;
}

.btn.ghost:hover {
  background: rgba(79, 140, 255, 0.15);
}

.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(79,140,255,0.4), transparent 70%);
  transform: translate(-50%, -50%);
  filter: blur(80px);
  z-index: -1;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}
</style>
