import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { MOCKUP_SIDEBAR, MOCKUP_TABS } from "../content/printoms";
import { FadeIn } from "./motion/FadeIn";

export function ProductMockup({ activeTab }: { activeTab: number }) {
  const tab = MOCKUP_TABS[activeTab];

  return (
    <div className="bg-[#0d0e24] rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-white/3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <div className="ml-3 h-4 w-36 bg-white/6 rounded" />
      </div>

      <div className="flex h-[340px] md:h-[400px]">
        <div className="w-40 border-r border-white/6 p-3 flex-col gap-1 hidden md:flex shrink-0">
          {MOCKUP_SIDEBAR.map((item) => (
            <div
              key={item}
              className="px-3 py-1.5 rounded-lg text-[11px] font-['Figtree',sans-serif] font-medium transition-colors"
              style={
                tab.sidebarKey === item
                  ? { backgroundColor: `${tab.color}22`, color: tab.color }
                  : { color: "rgba(255,255,255,0.35)" }
              }
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/6">
            <span className="font-['Figtree',sans-serif] font-bold text-[13px] text-white/80">
              {tab.label}
            </span>
            <div className="flex items-center gap-2">
              <div className="h-6 w-16 bg-white/6 rounded-md" />
              <div
                className="h-6 w-20 rounded-full flex items-center justify-center text-[10px] font-['Figtree',sans-serif] font-semibold text-white"
                style={{ backgroundColor: tab.color }}
              >
                + New Item
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden p-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                {tab.stats ? (
                  <div className="grid grid-cols-2 gap-3 h-full content-start">
                    {tab.stats.map(({ label, value, change, up }) => (
                      <div
                        key={label}
                        className="bg-white/4 rounded-xl p-4 border border-white/6"
                      >
                        <div className="text-white/40 text-[11px] font-['Figtree',sans-serif] mb-2">
                          {label}
                        </div>
                        <div className="font-['Figtree',sans-serif] font-bold text-[22px] text-white mb-1">
                          {value}
                        </div>
                        <div
                          className="font-['Figtree',sans-serif] text-[11px] font-semibold"
                          style={{ color: up ? "#10b981" : "#ef4444" }}
                        >
                          {change} vs last month
                        </div>
                      </div>
                    ))}
                    <div className="col-span-2 bg-white/4 rounded-xl p-4 border border-white/6">
                      <div className="text-white/40 text-[11px] font-['Figtree',sans-serif] mb-3">
                        Revenue trend
                      </div>
                      <div className="flex items-end gap-1.5 h-16">
                        {[40, 55, 48, 62, 58, 75, 82, 70, 88, 95, 85, 100].map(
                          (h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm"
                              style={{
                                height: `${h}%`,
                                backgroundColor: `${tab.color}${i === 11 ? "ff" : "88"}`,
                              }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-px">
                    <div
                      className="grid text-[10px] font-['Figtree',sans-serif] font-semibold text-white/30 uppercase tracking-wide px-3 py-1.5"
                      style={{ gridTemplateColumns: "1fr 1fr auto auto" }}
                    >
                      <span>Job</span>
                      <span>Client / Stage</span>
                      <span className="text-right pr-4">Value / Date</span>
                      <span className="text-right w-20">Status</span>
                    </div>
                    {tab.rows?.map(({ job, client, value, status, statusColor }) => (
                      <div
                        key={job}
                        className="grid items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/4 transition-colors text-[11px] font-['Figtree',sans-serif]"
                        style={{ gridTemplateColumns: "1fr 1fr auto auto" }}
                      >
                        <span className="text-white/80 font-medium truncate">{job}</span>
                        <span className="text-white/40 truncate">{client}</span>
                        <span className="text-white/50 text-right pr-4 whitespace-nowrap">
                          {value}
                        </span>
                        <span
                          className="text-right text-[10px] font-semibold w-20 whitespace-nowrap"
                          style={{ color: statusColor }}
                        >
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Interactive showcase: preserved hero tab auto-cycle + ProductMockup */
export function ProductShowcase({
  dark = true,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setActiveTab((t) => (t + 1) % MOCKUP_TABS.length),
      3000
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <FadeIn className={className} y={40}>
      <div className="flex items-center justify-center gap-1 mb-6 flex-wrap">
        {MOCKUP_TABS.map(({ id, label, color }, i) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(i)}
            className="font-['Figtree',sans-serif] text-[12px] font-semibold px-4 py-1.5 rounded-full transition-all"
            style={
              activeTab === i
                ? { backgroundColor: color, color: "#fff" }
                : {
                    backgroundColor: dark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(15,16,53,0.06)",
                    color: dark ? "rgba(255,255,255,0.45)" : "rgba(15,16,53,0.45)",
                  }
            }
          >
            {label}
          </button>
        ))}
      </div>
      <div className="relative">
        <ProductMockup activeTab={activeTab} />
      </div>
    </FadeIn>
  );
}
