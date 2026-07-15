import { useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_OFFSET = 80;

export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.replace(/^#/, "");
  if (!id) {
    window.scrollTo({ top: 0, behavior });
    return false;
  }
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior });
  return true;
}

/** Smooth-scroll to hash targets after client-side navigation */
export function useHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const preferReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = preferReduced ? "auto" : "smooth";

    // Retry briefly — section may mount after route change
    let attempts = 0;
    const tryScroll = () => {
      attempts += 1;
      const currentHash = typeof window !== "undefined" ? window.location.hash : "";
      if (scrollToHash(currentHash, behavior) || attempts >= 12) return;
      window.setTimeout(tryScroll, 50);
    };

    requestAnimationFrame(tryScroll);
  }, [pathname]);
}
