import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { scrollToHash } from "../hooks/useHashScroll";

const NAV_LINKS = [
  { label: "Company", to: "/#about" },
  { label: "How We Work", to: "/#how-we-work" },
  { label: "Why Polaris", to: "/#why" },
  { label: "Pricing", to: "/products/printoms#pricing" },
] as const;

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onDoc = (e: globalThis.MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function goTo(to: string, e?: MouseEvent) {
    e?.preventDefault();
    const [path, hash = ""] = to.split("#");
    const pathname = path || "/";
    const hashPart = hash ? `#${hash}` : "";
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

    if (location.pathname === pathname) {
      if (hash) {
        if (location.hash === hashPart) {
          scrollToHash(hash, behavior);
        } else {
          navigate(`${pathname}${hashPart}`);
        }
      } else {
        window.scrollTo({ top: 0, behavior });
        navigate(pathname);
      }
    } else {
      navigate(`${pathname}${hashPart}`);
    }
    setOpen(false);
    setProductsOpen(false);
  }

  const linkClass =
    "font-['Figtree',sans-serif] text-[14px] font-medium text-[#333] hover:text-[var(--brand-navy)] transition-colors px-3 py-2 rounded-lg hover:bg-[var(--brand-surface)]";
  const mobileLinkClass =
    "font-['Figtree',sans-serif] text-[15px] font-medium text-[#333] py-2.5 border-b border-[rgba(0,0,0,0.05)] text-left";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-200"
      style={{
        boxShadow: scrolled
          ? "0 1px 16px rgba(0,0,0,0.08)"
          : "0 1px 0 rgba(0,0,0,0.06)",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between gap-6">
        <Link
          to="/"
          onClick={(e) => goTo("/", e)}
          className="flex items-center gap-2 shrink-0"
        >
          <img
            src="/light withoutbg.png"
            alt="Polaris"
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              className={`flex items-center gap-0.5 ${linkClass}`}
            >
              Products
              <ChevronDown
                size={13}
                className={`opacity-50 mt-px transition-transform ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 8, height: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white shadow-xl"
                >
                  <div className="p-2">
                    <Link
                      to="/products/printoms"
                      onClick={(e) => goTo("/products/printoms", e)}
                      className="block rounded-xl p-3 hover:bg-[var(--brand-surface)] transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-['Figtree',sans-serif] font-bold text-[14px] text-[var(--brand-ink)]">
                          PrintOMS
                        </span>
                        <span className="text-[10px] font-['Figtree',sans-serif] font-bold text-white bg-[#10b981] px-2 py-0.5 rounded uppercase tracking-wide">
                          Live
                        </span>
                      </div>
                      <p className="font-['Figtree',sans-serif] text-[12px] text-[var(--brand-muted)] leading-relaxed">
                        Order management for signage & fabrication
                      </p>
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => goTo("/products/printoms#pricing", e)}
                      className="w-full text-left rounded-xl p-3 hover:bg-[var(--brand-surface)] transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-['Figtree',sans-serif] font-bold text-[14px] text-[var(--brand-ink)]">
                          PrintOMS Pricing
                        </span>
                      </div>
                      <p className="font-['Figtree',sans-serif] text-[12px] text-[var(--brand-muted)]">
                        Starter & Professional plans
                      </p>
                    </button>
                    <div className="rounded-xl p-3 opacity-70">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-['Figtree',sans-serif] font-bold text-[14px] text-[var(--brand-ink)]">
                          More products
                        </span>
                        <span className="text-[10px] font-['Figtree',sans-serif] font-bold text-[var(--brand-muted)] bg-[var(--brand-surface)] px-2 py-0.5 rounded uppercase tracking-wide">
                          Soon
                        </span>
                      </div>
                      <p className="font-['Figtree',sans-serif] text-[12px] text-[var(--brand-muted)]">
                        A growing Polaris suite is on the way
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={(e) => goTo(to, e)}
              className={linkClass}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) =>
              goTo(
                location.pathname === "/products/printoms"
                  ? "/products/printoms#contact"
                  : "/#contact",
                e
              )
            }
            className="font-['Figtree',sans-serif] text-[14px] font-medium text-[#555] hover:text-[#333] transition-colors px-3 py-2"
          >
            Contact sales
          </button>
          <motion.a
            href="tel:+918189999998"
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className="font-['Figtree',sans-serif] text-[13px] font-semibold bg-[var(--brand-orange)] text-white px-5 py-2.5 rounded-lg hover:bg-[#f4622d] transition-colors flex items-center gap-1.5 ml-1"
          >
            Book a Demo <ArrowRight size={14} />
          </motion.a>
        </div>

        <button
          type="button"
          className="lg:hidden text-[#333] p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-[rgba(0,0,0,0.06)]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              <button
                type="button"
                onClick={(e) => goTo("/products/printoms", e)}
                className={mobileLinkClass}
              >
                PrintOMS
              </button>
              {NAV_LINKS.map(({ label, to }) => (
                <button
                  key={label}
                  type="button"
                  onClick={(e) => goTo(to, e)}
                  className={mobileLinkClass}
                >
                  {label}
                </button>
              ))}
              <a
                href="tel:+918189999998"
                className="font-['Figtree',sans-serif] text-[14px] font-semibold bg-[var(--brand-orange)] text-white px-5 py-3 rounded-lg text-center mt-4"
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient scroll progress — navy → orange → amber */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/5 overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          className="h-full origin-left transition-[width] duration-75 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background:
              "linear-gradient(90deg, #0f1035 0%, #ff7043 55%, #ffb74d 100%)",
          }}
        />
      </div>
    </nav>
  );
}
