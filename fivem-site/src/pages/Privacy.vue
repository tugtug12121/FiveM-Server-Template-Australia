<template>
  <section class="privacy">
    <!-- SIMPLE TOC CARD -->
    <div class="toc-card">
      <h3>Contents</h3>
      <ul>
        <li
          v-for="section in sections"
          :key="section.id"
        >
          <button type="button" @click="scrollTo(section.id)">
            {{ section.title }}
          </button>
        </li>
      </ul>
    </div>

    <header class="hero">
      <h1>Privacy Policy</h1>
      <p>
        This Privacy Policy outlines how we collect, use, store and protect personal information
        in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
      </p>
    </header>

    <!-- POLICY SECTIONS -->
    <div
      v-for="section in sections"
      :key="section.id"
      :id="section.id"
      class="policy-section"
    >
      <h2 @click="toggleSection(section.id)">
        {{ section.title }}
        <span class="arrow" :class="{ open: openSections.includes(section.id) }">▾</span>
      </h2>

      <transition name="fade">
        <div v-if="openSections.includes(section.id)">
          <p v-if="section.text">{{ section.text }}</p>

          <ul v-if="section.list">
            <li v-for="item in section.list" :key="item">{{ item }}</li>
          </ul>
        </div>
      </transition>
    </div>

    <footer class="footer-note">
      <p>Last updated: {{ lastUpdated }}</p>
      <p>We are committed to protecting you and safeguarding the personal and social information of everyone in our community. This policy explains how your information is managed whenever you interact with our website, in‑game features, communication platforms or any connected services.</p>
      <div class="caution-banner">
  <strong>Caution:</strong> By reading this, you agree to our Privacy Policy.
</div>

    </footer>

    <button v-if="showTop" class="back-top" @click="scrollToTop">
      ↑ Top
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const lastUpdated = new Date().toLocaleDateString("en-AU", {
  year: "numeric",
  month: "long",
})

const sections = [
  {
    id: "purpose",
    title: "1. Purpose of This Policy",
    text:
      "We are committed to safeguarding the privacy of all players, visitors and community members. " +
      "This policy explains how your information is handled when interacting with our website, game server and associated services.",
  },
  {
    id: "collection",
    title: "2. Information We Collect",
    list: [
      "Account Information: Steam identifiers, Discord IDs, FiveM identifiers.",
      "Contact Information: Email addresses or usernames provided voluntarily.",
      "Gameplay Data: Character details, in‑game actions, logs and interactions.",
      "Technical Data: IP addresses, device information, browser type and session logs.",
      "Support Requests: Information submitted through tickets or appeals.",
    ],
  },
  {
    id: "usage",
    title: "3. How We Use Your Information",
    list: [
      "To operate and maintain the game server and website.",
      "To enforce server rules, investigate incidents and ensure community safety.",
      "To provide support, respond to enquiries and manage player accounts.",
      "To improve gameplay systems, performance and user experience.",
      "To comply with legal obligations or respond to lawful requests.",
    ],
  },
  {
    id: "disclosure",
    title: "4. Disclosure of Personal Information",
    list: [
      "Required by Australian law or regulatory authorities.",
      "Necessary to investigate breaches, misconduct or security incidents.",
      "Authorized by the individual or their legal representative.",
      "Required for technical support or service maintenance by trusted providers.",
    ],
  },
  {
    id: "security",
    title: "5. Data Storage & Security",
    list: [
      "Secure server infrastructure and access controls.",
      "Regular monitoring of logs and system activity.",
      "Restricted access to sensitive information.",
      "Encryption and secure communication protocols where appropriate.",
    ],
  },
  {
    id: "access",
    title: "6. Access to Your Information",
    text:
      "You may request access to personal information we hold about you. " +
      "We will take reasonable steps to provide access unless restricted by law or security requirements.",
  },
  {
    id: "retention",
    title: "7. Data Retention",
    text:
      "Personal information is retained only for as long as necessary to fulfil operational, legal or security purposes. " +
      "Gameplay logs and administrative records may be retained for extended periods to ensure community safety and compliance.",
  },
  {
    id: "cookies",
    title: "8. Cookies & Website Analytics",
    text:
      "Our website may use cookies or analytics tools to improve performance and user experience. " +
      "These tools may collect anonymous usage data such as page views, device type and session duration.",
  },
  {
    id: "thirdParty",
    title: "9. Third‑Party Services",
    text:
      "We may integrate with third‑party platforms such as Discord, Steam or FiveM. " +
      "These services operate under their own privacy policies, and we encourage users to review them independently.",
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    text:
      "This Privacy Policy may be updated periodically to reflect changes in law, technology or operational requirements. " +
      "Continued use of our services constitutes acceptance of any updated terms.",
  },
  {
    id: "contact",
    title: "11. Contact Us",
    text:
      "For privacy enquiries, access requests or concerns, please contact our administration team via Discord or the support portal.",
  },
]

const openSections = ref(sections.map((s) => s.id))
const toggleSection = (id: string) => {
  if (openSections.value.includes(id)) {
    openSections.value = openSections.value.filter((x) => x !== id)
  } else {
    openSections.value.push(id)
  }
}

const showTop = ref(false)

const handleScroll = () => {
  showTop.value = window.scrollY > 300
}

onMounted(() => window.addEventListener("scroll", handleScroll))
onUnmounted(() => window.removeEventListener("scroll", handleScroll))

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
</script>

<style scoped>
.privacy {
  max-width: 1100px;
  margin: auto;
  padding: 2rem 1.5rem;
  color: #fff;
}

/* SIMPLE TOC CARD */
.toc-card {
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.04);
  padding: 1rem 1.2rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.toc-card h3 {
  margin-bottom: 0.6rem;
}

.toc-card ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.toc-card button {
  background: rgba(255, 255, 255, 0.06);
  border: none;
  color: #c5d2ff;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.85rem;
}

.toc-card button:hover {
  background: #4f8cff;
  color: #fff;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.hero p {
  opacity: 0.8;
}

.policy-section {
  margin-bottom: 2.5rem;
  background: rgba(255, 255, 255, 0.04);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(6px);
  transition: 0.2s;
}

.policy-section:hover {
  border-color: #4f8cff;
}

.policy-section h2 {
  margin-bottom: 1rem;
  color: #4f8cff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.policy-section ul {
  list-style: none;
  padding: 0;
}

.policy-section li {
  margin-bottom: 0.6rem;
  opacity: 0.9;
}

.arrow {
  transition: 0.2s;
}

.arrow.open {
  transform: rotate(180deg);
}

.footer-note {
  text-align: center;
  margin-top: 3rem;
  opacity: 0.7;
}

/* BACK TO TOP */
.back-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #4f8cff;
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  z-index: 50;
}

/* TRANSITIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
