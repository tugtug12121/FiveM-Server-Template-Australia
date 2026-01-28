<template>
  <div class="app">

    <!-- Ambient Background Layers -->
    <div class="police-lights"><div class="mid-glow"></div></div>
    <div class="vignette"></div>
    <div class="particles"></div>

    <!-- Navbar -->
    <Transition name="nav-slide">
      <MainNavbar />
    </Transition>

    <!-- PAGE LOADING BAR -->
    <div class="loading-bar" v-show="isNavigating"></div>

    <!-- PAGE CONTENT -->
    <main class="content">
      <Suspense>
        <template #default>
          <router-view v-slot="{ Component }">
            <Transition :name="transitionName" mode="out-in">
              <KeepAlive>
                <component :is="Component" :key="routeKey" />
              </KeepAlive>
            </Transition>
          </router-view>
        </template>

        <template #fallback>
          <div class="page-loader">
            <div class="spinner"></div>
          </div>
        </template>
      </Suspense>
    </main>

    <!-- Footer -->
    <Transition name="footer-slide">
      <MainFooter />
    </Transition>

    <!-- GLOBAL TOASTS -->
    <ToastContainer />

    <!-- AUSTRALIAN NOTICE -->
    <AuNotice ref="noticeRef" />

    <!-- GLOBAL MODAL LAYER -->
    <Teleport to="body">
      <div class="modal-layer" v-if="modalOpen"></div>
    </Teleport>

    <!-- GEO WARNING BANNER -->
    <GeoWarningBanner
      :visible="shouldWarn"
      :reasons="warning?.reason || []"
    />

    <!-- GEO WARNING MODAL -->
    <GeoWarningModal
      :visible="showModal"
      :reasons="warning?.reason || []"
      @close="showModal = false"
    />

  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

import MainNavbar from "./components/MainNavbar.vue"
import MainFooter from "./components/MainFooter.vue"
import ToastContainer from "./components/ToastContainer.vue"

import AuNotice from "./components/AuNotice.vue"
import GeoWarningBanner from "./components/GeoWarningBanner.vue"
import GeoWarningModal from "./components/GeoWarningModal.vue"

import { useGeoCheck } from "./composables/useGeoCheck"

/* -----------------------------------------
   GEO CHECK
------------------------------------------*/
const { check, shouldWarn, warning, isAustralian } = useGeoCheck()
const showModal = ref(false)

/* -----------------------------------------
   AUSTRALIAN NOTICE
------------------------------------------*/
const noticeRef = ref<InstanceType<typeof AuNotice> | null>(null)

/* -----------------------------------------
   ROUTER + TRANSITIONS
------------------------------------------*/
const route = useRoute()
const router = useRouter()

const routeKey = computed(() => route.fullPath)

const transitionName = computed(() => {
  if (route.meta?.transition === "slide") return "slide"
  if (route.meta?.transition === "scale") return "scale"
  return "fade"
})

/* -----------------------------------------
   NAVIGATION LOADING BAR
------------------------------------------*/
const isNavigating = ref(false)

router.beforeEach((_, __, next) => {
  isNavigating.value = true
  next()
})

router.afterEach(() => {
  setTimeout(() => (isNavigating.value = false), 300)
  window.scrollTo({ top: 0, behavior: "smooth" })
})

/* -----------------------------------------
   GLOBAL MODAL PLACEHOLDER
------------------------------------------*/
const modalOpen = ref(false)

/* -----------------------------------------
   ON MOUNT — GEO + AU NOTICE
------------------------------------------*/
onMounted(async () => {
  await check()

  // Show VPN / spoofing modal
  if (shouldWarn.value) {
    showModal.value = true
  }

  // Show AU notice
  const dismissed = localStorage.getItem("auNoticeDismissed")
  if (isAustralian.value && !dismissed) {
    noticeRef.value?.show()
  }
})
</script>
