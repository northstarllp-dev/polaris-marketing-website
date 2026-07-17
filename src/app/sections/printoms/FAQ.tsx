"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { PRINTOMS_FAQS } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[rgba(0,0,0,0.08)] rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <h4 className="font-['Figtree',sans-serif] font-bold text-[16px] text-[var(--brand-ink)]">
          {q}
        </h4>
        <ChevronDown
          size={18}
          className="shrink-0 text-[var(--brand-muted)]"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.28s ease",
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-['Figtree',sans-serif] font-normal text-[15px] text-[var(--brand-muted)] leading-relaxed px-6 pb-6">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(26px, 3.5vw, 36px)" }}
          >
            Frequently asked questions
          </h2>
        </FadeIn>
        <div className="flex flex-col gap-3">
          {PRINTOMS_FAQS.map((faq) => (
            <FadeIn key={faq.q}>
              <FaqItem q={faq.q} a={faq.a} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

