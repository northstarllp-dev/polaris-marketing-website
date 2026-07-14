import { motion, useReducedMotion } from "motion/react";

export function LivePulse({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`}>
      {!reduce && (
        <motion.span
          className="absolute inset-0 rounded-full bg-[var(--brand-orange)]"
          animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-orange)]" />
    </span>
  );
}

export function SoftOrbit({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--brand-orange)]/20"
          style={{ width: 80 + i * 56, height: 80 + i * 56 }}
          animate={
            reduce
              ? undefined
              : { rotate: i % 2 === 0 ? 360 : -360, opacity: [0.25, 0.5, 0.25] }
          }
          transition={{
            rotate: { duration: 18 + i * 6, repeat: Infinity, ease: "linear" },
            opacity: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-[var(--brand-navy)] flex items-center justify-center mx-auto">
        <span className="font-['Figtree',sans-serif] font-black text-white text-lg">P</span>
      </div>
    </div>
  );
}
