"use client";

import Link from "next/link";
import { motion, MotionConfig } from "motion/react";

export function LivePulse({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`}>
      <motion.span
        className="absolute inset-0 rounded-full bg-[var(--brand-orange)]"
        animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-orange)]" />
    </span>
  );
}

type Product = {
  name: string;
  status: "live" | "soon";
  color: string;
  angle: number;
  radius: number;
  floatDuration: number;
  floatDelay: number;
  /** Route for this product chip */
  to: string;
};

const PRODUCTS: Product[] = [
  {
    name: "PrintOMS",
    status: "live",
    color: "#10b981",
    angle: 315,
    radius: 155,
    floatDuration: 4.2,
    floatDelay: 0,
    to: "/products/printoms",
  },
  {
    name: "PrintFloww",
    status: "soon",
    color: "#f97316",
    angle: 45,
    radius: 155,
    floatDuration: 5.0,
    floatDelay: 0.8,
    to: "/#contact",
  },
  {
    name: "StayFloww",
    status: "soon",
    color: "#8b5cf6",
    angle: 135,
    radius: 165,
    floatDuration: 4.6,
    floatDelay: 1.4,
    to: "/#contact",
  },
  {
    name: "LogisticOS",
    status: "soon",
    color: "#3b82f6",
    angle: 225,
    radius: 160,
    floatDuration: 5.4,
    floatDelay: 0.4,
    to: "/#contact",
  },
];

function getPosition(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

export function SoftOrbit({ className = "" }: { className?: string }) {
  // Soften (don’t disable) — this diagram is meant to feel alive
  const size = 420;
  const center = size / 2;
  const floatAmp = 12;

  return (
    <MotionConfig reducedMotion="never">
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size, perspective: 900 }}
    >
      {/* Rotating ring decorations */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[var(--brand-orange)]/15"
          style={{
            width: 100 + i * 64,
            height: 100 + i * 64,
            left: center - (100 + i * 64) / 2,
            top: center - (100 + i * 64) / 2,
          }}
          animate={{
            rotate: i % 2 === 0 ? 360 : -360,
            opacity: [0.18, 0.4, 0.18],
          }}
          transition={{
            rotate: { duration: 22 + i * 8, repeat: Infinity, ease: "linear" },
            opacity: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      <div
        className="absolute rounded-full border border-dashed border-[var(--brand-orange)]/10"
        style={{
          width: 340,
          height: 340,
          left: center - 170,
          top: center - 170,
        }}
      />

      {/* Connector lines — drawn under chips */}
      <svg
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ width: size, height: size }}
        aria-hidden
      >
        {PRODUCTS.map((product) => {
          const pos = getPosition(product.angle, product.radius);
          const innerPos = getPosition(product.angle, 48);
          return (
            <motion.line
              key={`line-${product.name}`}
              x1={center + innerPos.x}
              y1={center + innerPos.y}
              x2={center + pos.x}
              y2={center + pos.y}
              stroke={product.color}
              strokeWidth="1.25"
              strokeDasharray="4 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0.22, 0.45, 0.22],
              }}
              transition={{
                pathLength: { duration: 0.85, delay: product.floatDelay + 0.1 },
                opacity: {
                  duration: product.floatDuration,
                  delay: product.floatDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          );
        })}
      </svg>

      {/* Center hub — links home */}
      <motion.div
        className="absolute z-10"
        style={{
          left: center - 40,
          top: center - 40,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -floatAmp * 0.55, 0],
          rotateY: [-8, 8, -8],
          rotateX: [4, -4, 4],
        }}
        transition={{
          duration: 5.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Link href="/" aria-label="Polaris home">
          <motion.div
            className="w-20 h-20 rounded-2xl bg-[var(--brand-navy)] flex flex-col items-center justify-center shadow-2xl cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{
              scale: 1.1,
              rotateY: 18,
              rotateX: -10,
              boxShadow: "0 22px 40px rgba(15,16,53,0.45)",
              transition: { type: "spring", stiffness: 260, damping: 14 },
            }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="font-['Figtree',sans-serif] font-black text-white text-2xl leading-none">
              P
            </span>
            <span className="font-['Figtree',sans-serif] font-bold text-white/40 text-[9px] tracking-widest mt-0.5">
              POLARIS
            </span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Product chips — float layer + hover layer (separated so they don't fight) */}
      {PRODUCTS.map((product) => {
        const pos = getPosition(product.angle, product.radius);
        return (
          <div
            key={product.name}
            className="absolute z-20"
            style={{
              left: center + pos.x,
              top: center + pos.y,
              transform: "translate(-50%, -50%)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Float layer */}
            <motion.div
              animate={{
                y: [0, -floatAmp, -floatAmp * 0.3, -floatAmp * 0.85, 0],
                x: [0, 3, -2, 4, 0],
                rotateZ: [-2.5, 2.5, -2.5],
              }}
              transition={{
                duration: product.floatDuration,
                delay: product.floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Product chip button */}
              <Link
                href={product.to}
                aria-label={
                  product.status === "live"
                    ? `Open ${product.name}`
                    : `${product.name} — coming soon, get in touch`
                }
              >
                <motion.div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-100 cursor-pointer select-none shadow-lg"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: product.floatDelay + 0.25,
                    type: "spring",
                    stiffness: 220,
                    damping: 16,
                  }}
                  whileHover={{
                    scale: 1.14,
                    rotateY: 22,
                    rotateX: -12,
                    z: 40,
                    boxShadow: `0 16px 32px ${product.color}44, 0 4px 12px rgba(15,16,53,0.12)`,
                    borderColor: `${product.color}55`,
                    transition: { type: "spring", stiffness: 300, damping: 12 },
                  }}
                  whileTap={{ scale: 1.05 }}
                >
                  <motion.span
                    className="inline-block w-2 h-2 rounded-full shrink-0"
                    style={{ background: product.color }}
                    animate={{
                      scale: [1, 1.35, 1],
                      boxShadow: [
                        `0 0 0 0 ${product.color}00`,
                        `0 0 0 4px ${product.color}33`,
                        `0 0 0 0 ${product.color}00`,
                      ],
                    }}
                    transition={{
                      duration: 2.4,
                      delay: product.floatDelay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="font-['Figtree',sans-serif] font-semibold text-[13px] text-[var(--brand-ink)] whitespace-nowrap">
                    {product.name}
                  </span>
                  <span
                    className="font-['Figtree',sans-serif] font-bold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wide"
                    style={{
                      color: product.status === "live" ? product.color : "#999",
                      background:
                        product.status === "live"
                          ? `${product.color}18`
                          : "#f3f4f6",
                    }}
                  >
                    {product.status === "live" ? "Live" : "Soon"}
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        );
      })}
    </div>
    </MotionConfig>
  );
}
