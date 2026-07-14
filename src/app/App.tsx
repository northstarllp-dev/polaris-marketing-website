import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Check, Menu, X, Star, Zap, Shield, Layers, Users,
  BarChart3, MessageSquare, Calendar, FileText, Smartphone, ChevronDown,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Products", hasChevron: true },
  { label: "Solutions", hasChevron: true },
  { label: "Pricing", hasChevron: false },
  { label: "Resources", hasChevron: true },
];

const TABS = [
  {
    id: "enquiries",
    label: "Enquiries & CRM",
    color: "#ff7043",
    rows: [
      { job: "Emirates Mall LED Sign", client: "Al Futtaim Group", value: "AED 48,500", status: "New", statusColor: "#6161ff" },
      { job: "Expo 2025 Banners", client: "Dubai Tourism", value: "AED 22,000", status: "Quoted", statusColor: "#f59e0b" },
      { job: "DIFC Office Wrap", client: "JLL MENA", value: "AED 67,000", status: "Won", statusColor: "#10b981" },
      { job: "Al Quoz Fleet Graphics", client: "Arabian Motors", value: "AED 14,800", status: "New", statusColor: "#6161ff" },
      { job: "Marina Walk Wayfinding", client: "Emaar Properties", value: "AED 91,200", status: "In Review", statusColor: "#8b5cf6" },
    ],
  },
  {
    id: "production",
    label: "Production",
    color: "#6161ff",
    rows: [
      { job: "Emirates Mall LED Sign", client: "Printing — 75%", value: "Due 18 Jul", status: "On Track", statusColor: "#10b981" },
      { job: "Expo 2025 Banners", client: "Design Review", value: "Due 16 Jul", status: "Pending", statusColor: "#f59e0b" },
      { job: "DIFC Office Wrap", client: "Installation", value: "Due 20 Jul", status: "On Track", statusColor: "#10b981" },
      { job: "Marina Walk Wayfinding", client: "Fabrication — 40%", value: "Due 25 Jul", status: "At Risk", statusColor: "#ef4444" },
    ],
  },
  {
    id: "approvals",
    label: "Design Approvals",
    color: "#8b5cf6",
    rows: [
      { job: "Emirates Mall LED Sign", client: "Sent via portal", value: "2h ago", status: "Awaiting", statusColor: "#f59e0b" },
      { job: "DIFC Office Wrap", client: "Customer approved", value: "Yesterday", status: "Approved", statusColor: "#10b981" },
      { job: "Marina Walk Wayfinding", client: "Revision requested", value: "3h ago", status: "Changes", statusColor: "#ef4444" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    color: "#10b981",
    stats: [
      { label: "Revenue This Month", value: "AED 243,500", change: "+18%", up: true },
      { label: "Jobs Completed", value: "47", change: "+12%", up: true },
      { label: "Avg. Turnaround", value: "4.2 days", change: "-0.8d", up: true },
      { label: "Customer Satisfaction", value: "4.8 / 5", change: "+0.2", up: true },
    ],
  },
];

const MARQUEE_CLIENTS = [
  "Emaar", "Al Futtaim", "DAMAC", "Majid Al Futtaim", "Aldar", "Meraas",
  "Dubai Tourism", "DP World", "Abu Dhabi Ports", "Lulu Hypermarket",
];

const PRINTOMS_FEATURES = [
  { icon: <Users size={16} />, label: "Customer CRM" },
  { icon: <FileText size={16} />, label: "Quotations" },
  { icon: <Check size={16} />, label: "Design Approval" },
  { icon: <BarChart3 size={16} />, label: "Production Tracking" },
  { icon: <Calendar size={16} />, label: "Installation Scheduling" },
  { icon: <Smartphone size={16} />, label: "Customer Portal" },
  { icon: <BarChart3 size={16} />, label: "Analytics" },
  { icon: <MessageSquare size={16} />, label: "Automated WhatsApp" },
];

const AI_CARDS = [
  { title: "AI Reports", desc: "Auto-generated performance summaries across jobs, teams, and timelines.", gradient: "from-violet-500 to-indigo-600" },
  { title: "AI Insights", desc: "Surface trends, bottlenecks, and opportunities before they become problems.", gradient: "from-blue-500 to-cyan-500" },
  { title: "AI Assistant", desc: "Ask questions, get answers, and take action — without leaving Polaris.", gradient: "from-indigo-500 to-purple-600" },
  { title: "AI Workflow Automation", desc: "Let AI design and trigger workflows based on how your business actually runs.", gradient: "from-purple-500 to-pink-500" },
];

const WHY_CARDS = [
  { icon: <Layers size={26} className="text-[#6161ff]" />, title: "Purpose Built", points: ["Designed around real operational workflows.", "Not generic CRM tools."] },
  { icon: <Zap size={26} className="text-[#6161ff]" />, title: "Modern Experience", points: ["Fast.", "Beautiful.", "Easy to learn."] },
  { icon: <Shield size={26} className="text-[#6161ff]" />, title: "Enterprise Ready", points: ["Permissions", "Security", "Audit logs", "Scalable architecture"] },
];

const PRODUCTS_COMING = [
  { name: "InventoryOS", icon: "📦", desc: "Inventory & stock management" },
  { name: "FieldOps", icon: "🚗", desc: "Field operations & dispatch" },
  { name: "ServiceDesk", icon: "🎧", desc: "Customer support ticketing" },
  { name: "Finance Suite", icon: "💰", desc: "Billing & financial reporting" },
  { name: "HR Suite", icon: "👥", desc: "People & payroll management" },
  { name: "AI Workspace", icon: "✨", desc: "AI-native productivity layer" },
];

const FOOTER_LINKS = {
  Products: ["PrintOMS", "Future Products"],
  Resources: ["Blog", "Documentation", "Roadmap"],
  Company: ["About", "Careers", "Contact", "Privacy"],
};

// ─── Nav ────────────────────────────────────────────────────────────────────

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200"
      style={{ boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.08)" : "0 1px 0 rgba(0,0,0,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img src="/light withoutbg.png" alt="Polaris Logo" className="h-30 object-contain" />
        </a>

        {/* Center links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ label, hasChevron }) => (
            <button
              key={label}
              className="flex items-center gap-0.5 font-['Figtree',sans-serif] text-[14px] font-medium text-[#333] hover:text-[#6161ff] transition-colors px-3 py-2 rounded-lg hover:bg-[#f5f5ff]"
            >
              {label}
              {hasChevron && <ChevronDown size={13} className="opacity-50 mt-px" />}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a href="#" className="font-['Figtree',sans-serif] text-[14px] font-medium text-[#555] hover:text-[#333] transition-colors px-3 py-2">
            Log in
          </a>
          <a href="#" className="font-['Figtree',sans-serif] text-[14px] font-medium text-[#555] hover:text-[#333] transition-colors px-3 py-2">
            Contact sales
          </a>
          <a
            href="#"
            className="font-['Figtree',sans-serif] text-[13px] font-semibold bg-[#ff7043] text-white px-5 py-2.5 rounded-full hover:bg-[#f4622d] transition-colors flex items-center gap-1.5 ml-1"
          >
            Get Started <ArrowRight size={14} />
          </a>
        </div>

        <button className="lg:hidden text-[#333] p-1" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[rgba(0,0,0,0.06)] px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label }) => (
            <a key={label} href="#" className="font-['Figtree',sans-serif] text-[15px] font-medium text-[#333] py-2.5 border-b border-[rgba(0,0,0,0.05)] last:border-0">
              {label}
            </a>
          ))}
          <a href="#" className="font-['Figtree',sans-serif] text-[14px] font-semibold bg-[#ff7043] text-white px-5 py-3 rounded-full text-center mt-4">
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function ProductMockup({ activeTab }: { activeTab: number }) {
  const tab = TABS[activeTab];

  return (
    <div className="bg-[#0d0e24] rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-white/3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <div className="ml-3 h-4 w-36 bg-white/6 rounded" />
      </div>

      {/* App layout */}
      <div className="flex h-[340px] md:h-[400px]">
        {/* Sidebar */}
        <div className="w-40 border-r border-white/6 p-3 flex-col gap-1 hidden md:flex shrink-0">
          {["Dashboard", "Enquiries", "Quotations", "Production", "Approvals", "Installations", "WhatsApp", "Analytics"].map((item, i) => (
            <div
              key={item}
              className="px-3 py-1.5 rounded-lg text-[11px] font-['Figtree',sans-serif] font-medium transition-colors"
              style={
                ["Enquiries", "Production", "Approvals", "Analytics"][activeTab] === item
                  ? { backgroundColor: `${tab.color}22`, color: tab.color }
                  : { color: "rgba(255,255,255,0.35)" }
              }
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/6">
            <span className="font-['Figtree',sans-serif] font-bold text-[13px] text-white/80">{tab.label}</span>
            <div className="flex items-center gap-2">
              <div className="h-6 w-16 bg-white/6 rounded-md" />
              <div className="h-6 w-20 rounded-full flex items-center justify-center text-[10px] font-['Figtree',sans-serif] font-semibold text-white" style={{ backgroundColor: tab.color }}>
                + New Item
              </div>
            </div>
          </div>

          {/* Table / Stats content */}
          <div className="flex-1 overflow-hidden p-3">
            {tab.stats ? (
              <div className="grid grid-cols-2 gap-3 h-full content-start">
                {tab.stats.map(({ label, value, change, up }) => (
                  <div key={label} className="bg-white/4 rounded-xl p-4 border border-white/6">
                    <div className="text-white/40 text-[11px] font-['Figtree',sans-serif] mb-2">{label}</div>
                    <div className="font-['Figtree',sans-serif] font-bold text-[22px] text-white mb-1">{value}</div>
                    <div className="font-['Figtree',sans-serif] text-[11px] font-semibold" style={{ color: up ? "#10b981" : "#ef4444" }}>
                      {change} vs last month
                    </div>
                  </div>
                ))}
                <div className="col-span-2 bg-white/4 rounded-xl p-4 border border-white/6">
                  <div className="text-white/40 text-[11px] font-['Figtree',sans-serif] mb-3">Revenue trend</div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[40, 55, 48, 62, 58, 75, 82, 70, 88, 95, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: `${tab.color}${i === 11 ? "ff" : "88"}` }} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-px">
                {/* Header row */}
                <div className="grid text-[10px] font-['Figtree',sans-serif] font-semibold text-white/30 uppercase tracking-wide px-3 py-1.5" style={{ gridTemplateColumns: "1fr 1fr auto auto" }}>
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
                    <span className="text-white/50 text-right pr-4 whitespace-nowrap">{value}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveTab((t) => (t + 1) % TABS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-[#0f1035] overflow-hidden pt-24 pb-0">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(ellipse, #6161ff 0%, transparent 70%)" }} />
        <div className="absolute top-[200px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)" }} />
        <div className="absolute top-[150px] right-[-80px] w-[350px] h-[350px] rounded-full opacity-12"
          style={{ background: "radial-gradient(ellipse, #ff7043 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative pt-10 pb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-white/15 text-white/70 text-[12px] font-['Figtree',sans-serif] font-semibold px-4 py-1.5 rounded-full mb-8 bg-white/5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff7043] animate-pulse" />
          PrintOMS is now live — built for signage &amp; print businesses
        </div>

        {/* Headline */}
        <h1 className="font-['Figtree',sans-serif] font-black text-white leading-[1.06] tracking-tight mb-6"
          style={{ fontSize: "clamp(42px, 6.5vw, 72px)" }}>
          Software that runs your<br />
          business from enquiry<br />
          <span style={{ color: "#ff7043" }}>to delivery.</span>
        </h1>

        {/* Sub */}
        <p className="font-['Figtree',sans-serif] font-normal text-white/55 max-w-xl mx-auto leading-relaxed mb-10"
          style={{ fontSize: "clamp(15px, 1.8vw, 18px)" }}>
          One connected workspace for signage, print shops, fabrication, manufacturing &amp; service businesses.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <a href="#"
            className="font-['Figtree',sans-serif] font-bold text-[15px] bg-[#ff7043] text-white px-8 py-3.5 rounded-full hover:bg-[#f4622d] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 shadow-lg shadow-[#ff7043]/30">
            Start Free Demo <ArrowRight size={16} />
          </a>
          <a href="#"
            className="font-['Figtree',sans-serif] font-semibold text-[15px] text-white/70 border border-white/20 px-8 py-3.5 rounded-full hover:border-white/40 hover:text-white transition-all">
            Explore Products
          </a>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-1 mb-6 flex-wrap">
          {TABS.map(({ id, label, color }, i) => (
            <button
              key={id}
              onClick={() => setActiveTab(i)}
              className="font-['Figtree',sans-serif] text-[12px] font-semibold px-4 py-1.5 rounded-full transition-all"
              style={
                activeTab === i
                  ? { backgroundColor: color, color: "#fff" }
                  : { backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Product mockup — bleeds into next section */}
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="transition-all duration-500">
          <ProductMockup activeTab={activeTab} />
        </div>
        {/* Fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0f1035)" }} />
      </div>

      {/* Bottom curve into white */}
      <div className="h-16 md:h-24 bg-[#0f1035]" />
    </section>
  );
}

// ─── Marquee ────────────────────────────────────────────────────────────────

function Marquee() {
  return (
    <section className="bg-white border-y border-[rgba(0,0,0,0.06)] py-5 overflow-hidden">
      <p className="font-['Figtree',sans-serif] text-[11px] font-semibold text-[#bbb] text-center uppercase tracking-widest mb-4">
        Trusted by businesses across the region
      </p>
      <div className="relative overflow-hidden">
        <div
          className="flex gap-12 items-center w-max"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[...MARQUEE_CLIENTS, ...MARQUEE_CLIENTS].map((name, i) => (
            <span key={i} className="font-['Figtree',sans-serif] font-black text-[15px] text-[#d0d0d8] hover:text-[#999] transition-colors whitespace-nowrap">
              {name}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}

// ─── Products ───────────────────────────────────────────────────────────────

function Products() {
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[#6161ff] uppercase tracking-widest mb-3">Products</p>
          <h2 className="font-['Figtree',sans-serif] font-black text-[#1a1a2e] leading-tight" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Products built for modern businesses
          </h2>
        </div>

        {/* PrintOMS hero card */}
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] overflow-hidden shadow-sm mb-8">
          <div className="md:flex">
            <div className="md:w-[46%] p-10 md:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">⭐</span>
                <span className="font-['Figtree',sans-serif] font-bold text-[12px] text-[#6161ff] bg-[#f0f0ff] px-3 py-1 rounded-full">PrintOMS</span>
                <span className="font-['Figtree',sans-serif] text-[10px] font-bold text-white bg-[#10b981] px-2.5 py-0.5 rounded-full uppercase tracking-wide">Live</span>
              </div>
              <h3 className="font-['Figtree',sans-serif] font-black text-[#1a1a2e] leading-tight mb-4" style={{ fontSize: "clamp(22px, 2.5vw, 30px)" }}>
                The complete operating system for signage and printing businesses.
              </h3>
              <p className="font-['Figtree',sans-serif] font-normal text-[15px] text-[#666] mb-8 leading-relaxed">
                Replace WhatsApp threads, Excel sheets, and disconnected tools with one centralized platform. Manage every stage of the customer journey.
              </p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
                {PRINTOMS_FEATURES.map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 text-[13px] font-['Figtree',sans-serif] font-semibold text-[#444]">
                    <span className="text-[#6161ff] shrink-0">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
              <a href="#" className="inline-flex items-center gap-2 font-['Figtree',sans-serif] font-bold text-[14px] bg-[#6161ff] text-white px-7 py-3 rounded-full hover:bg-[#5252ee] transition-colors self-start">
                Learn More <ArrowRight size={14} />
              </a>
            </div>
            <div className="md:w-[54%] bg-gradient-to-br from-[#0f1035] to-[#1e1f5e] p-8 flex items-center justify-center min-h-[320px]">
              <div className="w-full max-w-sm space-y-3">
                <div className="bg-white/8 rounded-xl p-4 border border-white/6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/50 text-[11px] font-['Figtree',sans-serif]">Incoming Enquiry</span>
                    <span className="bg-[#6161ff] text-white text-[9px] font-['Figtree',sans-serif] font-bold px-2 py-0.5 rounded-full uppercase">New</span>
                  </div>
                  <div className="text-white font-['Figtree',sans-serif] font-bold text-[14px] mb-0.5">Emirates Mall LED Signage</div>
                  <div className="text-white/40 text-[11px] font-['Figtree',sans-serif]">Al Futtaim Group &bull; AED 48,500</div>
                </div>
                <div className="flex gap-1.5">
                  {["Enquiry", "Quote", "Approval", "Production", "Install"].map((s, i) => (
                    <div key={s} className="flex-1 text-center">
                      <div className={`h-1 rounded-full mb-1 ${i <= 2 ? "bg-[#6161ff]" : "bg-white/10"}`} />
                      <div className="text-[9px] font-['Figtree',sans-serif] text-white/30">{s}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#075e54]/50 rounded-xl p-3 border border-[#075e54]/30">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MessageSquare size={11} className="text-[#25d366]" />
                    <span className="text-white/40 text-[10px] font-['Figtree',sans-serif] font-semibold">WhatsApp — Sent automatically</span>
                  </div>
                  <p className="text-white/70 text-[11px] font-['Figtree',sans-serif] leading-relaxed">
                    &ldquo;Hi Ahmed, your design proof is ready. Tap to approve: polaris.app/approve/em-001&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming soon grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PRODUCTS_COMING.map(({ name, icon, desc }) => (
            <div key={name} className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] p-6 flex flex-col gap-3 hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{icon}</span>
                <span className="text-[10px] font-['Figtree',sans-serif] font-bold text-[#bbb] bg-[#f4f4f8] px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                  Coming Soon
                </span>
              </div>
              <div>
                <div className="font-['Figtree',sans-serif] font-black text-[15px] text-[#1a1a2e] group-hover:text-[#6161ff] transition-colors">{name}</div>
                <div className="font-['Figtree',sans-serif] font-normal text-[13px] text-[#888] mt-1">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PrintOMS Deep ──────────────────────────────────────────────────────────

function PrintOMSDeep() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="md:flex items-center gap-20">
          <div className="md:w-[45%] mb-12 md:mb-0">
            <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[#6161ff] uppercase tracking-widest mb-3">PrintOMS</p>
            <h2 className="font-['Figtree',sans-serif] font-black text-[#1a1a2e] leading-tight mb-5" style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}>
              The complete operating system for signage businesses.
            </h2>
            <p className="font-['Figtree',sans-serif] font-normal text-[16px] text-[#666] leading-relaxed mb-4">
              PrintOMS replaces WhatsApp conversations, Excel sheets, PDFs and disconnected software with one centralized platform.
            </p>
            <p className="font-['Figtree',sans-serif] font-normal text-[16px] text-[#666] leading-relaxed">
              Manage every stage of your customer&apos;s journey from one dashboard.
            </p>
          </div>
          <div className="md:w-[55%] grid grid-cols-2 gap-4">
            {[
              { stage: "Enquiry", desc: "Capture leads from any channel into a unified inbox", color: "#ff7043", icon: "📥" },
              { stage: "Quotation", desc: "Generate professional quotes with line items in minutes", color: "#8b5cf6", icon: "📄" },
              { stage: "Design Approval", desc: "Send proofs and collect approvals via customer portal", color: "#f59e0b", icon: "✅" },
              { stage: "Production", desc: "Track jobs through each stage in real time", color: "#6161ff", icon: "🏭" },
              { stage: "Installation", desc: "Schedule site visits and log completion with photos", color: "#0085ff", icon: "📍" },
              { stage: "Analytics", desc: "Revenue, turnaround time, and team performance", color: "#10b981", icon: "📊" },
            ].map(({ stage, desc, color, icon }) => (
              <div key={stage} className="border border-[rgba(0,0,0,0.07)] rounded-xl p-4 hover:shadow-md transition-shadow group cursor-default">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{icon}</span>
                  <span className="font-['Figtree',sans-serif] font-bold text-[13px] group-hover:opacity-100" style={{ color }}>{stage}</span>
                </div>
                <p className="font-['Figtree',sans-serif] font-normal text-[12px] text-[#666] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AI ─────────────────────────────────────────────────────────────────────

function AISection() {
  return (
    <section className="py-24 bg-[#0f1035] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20 rounded-full"
          style={{ background: "radial-gradient(ellipse, #6161ff, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-15 rounded-full"
          style={{ background: "radial-gradient(ellipse, #8b5cf6, transparent 70%)" }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/8 text-white/70 text-[12px] font-['Figtree',sans-serif] font-semibold px-4 py-1.5 rounded-full mb-5">
            <Zap size={12} className="text-yellow-400" /> AI-powered
          </div>
          <h2 className="font-['Figtree',sans-serif] font-black text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 46px)" }}>
            AI is becoming part of<br />every Polaris product.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AI_CARDS.map(({ title, desc, gradient }) => (
            <div key={title} className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/8 transition-colors group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <Zap size={17} className="text-white" />
              </div>
              <h3 className="font-['Figtree',sans-serif] font-black text-[16px] text-white mb-2">{title}</h3>
              <p className="font-['Figtree',sans-serif] font-normal text-[13px] text-white/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Polaris ─────────────────────────────────────────────────────────────

function WhyPolaris() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[#6161ff] uppercase tracking-widest mb-3">Why Polaris</p>
          <h2 className="font-['Figtree',sans-serif] font-black text-[#1a1a2e] leading-tight" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Built different. By design.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CARDS.map(({ icon, title, points }) => (
            <div key={title} className="text-center p-8 rounded-2xl border border-[rgba(0,0,0,0.07)] hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-[#f0f0ff] rounded-2xl flex items-center justify-center mx-auto mb-5">
                {icon}
              </div>
              <h3 className="font-['Figtree',sans-serif] font-black text-[20px] text-[#1a1a2e] mb-4">{title}</h3>
              <div className="flex flex-col gap-1.5">
                {points.map((p) => (
                  <p key={p} className="font-['Figtree',sans-serif] font-normal text-[15px] text-[#666]">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="py-28 relative overflow-hidden bg-[#0f1035]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, #6161ff55 0%, transparent 70%)" }} />
      </div>
      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <h2 className="font-['Figtree',sans-serif] font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
          Ready to modernize<br />your business?
        </h2>
        <p className="font-['Figtree',sans-serif] font-normal text-[17px] text-white/50 mb-10">
          Book a demo today. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#"
            className="font-['Figtree',sans-serif] font-bold text-[15px] bg-[#ff7043] text-white px-9 py-4 rounded-full hover:bg-[#f4622d] transition-all hover:scale-[1.02] flex items-center gap-2 shadow-xl shadow-[#ff7043]/30">
            Book Demo <ArrowRight size={16} />
          </a>
          <a href="#"
            className="font-['Figtree',sans-serif] font-semibold text-[15px] text-white/60 border border-white/20 px-9 py-4 rounded-full hover:border-white/40 hover:text-white transition-all">
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#08091f] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/Dark withoutbg.png" alt="Polaris Logo" className="h-30 object-contain" />
            </div>
            <p className="font-['Figtree',sans-serif] font-normal text-[13px] text-white/30 leading-relaxed max-w-[180px]">
              Build Better Businesses.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-['Figtree',sans-serif] font-black text-[11px] text-white/40 mb-5 uppercase tracking-widest">{section}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-['Figtree',sans-serif] font-normal text-[14px] text-white/40 hover:text-white/80 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['Figtree',sans-serif] font-normal text-[12px] text-white/25">© 2025 Polaris. All rights reserved.</p>
          <p className="font-['Figtree',sans-serif] font-normal text-[12px] text-white/25">The operating system for modern businesses.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <PrintOMSDeep />
        <AISection />
        <WhyPolaris />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
