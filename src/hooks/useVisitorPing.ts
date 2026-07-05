import { useEffect } from 'react'

/**
 * Fires a single "someone opened your portfolio" email when a visitor loads
 * the site. Uses Web3Forms (https://web3forms.com) so it needs no backend —
 * set VITE_WEB3FORMS_KEY to your free access key and the email is sent to the
 * address you registered that key with.
 *
 * Before sending, it enriches the alert with the visitor's IP, ISP / network
 * ("wifi provider"), and approximate location via ipwho.is (free, HTTPS, no
 * key). The client browser can't read its own public IP, so this lookup is
 * the only way to get it from a static site.
 *
 * - Fires at most once per browser session (sessionStorage guard) so a visitor
 *   refreshing or navigating around doesn't spam your inbox.
 * - Silently no-ops if no key is configured, and never blocks or throws in the
 *   UI — a failed ping should never affect the visitor's experience.
 */
const SESSION_FLAG = 'portfolio_ping_sent'

interface GeoInfo {
  ip?: string
  city?: string
  region?: string
  country?: string
  postal?: string
  isp?: string
  org?: string
  lat?: number
  lon?: number
}

/** Best-effort IP + geolocation lookup. Returns {} on any failure. */
async function lookupGeo(): Promise<GeoInfo> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 3500)
  try {
    const res = await fetch('https://ipwho.is/', { signal: ctrl.signal })
    const d = await res.json()
    if (!d || d.success === false) return {}
    return {
      ip: d.ip,
      city: d.city,
      region: d.region,
      country: d.country,
      postal: d.postal,
      isp: d.connection?.isp,
      org: d.connection?.org,
      lat: d.latitude,
      lon: d.longitude,
    }
  } catch {
    return {}
  } finally {
    clearTimeout(timer)
  }
}

export function useVisitorPing() {
  useEffect(() => {
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
    if (!accessKey) return

    // one ping per session
    try {
      if (sessionStorage.getItem(SESSION_FLAG)) return
      sessionStorage.setItem(SESSION_FLAG, '1')
    } catch {
      // sessionStorage can throw in private mode — fall through and still ping
    }

    const send = async () => {
      const geo = await lookupGeo()

      const params = new URLSearchParams(window.location.search)
      const referrer = document.referrer || 'direct / bookmark'
      const utm = ['utm_source', 'utm_medium', 'utm_campaign']
        .map((k) => params.get(k))
        .filter(Boolean)
        .join(' · ')

      const place = [geo.city, geo.region, geo.country].filter(Boolean).join(', ')
      const mapLink =
        geo.lat != null && geo.lon != null
          ? `https://www.google.com/maps?q=${geo.lat},${geo.lon}`
          : '—'

      const payload = {
        access_key: accessKey,
        subject: place
          ? `👀 Portfolio opened from ${place}`
          : '👀 Someone just opened your portfolio',
        from_name: 'Portfolio visitor alert',
        // network / location
        ip_address: geo.ip || 'unknown',
        location: place || 'unknown',
        postal_code: geo.postal || '—',
        network_isp: geo.isp || 'unknown',
        network_org: geo.org || '—',
        map: mapLink,
        // context
        opened_at: new Date().toLocaleString(),
        landing_page: window.location.pathname + window.location.search,
        came_from: referrer,
        campaign: utm || '—',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        screen: `${window.screen.width}×${window.screen.height}`,
        device: navigator.userAgent,
        botcheck: '', // Web3Forms honeypot — leave empty
      }

      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        })
      } catch {
        /* never surface network errors to the visitor */
      }
    }

    void send()
  }, [])
}
