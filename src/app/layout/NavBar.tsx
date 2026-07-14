import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-200"
      style={{
        boxShadow: scrolled
          ? "0 1px 16px rgba(0,0,0,0.08)"
          : "0 1px 0 rgba(0,0,0,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/light withoutbg.png"
            alt="Polaris"
            className="h-32 w-auto object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              className="flex items-center gap-0.5 font-['Figtree',sans-serif] text-[14px] font-medium text-[#333] hover:text-[var(--brand-navy)] transition-colors px-3 py-2 rounded-lg hover:bg-[var(--brand-surface)]"
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

          <Link
            to="/#why"
            className="font-['Figtree',sans-serif] text-[14px] font-medium text-[#333] hover:text-[var(--brand-navy)] transition-colors px-3 py-2 rounded-lg hover:bg-[var(--brand-surface)]"
          >
            Company
          </Link>
          <Link
            to="/products/printoms#pricing"
            className="font-['Figtree',sans-serif] text-[14px] font-medium text-[#333] hover:text-[var(--brand-navy)] transition-colors px-3 py-2 rounded-lg hover:bg-[var(--brand-surface)]"
          >
            Pricing
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href="#contact"
            className="font-['Figtree',sans-serif] text-[14px] font-medium text-[#555] hover:text-[#333] transition-colors px-3 py-2"
          >
            Contact sales
          </a>
          <motion.a
            href="#contact"
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
            className="lg:hidden overflow-hidden bg-white border-t border-[rgba(0,0,0,0.06)]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              <Link
                to="/products/printoms"
                className="font-['Figtree',sans-serif] text-[15px] font-medium text-[#333] py-2.5 border-b border-[rgba(0,0,0,0.05)]"
              >
                PrintOMS
              </Link>
              <Link
                to="/#why"
                className="font-['Figtree',sans-serif] text-[15px] font-medium text-[#333] py-2.5 border-b border-[rgba(0,0,0,0.05)]"
              >
                Company
              </Link>
              <Link
                to="/products/printoms#pricing"
                className="font-['Figtree',sans-serif] text-[15px] font-medium text-[#333] py-2.5 border-b border-[rgba(0,0,0,0.05)]"
              >
                Pricing
              </Link>
              <a
                href="#contact"
                className="font-['Figtree',sans-serif] text-[14px] font-semibold bg-[var(--brand-orange)] text-white px-5 py-3 rounded-lg text-center mt-4"
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
