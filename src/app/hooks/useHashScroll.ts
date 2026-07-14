import { useEffect } from "react";
import { useLocation } from "react-router";

/** Smooth-scroll to hash targets after client-side navigation */
export function useHashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      });
    }
  }, [location.pathname, location.hash]);
}
