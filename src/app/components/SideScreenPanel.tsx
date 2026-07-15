"use client";

/**
 * SideScreenPanel , auto-cycling decorative app-screen panels shown to
 * the left/right of the central ProductMockup in the PrintOMSHero 3-panel layout.
 * All values are in Indian Rupees (₹).
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// ─── Left panel data (Purchase Order cards) ─────────────────────────────────
const LEFT_SLIDES = [
  {
    id: "po1",
    ref: "PO-01718",
    status: "Approved",
    statusColor: "#10b981",
    vendor: "SignPrint Supplies",
    date: "18 Oct 2024",
    delivery: "25 Oct 2024",
    items: [
      { item: "Vinyl Roll 3M", qty: "4", total: "₹26,800" },
      { item: "Laminate Sheet", qty: "10", total: "₹15,100" },
    ],
    total: "₹41,900",
  },
  {
    id: "po2",
    ref: "PO-02341",
    status: "Pending",
    statusColor: "#f59e0b",
    vendor: "AluGraphics India",
    date: "3 Nov 2024",
    delivery: "10 Nov 2024",
    items: [
      { item: "Aluminium Sheet 4×8", qty: "6", total: "₹38,400" },
      { item: "UV Ink Cartridge", qty: "2", total: "₹11,200" },
    ],
    total: "₹49,600",
  },
  {
    id: "po3",
    ref: "PO-03107",
    status: "Approved",
    statusColor: "#10b981",
    vendor: "PrintTech Chennai",
    date: "19 Nov 2024",
    delivery: "26 Nov 2024",
    items: [
      { item: "Flex Banner Roll", qty: "3", total: "₹8,700" },
      { item: "Solvent Ink Set", qty: "1", total: "₹6,500" },
    ],
    total: "₹15,200",
  },
];

// ─── Right panel data (Install Job cards) ────────────────────────────────────
const RIGHT_SLIDES = [
  {
    id: "inv1",
    ref: "INV-170983",
    status: "In Progress",
    statusColor: "#0ea5e9",
    balanceDue: "₹63,000",
    items: "3 panels",
    note: "Site photo uploaded",
    verified: true,
  },
  {
    id: "inv2",
    ref: "INV-171340",
    status: "Scheduled",
    statusColor: "#a78bfa",
    balanceDue: "₹1,14,500",
    items: "7 panels",
    note: "Awaiting client sign-off",
    verified: false,
  },
  {
    id: "inv3",
    ref: "INV-172009",
    status: "Completed",
    statusColor: "#10b981",
    balanceDue: "₹0",
    items: "5 panels",
    note: "All photos verified",
    verified: true,
  },
];

// ─── Window chrome shared ────────────────────────────────────────────────────
function Chrome() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/6 bg-white/3 shrink-0">
      <div className="w-2 h-2 rounded-full bg-red-500/60" />
      <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
      <div className="w-2 h-2 rounded-full bg-green-500/60" />
    </div>
  );
}

// ─── Left panel ──────────────────────────────────────────────────────────────
function LeftPanel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % LEFT_SLIDES.length), 3500);
    return () => clearInterval(id);
  }, []);

  const slide = LEFT_SLIDES[idx];

  return (
    <div className="bg-[#0d0e24] rounded-xl border border-white/8 shadow-2xl overflow-hidden text-white h-[320px] flex flex-col">
      <Chrome />
      <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 h-full"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] text-white/40 font-['Figtree',sans-serif] uppercase tracking-widest">Purchase Order</p>
                <p className="text-[13px] font-bold font-['Figtree',sans-serif] text-white mt-0.5">{slide.ref}</p>
              </div>
              <span
                className="text-[9px] font-semibold font-['Figtree',sans-serif] px-2 py-0.5 rounded-full border"
                style={{ color: slide.statusColor, backgroundColor: `${slide.statusColor}22`, borderColor: `${slide.statusColor}44` }}
              >
                {slide.status}
              </span>
            </div>

            <div className="h-px bg-white/6" />

            {/* Meta */}
            <div className="flex flex-col gap-2">
              {[
                { label: "Vendor", value: slide.vendor },
                { label: "Date", value: slide.date },
                { label: "Delivery", value: slide.delivery },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[10px] text-white/35 font-['Figtree',sans-serif]">{label}</span>
                  <span className="text-[10px] text-white/70 font-['Figtree',sans-serif] font-medium">{value}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/6" />

            {/* Line items */}
            <div className="flex flex-col gap-1.5">
              <div className="grid grid-cols-3 text-[9px] text-white/30 font-['Figtree',sans-serif] uppercase tracking-wide px-1">
                <span>Item</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Total</span>
              </div>
              {slide.items.map(({ item, qty, total }) => (
                <div key={item} className="grid grid-cols-3 text-[10px] font-['Figtree',sans-serif] px-1 py-1 rounded-md bg-white/3">
                  <span className="text-white/70 truncate">{item}</span>
                  <span className="text-center text-white/50">{qty}</span>
                  <span className="text-right text-white font-semibold">{total}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-auto flex items-center justify-between border-t border-white/6 pt-2">
              <span className="text-[10px] text-white/40 font-['Figtree',sans-serif]">Order Total</span>
              <span className="text-[14px] font-black text-[#ff7043] font-['Figtree',sans-serif]">{slide.total}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Right panel ─────────────────────────────────────────────────────────────
function RightPanel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % RIGHT_SLIDES.length), 3500);
    return () => clearInterval(id);
  }, []);

  const slide = RIGHT_SLIDES[idx];

  return (
    <div className="bg-[#0d0e24] rounded-xl border border-white/8 shadow-2xl overflow-hidden text-white h-[320px] flex flex-col">
      <Chrome />
      <div className="flex-1 flex flex-col gap-3 overflow-hidden p-4 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 h-full"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] text-white/40 font-['Figtree',sans-serif] uppercase tracking-widest">Install Job</p>
                <p className="text-[13px] font-bold font-['Figtree',sans-serif] text-white mt-0.5">{slide.ref}</p>
              </div>
              <span
                className="text-[9px] font-semibold font-['Figtree',sans-serif] px-2 py-0.5 rounded-full border"
                style={{ color: slide.statusColor, backgroundColor: `${slide.statusColor}22`, borderColor: `${slide.statusColor}44` }}
              >
                {slide.status}
              </span>
            </div>

            {/* Photo placeholder */}
            <div
              className="rounded-lg flex-1 min-h-0 flex items-end p-2.5 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1a1f4e 0%, #0f1035 100%)" }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(255,255,255,0.08) 14px, rgba(255,255,255,0.08) 15px), repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(255,255,255,0.08) 14px, rgba(255,255,255,0.08) 15px)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <div className="relative z-10 flex items-center justify-between w-full">
                <span className="text-[9px] text-white/50 font-['Figtree',sans-serif]">{slide.note}</span>
                {slide.verified && (
                  <span className="text-[9px] font-semibold text-[#10b981] font-['Figtree',sans-serif]">✓ Verified</span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Balance Due", value: slide.balanceDue, color: "#ff7043" },
                { label: "Items", value: slide.items, color: "#0ea5e9" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white/4 rounded-lg p-2 border border-white/6">
                  <p className="text-[9px] text-white/35 font-['Figtree',sans-serif] mb-0.5">{label}</p>
                  <p className="text-[12px] font-bold font-['Figtree',sans-serif]" style={{ color }}>{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SideScreenPanel({ variant }: { variant: "left" | "right" }) {
  return variant === "left" ? <LeftPanel /> : <RightPanel />;
}

