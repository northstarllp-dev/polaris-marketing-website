"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";

/** Embla carousel + Motion fades */
export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    const id = window.setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      emblaApi.off("select", onSelect);
      window.clearInterval(id);
    };
  }, [emblaApi, onSelect]);

  const t = TESTIMONIALS[index] ?? TESTIMONIALS[0];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            What shops say after switching
          </h2>
        </FadeIn>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {TESTIMONIALS.map((item) => (
              <div key={item.company} className="min-w-0 flex-[0_0_100%] px-2">
                <div className="rounded-2xl bg-[var(--brand-surface)] border border-[rgba(0,0,0,0.06)] p-8 md:p-12 text-center min-h-[240px] flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={item.quote}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-14 h-14 rounded-full bg-[var(--brand-navy)] text-white flex items-center justify-center font-['Figtree',sans-serif] font-black text-[18px] mb-6"
                      >
                        {item.initials}
                      </motion.div>
                      <p className="font-['Figtree',sans-serif] text-[18px] md:text-[20px] text-[var(--brand-ink)] leading-relaxed mb-6 max-w-xl">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <p className="font-['Figtree',sans-serif] font-bold text-[14px] text-[var(--brand-ink)]">
                        {item.name}
                      </p>
                      <p className="font-['Figtree',sans-serif] text-[13px] text-[var(--brand-muted)]">
                        {item.company}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-[var(--brand-orange)]" : "w-2 bg-[#ddd]"
              }`}
            />
          ))}
        </div>

        {/* keep t referenced for a11y live region */}
        <span className="sr-only" aria-live="polite">
          {t.company}
        </span>
      </div>
    </section>
  );
}
