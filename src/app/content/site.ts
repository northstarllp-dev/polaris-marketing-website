/** Canonical PrintOMS product site (subdomain). */
export const PRINTOMS_SITE_URL = "https://printoms.thepolarislabs.com";

export function getPrintomsUrl(hash = "") {
  const h = !hash ? "" : hash.startsWith("#") ? hash : `#${hash}`;

  if (process.env.NODE_ENV === "development") {
    return `http://printoms.localhost:3000${h || "/"}`;
  }

  return `${PRINTOMS_SITE_URL}${h || "/"}`;
}
