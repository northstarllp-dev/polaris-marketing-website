import { useCallback, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  CircleHelp,
  EyeOff,
  FileText,
  Megaphone,
  MessageCircle,
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

// Red family — gradient stops per card for variety within one red theme
const RED_GRADIENTS = [
  ["#ff7043", "#ef4444"],
  ["#f43f5e", "#e11d48"],
  ["#ef4444", "#b91c1c"],
  ["#ff8a5c", "#f4622d"],
  ["#fb7185", "#e11d48"],
  ["#f87171", "#dc2626"],
];

// Scattered positions (%) across the stage — tuned for a single row band
const POSITIONS = [
  { x: 8, y: 30, r: -6 },
  { x: 25, y: 58, r: 4 },
  { x: 41, y: 22, r: -3 },
  { x: 55, y: 52, r: 7 },
  { x: 72, y: 26, r: -5 },
  { x: 86, y: 56, r: 3 },
];

type Offset = { x: number; y: number; rot: number };

export function ProblemPlatform() {
  const [united, setUnited] = useState(false);
  const [offsets, setOffsets] = useState<Offset[]>(
    () => CHAOS_ITEMS.map(() => ({ x: 0, y: 0, rot: 0 }))
  );
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reduce || united) return;

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

        const force = (1 - dist / radius) * 46;
        const pushX = -(dx / dist) * force;
        const pushY = -(dy / dist) * force;
        const rot = (dx / dist) * -10 * (1 - dist / radius);
        return { x: pushX, y: pushY, rot };
      });
      setOffsets(next);
    },
    [reduce, united]
  );

  const onMouseLeave = useCallback(() => {
    setOffsets(CHAOS_ITEMS.map(() => ({ x: 0, y: 0, rot: 0 })));
  }, []);

  return (
    <section className="relative py-28 bg-white border-b border-[rgba(0,0,0,0.06)] overflow-hidden">
      {/* Red gradient glows only */}
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
          <p className="font-['Figtree',sans-serif] font-normal text-[17px] text-[var(--brand-muted)] leading-relaxed max-w-2xl mx-auto mb-16">
            Information is scattered. Approvals get lost. Production stalls
            because no one sees the full job. You manage tools instead of growth.
          </p>
        </FadeIn>

        {/* Floating stage */}
        <div
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative h-[360px] sm:h-[320px] mb-16"
        >
          {CHAOS_ITEMS.map((item, i) => {
            const Icon = ICONS[item.icon];
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
                animate={
                  reduce
                    ? undefined
                    : united
                      ? { y: 80, scale: 0.6, opacity: 0.12, rotate: 0 }
                      : { x: mouse.x, y: mouse.y, rotate: pos.r + mouse.rot }
                }
                transition={
                  united
                    ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                    : { type: "spring", stiffness: 140, damping: 14, mass: 0.7 }
                }
              >
                {/* Sine water float — inner motion so push + float compose */}
                <motion.div
                  className="group flex flex-col items-center gap-3 -translate-x-1/2 -translate-y-1/2 cursor-default"
                  animate={
                    reduce || united
                      ? undefined
                      : { y: [-amp, amp, -amp], rotate: [-2.5, 2.5, -2.5] }
                  }
                  transition={{
                    duration: 3.4 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.25,
                  }}
                  whileHover={
                    reduce || united
                      ? undefined
                      : { scale: 1.12, transition: { duration: 0.25 } }
                  }
                >
                  <div
                    className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-[22px] shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${from}, ${to})`,
                      boxShadow: `0 16px 34px ${to}44`,
                    }}
                  >
                    <Icon
                      size={38}
                      strokeWidth={1.9}
                      className="text-white transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="font-['Figtree',sans-serif] font-semibold text-[11px] text-[var(--brand-muted)] uppercase tracking-wider whitespace-nowrap transition-colors group-hover:text-[#ef4444]">
                    {item.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <FadeIn delay={0.15}>
          <button
            type="button"
            onClick={() => setUnited(true)}
            onMouseEnter={() => setUnited(true)}
            className="group inline-flex flex-col items-center gap-4"
          >
            <motion.span
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand-orange)] text-white shadow-lg shadow-[var(--brand-orange)]/40"
              animate={reduce ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={reduce ? undefined : { scale: 1.1 }}
            >
              <ArrowDown size={20} strokeWidth={2.5} />
            </motion.span>
            <motion.div
              layout
              whileHover={reduce ? undefined : { scale: 1.03 }}
              className="inline-flex items-center gap-2 bg-[var(--brand-navy)] text-white px-6 py-3 rounded-xl font-['Figtree',sans-serif] font-bold text-[14px] shadow-lg"
            >
              One Polaris operating layer
            </motion.div>
          </button>
          <p className="mt-6 font-['Figtree',sans-serif] text-[15px] text-[var(--brand-muted)] max-w-lg mx-auto">
            Polaris connects the work — starting with PrintOMS for signage
            shops that need more than a CRM.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
