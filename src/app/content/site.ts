/** Canonical PrintOMS product site (subdomain). */
export const PRINTOMS_SITE_URL = "https://printoms.thepolarislabs.com";

/** In-app path on the parent Next.js app. */
export const PRINTOMS_APP_PATH = "/products/printoms";

/**
 * URL for PrintOMS links.
 * - Local / Vercel preview / printoms host → same-origin paths
 * - Production parent site → https://printoms.thepolarislabs.com
 */
export function getPrintomsUrl(hash = "") {
  const h = !hash ? "" : hash.startsWith("#") ? hash : `#${hash}`;

  const host =
    typeof window !== "undefined" ? window.location.hostname : "";

  const useLocalPath =
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENV === "preview" ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".vercel.app") ||
    host.startsWith("printoms.");

  if (useLocalPath) {
    // On printoms.* middleware rewrites `/` → product page
    if (host.startsWith("printoms.")) return h || "/";
    return `${PRINTOMS_APP_PATH}${h}`;
  }

  return `${PRINTOMS_SITE_URL}${h}`;
}
