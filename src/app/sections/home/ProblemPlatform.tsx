"use client";

import { useCallback, useRef, useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import {
  CircleHelp,
  EyeOff,
  FileText,
  Megaphone,
  MessageCircle,
  Sparkles,
  Table2,
  type LucideIcon,
} from "lucide-react";
import { CHAOS_ITEMS } from "../../content/polaris";
import { FadeIn } from "../../components/motion/FadeIn";

const ICONS: Record<(typeof CHAOS_ITEMS)[number]["icon"], LucideIcon> = {
  MessageCircle,
  Table2,
  FileText,
  CircleHelp,
  Megaphone,
  EyeOff,
};

const RED_GRADIENTS = [
  ["#ff7043", "#ef4444"],
  ["#f43f5e", "#e11d48"],
  ["#ef4444", "#b91c1c"],
  ["#ff8a5c", "#f4622d"],
  ["#fb7185", "#e11d48"],
  ["#f87171", "#dc2626"],
];

const POSITIONS = [
  { x: 8, y: 30, r: -6 },
  { x: 25, y: 58, r: 4 },
  { x: 41, y: 22, r: -3 },
  { x: 55, y: 52, r: 7 },
  { x: 72, y: 26, r: -5 },
  { x: 86, y: 56, r: 3 },
];

type Offset = { x: number; y: number; rot: number };
type ChaosItem = (typeof CHAOS_ITEMS)[number];
function FlipCard({
  item,
  from,
  to,
  size = "md",
}: {
  item: ChaosItem;
  from: string;
  to: string;
  size?: "sm" | "md";
}) {
  const [flipped, setFlipped] = useState(false);
  const Icon = ICONS[item.icon];
  const box = size === "sm" ? "h-20 w-20" : "h-24 w-24";
  const iconSize = size === "sm" ? 36 : 38;

  return (
    <button
      type="button"
      className="group relative flex flex-col items-center gap-3 cursor-pointer border-0 bg-transparent p-0"
      aria-pressed={flipped}
      aria-label={`${item.label}. Solution: Polaris — ${item.solution}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      style={{ perspective: 900 }}
    >
      <motion.div
        className={`relative ${box}`}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front — problem */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-[22px] shadow-lg ${box}`}
          style={{
            background: `linear-gradient(135deg, ${from}, ${to})`,
            boxShadow: `0 16px 34px ${to}44`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Icon size={iconSize} strokeWidth={1.9} className="text-white" />
        </div>

        {/* Back — Polaris solution */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-[22px] px-2 ${box}`}
          style={{
            background: "linear-gradient(135deg, #0f1035, #1a1b4a)",
            boxShadow: "0 16px 34px rgba(15,16,53,0.35)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Sparkles size={18} className="text-[var(--brand-orange)]" />
          <span className="font-['Figtree',sans-serif] font-black text-[10px] text-white uppercase tracking-wider">
            Polaris
          </span>
        </div>
      </motion.div>

      <div className="min-h-[2.5rem] flex flex-col items-center justify-start px-1">
        <span
          className={`font-['Figtree',sans-serif] font-semibold text-[11px] uppercase tracking-wider text-center leading-snug max-w-[110px] transition-colors ${flipped ? "text-[var(--brand-orange)]" : "text-[var(--brand-muted)]"
            }`}
        >
          {flipped ? "Polaris" : item.label}
        </span>
        <motion.span
          className="font-['Figtree',sans-serif] text-[11px] text-[var(--brand-ink)] leading-snug text-center max-w-[140px] mt-1"
          initial={false}
          animate={{
            opacity: flipped ? 1 : 0,
            y: flipped ? 0 : 6,
            height: flipped ? "auto" : 0,
          }}
          transition={{ duration: 0.25 }}
        >
          {item.solution}
        </motion.span>
      </div>
    </button>
  );
}

export function ProblemPlatform() {
  const [offsets, setOffsets] = useState<Offset[]>(
    () => CHAOS_ITEMS.map(() => ({ x: 0, y: 0, rot: 0 }))
  );
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const next = itemRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0, rot: 0 };
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 190;
        if (dist > radius || dist < 1) return { x: 0, y: 0, rot: 0 };

        const force = (1 - dist / radius) * 36;
        return {
          x: -(dx / dist) * force,
          y: -(dy / dist) * force,
          rot: (dx / dist) * -8 * (1 - dist / radius),
        };
      });
      setOffsets(next);
    },
    []
  );

  const onMouseLeave = useCallback(() => {
    setOffsets(CHAOS_ITEMS.map(() => ({ x: 0, y: 0, rot: 0 })));
  }, []);

  return (
    <section className="relative py-28 bg-white border-b border-[rgba(0,0,0,0.06)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[760px] h-[440px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(ellipse, rgba(239,68,68,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-[12%] top-[55%] w-[360px] h-[360px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,112,67,0.20) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[10%] top-[40%] w-[340px] h-[340px] rounded-full opacity-35"
          style={{
            background:
              "radial-gradient(ellipse, rgba(244,63,94,0.18) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative">
        <FadeIn>
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[#ef4444] uppercase tracking-widest mb-3">
            The problem
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight mb-6"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Your business is running on chaos.
          </h2>
          <p className="font-['Figtree',sans-serif] font-normal text-[17px] text-[var(--brand-muted)] leading-relaxed max-w-2xl mx-auto mb-4">
            Information is scattered. Approvals get lost. Production stalls
            because no one sees the full job. You manage tools instead of growth.
          </p>
          <p className="font-['Figtree',sans-serif] text-[13px] font-semibold text-[var(--brand-orange)] mb-10">
            Hover or tap a box — each problem flips to its Polaris answer
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mb-16">
          <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-[var(--brand-navy)] aspect-video shadow-2xl shadow-[rgba(15,16,53,0.18)]">
            <video
              src="/brag.mp4"
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              aria-label="PrintOMS product demo"
            />
          </div>
        </FadeIn>

        {/* Mobile grid */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 sm:grid-cols-3 md:hidden mb-16 px-2">
          {CHAOS_ITEMS.map((item, i) => {
            const [from, to] = RED_GRADIENTS[i % RED_GRADIENTS.length];
            return (
              <motion.div
                key={item.id}
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <FlipCard
                  item={item}
                  from={from}
                  to={to}
                  size="sm"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Desktop floating stage */}
        <div
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="hidden md:block relative h-[280px] mt-40 mb-1"
        >
          {CHAOS_ITEMS.map((item, i) => {
            const [from, to] = RED_GRADIENTS[i % RED_GRADIENTS.length];
            const pos = POSITIONS[i % POSITIONS.length];
            const mouse = offsets[i] ?? { x: 0, y: 0, rot: 0 };
            const amp = 12 + (i % 3) * 3;

            return (
              <motion.div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="absolute"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                animate={{
                  x: mouse.x,
                  y: mouse.y,
                  rotate: pos.r + mouse.rot,
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 14,
                  mass: 0.7,
                }}
              >
                <motion.div
                  className="-translate-x-1/2 -translate-y-1/2"
                  animate={{ y: [-amp, amp, -amp], rotate: [-2.5, 2.5, -2.5] }}
                  transition={{
                    duration: 3.4 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.25,
                  }}
                >
                  <FlipCard
                    item={item}
                    from={from}
                    to={to}
                    size="md"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <div
            className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 mb-5"
            aria-label="One Polaris operating layer"
          >
            {[
              { word: "One", color: "var(--brand-navy)" },
              { word: "Polaris", color: "var(--brand-orange)" },
              { word: "operating", color: "var(--brand-navy)" },
              { word: "layer", color: "var(--brand-navy)" },
            ].map(({ word, color }, i) => (
              <div key={word} className="overflow-hidden py-1">
                <motion.span
                  className="block font-['Figtree',sans-serif] font-black"
                  style={{
                    fontSize: "clamp(28px, 5vw, 52px)",
                    color,
                    lineHeight: 1.1,
                  }}
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{
                    duration: 0.65,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.div
            className="mx-auto h-1 rounded-full bg-[var(--brand-orange)] mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "80px", opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 0.5,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          <motion.p
            className="font-['Figtree',sans-serif] text-[15px] text-[var(--brand-muted)] max-w-lg mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.55, delay: 0.5, ease: "easeOut" }}
          >
            Every chaos box above has the same answer: Polaris — starting with
            PrintOMS for signage shops that need more than a CRM.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
