<template>
  <section class="server-info">
    <header class="hero">
      <h1>Server Information</h1>
      <p>Your gateway to the ultimate FiveM experience.</p>
    </header>

    <div class="info-grid">
      <div class="card">
        <h2>Framework</h2>
        <p>{{ framework }}</p>
      </div>

      <div class="card">
        <h2>Uptime</h2>
        <p>24/7 Dedicated Hosting</p>
      </div>

      <div class="card">
        <h2>Players</h2>
        <p>{{ maxPlayers }} Slots</p>
      </div>

      <div class="card">
        <h2>Location</h2>
        <p>Australia / Low Ping</p>
      </div>
    </div>

    <section class="connect">
      <h2>How to Connect</h2>
      <p>Open FiveM → Press F8 → Paste the command below</p>

      <code>connect {{ serverIP }}</code>

      <RouterLink to="/how-to-join" class="btn">Full Join Guide</RouterLink>
    </section>

    <section class="features">
      <h2>Server Features</h2>

      <ul>
        <li v-for="feature in features" :key="feature">
          {{ feature }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
const serverIP = "your.server.ip:30120"
const framework = "QBCore" // or ESX, custom, etc.
const maxPlayers = 64

const features = [
  "Custom Jobs & Economy",
  "Optimised Scripts for Smooth Gameplay",
  "Active Staff & Fair Rules",
  "Realistic Vehicles & Handling",
  "Whitelist & Public Events",
  "Australian Hosting for Low Latency"
]
</script>

<style scoped>
.server-info {
  padding: 2rem 1.5rem;
  max-width: 1100px;
  margin: auto;
  color: #fff;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  animation: fadeIn 1s ease;
}

.hero p {
  opacity: 0.8;
  animation: fadeIn 1.4s ease;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  border-color: #4f8cff;
}

.connect {
  text-align: center;
  margin-bottom: 3rem;
}

code {
  display: inline-block;
  margin: 1rem 0;
  padding: 0.6rem 1rem;
  background: #11131f;
  border-radius: 6px;
  font-size: 1.1rem;
}

.btn {
  display: inline-block;
  margin-top: 1rem;
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

.features h2 {
  margin-bottom: 1rem;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.8rem 1rem;
  margin-bottom: 0.6rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
