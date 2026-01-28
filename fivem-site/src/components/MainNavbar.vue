<template>
  <nav class="nav" ref="navRef">

    <!-- TOP BAR -->
    <div class="nav-top">
      <div class="logo">YourFiveMServer</div>

      <!-- BURGER ICON -->
      <button class="burger" ref="burgerRef" @click="toggleMenu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <!-- NEON GLASS DROPDOWN -->
    <transition name="dropdown">
      <div
        v-if="menuOpen"
        class="dropdown-menu neon-glass"
        ref="menuRef"
      >
        <ul>
          <li v-for="route in navRoutes" :key="route.path">
            <RouterLink :to="route.path" @click="closeMenu">
              {{ route.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </transition>

  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useRouter, RouterLink } from "vue-router"

const router = useRouter()

const menuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)
const burgerRef = ref<HTMLElement | null>(null)
const navRef = ref<HTMLElement | null>(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

// Auto-detect routes
const navRoutes = computed(() =>
  router.getRoutes()
    .filter(r =>
      r.meta?.showInNav &&
      !r.path.includes(":") &&
      r.name !== "NotFound"
    )
    .map(r => ({
      path: r.path,
      label: r.meta?.navLabel || formatLabel(String(r.name))
    }))
)

function formatLabel(name: string) {
  return name.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
}

// CLICK OUTSIDE
function handleClickOutside(e: MouseEvent) {
  const menu = menuRef.value
  const burger = burgerRef.value
  const nav = navRef.value

  if (!menu || !burger || !nav) return

  const insideMenu = menu.contains(e.target as Node)
  const insideBurger = burger.contains(e.target as Node)
  const insideNav = nav.contains(e.target as Node)

  if (!insideMenu && !insideBurger && !insideNav) {
    menuOpen.value = false
  }
}

// ESC to close
function handleEsc(e: KeyboardEvent) {
  if (e.key === "Escape") menuOpen.value = false
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside)
  document.addEventListener("keydown", handleEsc)
})

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside)
  document.removeEventListener("keydown", handleEsc)
})
</script>

<style scoped>
/* NAV WRAPPER */
.nav {
  width: 100%;
  background: rgba(5, 6, 10, 0.85);
  backdrop-filter: blur(12px);
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 2000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* TOP BAR */
.nav-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

/* LOGO */
.logo {
  font-size: 1.4rem;
  font-weight: 700;
  color: #4f8cff;
  text-shadow: 0 0 12px rgba(79, 140, 255, 0.6);
}

/* BURGER ICON */
.burger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
}

.burger span {
  width: 28px;
  height: 3px;
  background: #c5d2ff;
  border-radius: 3px;
  transition: 0.35s ease;
  box-shadow: 0 0 8px rgba(79, 140, 255, 0.5);
}

.burger span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.burger span.open:nth-child(2) {
  opacity: 0;
}

.burger span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* NEON GLASS DROPDOWN */
.neon-glass {
  background: rgba(15, 18, 30, 0.55);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(79, 140, 255, 0.25);
  box-shadow: 0 0 30px rgba(79, 140, 255, 0.35);
  border-radius: 0 0 16px 16px;
}

/* DROPDOWN MENU */
.dropdown-menu {
  width: 100%;
  padding: 1rem 2rem;
  position: relative;
  z-index: 1500;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 0.6rem 0;
}

.dropdown-menu a {
  color: #c5d2ff;
  text-decoration: none;
  font-size: 1rem;
  transition: 0.25s ease;
}

.dropdown-menu a:hover {
  color: #4f8cff;
  transform: translateX(6px);
}

/* SLIDE-DOWN TRANSITION */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-14px);
}
</style>
