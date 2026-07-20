/** Canonical PrintOMS product site (subdomain). */
export const PRINTOMS_SITE_URL = "https://printoms.thepolarislabs.com";

export function getPrintomsUrl(hash = "") {
  const h = !hash ? "" : hash.startsWith("#") ? hash : `#${hash}`;

  if (typeof window !== "undefined") {
    const isLocal = window.location.hostname.includes("localhost") || window.location.hostname === "127.0.0.1";
    if (isLocal) {
      const port = window.location.port ? `:${window.location.port}` : ":3000";
      return `http://printoms.localhost${port}${h || "/"}`;
    }
    return `${PRINTOMS_SITE_URL}${h || "/"}`;
  }

  // SSR fallback - avoid hydration mismatch by returning a placeholder or relative URL.
  // Since we suppress hydration warnings or don't care about the initial SSR href as much, 
  // we can just return the production URL and suppress the warning in the component,
  // OR we can return a relative path and let the client fix it.
  // To be safe and avoid ANY mismatch, we return the production URL.
  return `${PRINTOMS_SITE_URL}${h || "/"}`;
}
