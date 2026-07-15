import { useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_OFFSET = 80;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateScroll(targetTop: number) {
  const startTop = window.scrollY;
  const distance = targetTop - startTop;
  const duration = 1200; // Slow smooth scroll (1.2 seconds)

  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startTop + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.replace(/^#/, "");
  if (!id) {
    if (behavior === "auto") {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      animateScroll(0);
    }
    return false;
  }
  const el = document.getElementById(id);
  if (!el) return false;
  const targetTop = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

  if (behavior === "auto") {
    window.scrollTo({ top: targetTop, behavior: "auto" });
  } else {
    animateScroll(targetTop);
  }
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

    // Retry briefly , section may mount after route change
    let attempts = 0;
    const tryScroll = () => {
      attempts += 1;
      const currentHash = typeof window !== "undefined" ? window.location.hash : "";
      if (scrollToHash(currentHash, behavior) || attempts >= 12) return;
      window.setTimeout(tryScroll, 50);
    };

    requestAnimationFrame(tryScroll);
  }, [pathname]);

  // Global click interceptor for all hash links to enforce slow scroll
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      const preferReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior: ScrollBehavior = preferReduced ? "auto" : "smooth";

      if (href.startsWith('#')) {
        e.preventDefault();
        scrollToHash(href, behavior);
        window.history.pushState(null, "", href);
      } else if (href.startsWith('/#') && pathname === '/') {
        e.preventDefault();
        const hash = href.substring(1);
        scrollToHash(hash, behavior);
        window.history.pushState(null, "", href);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);
}
