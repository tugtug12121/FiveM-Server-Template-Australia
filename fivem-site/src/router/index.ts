import { createRouter, createWebHistory } from 'vue-router'

// Auto-import all pages (lazy-loaded)
const pages = import.meta.glob('../pages/*.vue')

// Convert PascalCase or camelCase to kebab-case
function toKebabCase(str: string) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

// Validate filename
function isValidPageName(name: string) {
  return /^[A-Za-z0-9_-]+$/.test(name)
}

// Generate routes
const routes = Object.keys(pages).map((file) => {
  const name = file.replace('../pages/', '').replace('.vue', '')

  if (!isValidPageName(name)) {
    console.warn(`[Router] Skipping invalid page name: ${name}`)
    return null
  }

  const path = name === 'Home' ? '/' : `/${toKebabCase(name)}`

  return {
    path,
    name,
    component: pages[file],
    meta: {
      auto: true,
      title: name,

      // NEW: Navbar metadata
      showInNav: name !== 'NotFound',   // Hide 404
      navLabel: name.replace(/([A-Z])/g, ' $1').trim(),
      group: null                       // You can set this per page later
    }
  }
})

// Remove null entries
const filteredRoutes = routes.filter(Boolean)

// Prevent duplicates
const uniqueRoutes = []
const seenPaths = new Set()

for (const r of filteredRoutes) {
  if (r && !seenPaths.has(r.path)) {
    seenPaths.add(r.path)
    uniqueRoutes.push(r)
  } else if (r) {
    console.warn(`[Router] Duplicate route skipped: ${r.path}`)
  }
}

// Add 404
uniqueRoutes.push({
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('../pages/NotFound.vue'),
  meta: {
    title: '404 - Not Found',
    showInNav: false
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: uniqueRoutes as any // Type assertion to fix TS error
})

// Auto-update document title
router.beforeEach((to, _from, next) => {
  document.title = to.meta['title']
    ? `${to.meta['title']} | YourFiveMServer`
    : 'YourFiveMServer'
  next()
})

// Error logging
router.onError((err) => {
  console.error('[Router Error]', err)
})

export default router
