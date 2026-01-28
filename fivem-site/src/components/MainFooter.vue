<template>
  <footer class="footer">
    <div class="footer-inner">

      <!-- LEFT -->
      <div class="footer-left">
        <p class="brand">
          © {{ currentYear }} {{ serverName }}
        </p>
        <p class="legal">
          Not affiliated with Rockstar Games, Take‑Two Interactive or FiveM.
        </p>
        <p class="made">
          Operated as an independent Australian roleplay community.
        </p>
      </div>

      <!-- AUTO-DETECTED FOOTER LINKS -->
      <div class="footer-links" v-if="footerLinks.length">
        <RouterLink
          v-for="link in footerLinks"
          :key="link.path"
          :to="link.path"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <!-- SOCIALS -->
      <div class="footer-socials">
        <a v-for="s in socials" :key="s.label" :href="s.url" target="_blank" rel="noopener noreferrer">
          {{ s.label }}
        </a>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

const currentYear = new Date().getFullYear()
const serverName = "YourFiveMServer"

const socials = ref([
  { label: "Discord", url: "https://discord.gg/yourserver" },
  { label: "YouTube", url: "https://youtube.com" },
  { label: "TikTok", url: "https://tiktok.com" }
])

const router = useRouter()

// Only routes with meta.showInFooter === true will appear
const footerLinks = computed(() =>
  router
    .getRoutes()
    .filter(r => r.meta?.showInFooter && r.path && !r.path.includes(":"))
    .map(r => ({
      path: r.path,
      label: (r.meta?.footerLabel as string) || String(r.name) || r.path
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
)
</script>

<style scoped>
.footer {
  margin-top: 4rem;
  padding: 2.5rem 2rem;
  background: rgba(5, 6, 10, 0.9);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #c5c5c5;
}

.footer-inner {
  max-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.2fr auto 1fr;
  align-items: center;
  gap: 1.5rem;
}

.brand {
  font-weight: 700;
  color: #e0e6ff;
  font-size: 1.05rem;
}

.legal,
.made {
  font-size: 0.85rem;
  opacity: 0.8;
}

/* Links */
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: center;
}

.footer-links a {
  color: #c5d2ff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: 0.2s;
}

.footer-links a:hover {
  color: #4f8cff;
}

/* Socials */
.footer-socials {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: right;
}

.footer-socials a {
  color: #c5d2ff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: 0.2s;
}

.footer-socials a:hover {
  color: #4f8cff;
}

/* Mobile */
@media (max-width: 800px) {
  .footer-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-links,
  .footer-socials {
    text-align: center;
  }
}
</style>
