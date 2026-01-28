import { ref } from "vue"

/* -----------------------------------------------------------
   TYPES
----------------------------------------------------------- */
interface GeoResult {
  country: string | null
  region: string | null
  org: string | null
  asn: string | null
  isp: string | null
  is_vpn: boolean
  is_hosting: boolean
  is_mobile: boolean
  confidence: number
  suspicious: boolean
}

interface GeoWarning {
  reason: string[]
  level: "info" | "warning" | "danger"
}

/* -----------------------------------------------------------
   SAFE BROWSER CHECK
----------------------------------------------------------- */
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined"

/* -----------------------------------------------------------
   ROLLING CODE GENERATOR (browser‑safe)
----------------------------------------------------------- */
function generateRollingCode() {
  if (!isBrowser || !("crypto" in globalThis)) return "fallback-code"

  const seed = globalThis.crypto.getRandomValues(new Uint32Array(4)).join("-")
  const time = Date.now().toString()

  return globalThis.btoa(seed + ":" + time).replace(/=/g, "")
}

/* -----------------------------------------------------------
   LIGHTWEIGHT ENCRYPTION (browser‑safe)
----------------------------------------------------------- */
function encryptPayload(str: string, key: string) {
  if (!isBrowser || !("btoa" in globalThis)) return "encrypted-fallback"

  const out = str
    .split("")
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length)))
    .join("")

  return globalThis.btoa(out)
}

/* -----------------------------------------------------------
   SAFE FETCH WITH TIMEOUT (SSR‑safe)
----------------------------------------------------------- */
async function safeFetch(url: string, timeoutMs = 2500): Promise<any | null> {
  if (!isBrowser) return null

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  const rolling = generateRollingCode()
  const encrypted = encryptPayload("geo-check", rolling)

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "X-Rolling-Code": rolling,
        "X-Encrypted": encrypted
      }
    })

    clearTimeout(timeout)
    if (!res.ok) return null
    return await res.json()
  } catch {
    clearTimeout(timeout)
    return null
  }
}

/* -----------------------------------------------------------
   CLOUDFLARE TRACE FALLBACK (SSR‑safe)
----------------------------------------------------------- */
async function cloudflareFallback() {
  if (!isBrowser) return null

  try {
    const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace")
    const text = await res.text()
    const obj: any = {}

    text.split("\n").forEach(line => {
      const [k, v] = line.split("=")
      obj[k] = v
    })

    return {
      country: obj.loc || null,
      ip: obj.ip || null,
      org: obj.org || null
    }
  } catch {
    return null
  }
}

/* -----------------------------------------------------------
   MAIN COMPOSABLE (Vue 3.5‑safe)
----------------------------------------------------------- */
export function useGeoCheck() {
  const isAustralian = ref(false)
  const isSuspicious = ref(false)
  const isLikelyVPN = ref(false)
  const shouldWarn = ref(false)
  const warning = ref<GeoWarning | null>(null)
  const geo = ref<GeoResult | null>(null)

  async function check() {
    if (!isBrowser) {
      // SSR fallback — do nothing
      return
    }

    try {
      /* -------------------------------------------------------
         MULTI‑API FETCH WITH FALLBACK
      ------------------------------------------------------- */
      const [p1, p2, p3] = await Promise.all([
        safeFetch("https://ipapi.co/json/"),
        safeFetch("https://ipwho.is/"),
        safeFetch("https://ipinfo.io/json?token=")
      ])

      const fallback = await cloudflareFallback()

      /* -------------------------------------------------------
         COUNTRY CONSENSUS
      ------------------------------------------------------- */
      const c1 = p1?.country_code ?? null
      const c2 = p2?.country ?? null
      const c3 = p3?.country ?? null
      const c4 = fallback?.country ?? null

      const votes = [c1, c2, c3, c4].filter(Boolean)

      const trust = { ipapi: 3, ipwho: 2, ipinfo: 1, cf: 2 }

      const weightedAU =
        (c1 === "AU" ? trust.ipapi : 0) +
        (c2 === "AU" ? trust.ipwho : 0) +
        (c3 === "AU" ? trust.ipinfo : 0) +
        (c4 === "AU" ? trust.cf : 0)

      const countryConsensus =
        votes.length === 0
          ? null
          : weightedAU >= 4
          ? "AU"
          : votes[0] || null

      isAustralian.value = countryConsensus === "AU"

      /* -------------------------------------------------------
         ORG / ISP / ASN EXTRACTION
      ------------------------------------------------------- */
      const org = p1?.org || p3?.org || fallback?.org || null
      const isp = p2?.connection?.isp || p1?.org || fallback?.org || null

      const rawASN =
        p2?.connection?.asn ??
        p1?.asn ??
        p3?.asn ??
        null

      const asn = rawASN
        ? String(rawASN).toUpperCase().replace(/[^A-Z0-9]/g, "")
        : null

      const orgLower = (org || "").toLowerCase()
      const ispLower = (isp || "").toLowerCase()

      /* -------------------------------------------------------
         WHITELISTS
      ------------------------------------------------------- */
      const auISPWhitelist = [
        "telstra", "optus", "vodafone", "tpg", "iinet", "internode",
        "aussie broadband", "belong", "dodo", "exetel", "superloop",
        "tangerine", "mate", "myrepublic", "uniti", "southern phone",
        "nbn", "starlink", "spacex"
      ]

      const auASNWhitelist = [
        "AS1221", "AS4804", "AS9443", "AS7474", "AS2764",
        "AS133480", "AS14593"
      ]

      const isWhitelistedISP = auISPWhitelist.some(k =>
        ispLower.includes(k) || orgLower.includes(k)
      )

      const isWhitelistedASN = asn && auASNWhitelist.some(a => asn.startsWith(a))

      /* -------------------------------------------------------
         MOBILE CARRIER DETECTION
      ------------------------------------------------------- */
      const mobileKeywords = [
        "telstra", "optus", "vodafone", "tpg", "amaysim", "boost", "aldi mobile"
      ]

      const isMobile = mobileKeywords.some(k =>
        ispLower.includes(k) || orgLower.includes(k)
      )

      /* -------------------------------------------------------
         HOSTING / VPN DETECTION
      ------------------------------------------------------- */
      const hostingKeywords = [
        "hosting", "cloud", "digitalocean", "aws", "amazon", "azure",
        "gcp", "google", "ovh", "linode", "contabo", "hetzner",
        "vultr", "server", "colo", "datacenter"
      ]

      const vpnKeywords = [
        "vpn", "proxy", "tunnel", "anonym", "private internet",
        "nord", "express", "surfshark", "mullvad"
      ]

      const isHosting = hostingKeywords.some(k =>
        orgLower.includes(k) || ispLower.includes(k)
      )

      const isVPN = vpnKeywords.some(k =>
        orgLower.includes(k) || ispLower.includes(k)
      )

      isLikelyVPN.value = isVPN || isHosting

      /* -------------------------------------------------------
         SUSPICION SCORING
      ------------------------------------------------------- */
      let score = 0
      const reasons: string[] = []

      if (votes.length >= 2 && new Set(votes).size > 1) {
        score += 40
        reasons.push("Location mismatch across providers")
      }

      if (isHosting) {
        score += 60
        reasons.push("Hosting provider detected")
      }

      if (isVPN) {
        score += 70
        reasons.push("VPN service detected")
      }

      const auASNPrefixes = ["AS1221", "AS4804", "AS9443", "AS7474", "AS2764"]
      if (countryConsensus === "AU" && asn && !auASNPrefixes.some(a => asn.startsWith(a))) {
        score += 50
        reasons.push("ASN does not match Australian networks")
      }

      if (isMobile) {
        score -= 40
        reasons.push("Trusted Australian mobile carrier")
      }

      if (isWhitelistedISP || isWhitelistedASN) {
        score -= 80
        reasons.push("Trusted Australian ISP detected")
      }

      /* -------------------------------------------------------
         FINAL FLAGS
      ------------------------------------------------------- */
      isSuspicious.value = score >= 60 && !isWhitelistedISP && !isWhitelistedASN

      shouldWarn.value =
        isSuspicious.value ||
        (isLikelyVPN.value && !isWhitelistedISP && !isWhitelistedASN)

      warning.value = {
        reason: reasons,
        level:
          score >= 90 ? "danger" :
          score >= 60 ? "warning" :
          "info"
      }

      geo.value = {
        country: countryConsensus,
        region: p1?.region || p2?.region || p3?.region || null,
        org,
        isp,
        asn,
        is_vpn: isVPN,
        is_hosting: isHosting,
        is_mobile: isMobile,
        confidence: Math.max(0, 100 - score),
        suspicious: isSuspicious.value
      }
    } catch (err) {
      console.warn("[GeoCheck] Fatal error:", err)
      isSuspicious.value = true
      shouldWarn.value = true
      warning.value = {
        reason: ["Geo‑check failed unexpectedly"],
        level: "danger"
      }
    }
  }

  return {
    isAustralian,
    isLikelyVPN,
    isSuspicious,
    shouldWarn,
    warning,
    geo,
    check
  }
}
