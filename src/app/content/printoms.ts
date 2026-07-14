export type MockupRow = {
  job: string;
  client: string;
  value: string;
  status: string;
  statusColor: string;
};

export type MockupTab = {
  id: string;
  label: string;
  color: string;
  sidebarKey: string;
  rows?: MockupRow[];
  stats?: { label: string; value: string; change: string; up: boolean }[];
};

export const MOCKUP_TABS: MockupTab[] = [
  {
    id: "enquiries",
    label: "Enquiries & CRM",
    color: "#ff7043",
    sidebarKey: "Enquiries",
    rows: [
      { job: "Emirates Mall LED Sign", client: "Al Futtaim Group", value: "AED 48,500", status: "New", statusColor: "#3b82f6" },
      { job: "Expo 2025 Banners", client: "Dubai Tourism", value: "AED 22,000", status: "Quoted", statusColor: "#f59e0b" },
      { job: "DIFC Office Wrap", client: "JLL MENA", value: "AED 67,000", status: "Won", statusColor: "#10b981" },
      { job: "Al Quoz Fleet Graphics", client: "Arabian Motors", value: "AED 14,800", status: "New", statusColor: "#3b82f6" },
      { job: "Marina Walk Wayfinding", client: "Emaar Properties", value: "AED 91,200", status: "In Review", statusColor: "#8b5cf6" },
    ],
  },
  {
    id: "site-visit",
    label: "Site Visit",
    color: "#0ea5e9",
    sidebarKey: "Site Visits",
    rows: [
      { job: "Emirates Mall LED Sign", client: "Recce scheduled", value: "Today 2pm", status: "Booked", statusColor: "#0ea5e9" },
      { job: "Marina Walk Wayfinding", client: "Measurements frozen", value: "3 locations", status: "Done", statusColor: "#10b981" },
      { job: "DIFC Office Wrap", client: "Awaiting access", value: "Tomorrow", status: "Pending", statusColor: "#f59e0b" },
    ],
  },
  {
    id: "production",
    label: "Production",
    color: "#3b82f6",
    sidebarKey: "Production",
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
    sidebarKey: "Approvals",
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
    sidebarKey: "Analytics",
    stats: [
      { label: "Revenue This Month", value: "AED 243,500", change: "+18%", up: true },
      { label: "Jobs Completed", value: "47", change: "+12%", up: true },
      { label: "Avg. Turnaround", value: "4.2 days", change: "-0.8d", up: true },
      { label: "Customer Satisfaction", value: "4.8 / 5", change: "+0.2", up: true },
    ],
  },
];

export const MOCKUP_SIDEBAR = [
  "Dashboard",
  "Enquiries",
  "Site Visits",
  "Quotations",
  "Production",
  "Approvals",
  "Installations",
  "WhatsApp",
  "Analytics",
];

export const WORKFLOW_STAGES = [
  {
    id: "enquiry",
    title: "Enquiry",
    desc: "Capture leads from Meta, website, phone, or walk-in into one inbox — then assign and convert.",
    color: "#ff7043",
  },
  {
    id: "site-visit",
    title: "Site Visit",
    desc: "Schedule recce, capture measurements and photos, freeze site data that feeds quoting and design.",
    color: "#0ea5e9",
  },
  {
    id: "quotation",
    title: "Quotation",
    desc: "Build catalog-based quotes with material pricing, send for portal approval, revise with a clear trail.",
    color: "#8b5cf6",
  },
  {
    id: "design",
    title: "Design Approval",
    desc: "Share proofs, collect pinpoint feedback, and lock design before anything hits the workshop.",
    color: "#f59e0b",
  },
  {
    id: "production",
    title: "Production",
    desc: "Track fabrication milestones — procurement, cutting, wiring, QC — with live job status.",
    color: "#3b82f6",
  },
  {
    id: "installation",
    title: "Installation",
    desc: "Schedule crews, run checklists, capture after photos, and collect digital sign-off on site.",
    color: "#0085ff",
  },
  {
    id: "analytics",
    title: "Analytics",
    desc: "See pipeline value, turnaround, lost reasons, and team performance in one view.",
    color: "#10b981",
  },
] as const;

export const CAPABILITIES = [
  {
    title: "Customer CRM",
    desc: "A directory built for signage jobs — history, contacts, and lifetime value in one place.",
  },
  {
    title: "Quotations",
    desc: "Catalog-driven quoting with measurements from site visits — not spreadsheet guesswork.",
  },
  {
    title: "Customer portal",
    desc: "Magic-link access for clients to approve quotes and designs, track progress, and schedule.",
  },
  {
    title: "Automated WhatsApp",
    desc: "Stage notifications that keep customers and teams aligned without chasing threads.",
  },
  {
    title: "Production tracking",
    desc: "Workshop milestones so owners know what is on track — and what is at risk.",
  },
  {
    title: "Installation scheduling",
    desc: "Dispatch crews with the context they need: access, scaffolding, photos, and sign-off.",
  },
  {
    title: "Analytics",
    desc: "Funnel, pipeline value, and operational KPIs for signage businesses.",
  },
] as const;

export const ROLES = [
  { title: "Owners & admins", desc: "Full pipeline visibility, stage locks, and overrides." },
  { title: "Sales & estimators", desc: "Quotes grounded in catalog and site measurements." },
  { title: "Designers", desc: "Proofs, revisions, and production file handoff." },
  { title: "Workshop", desc: "Milestone checklists from procurement through QC." },
  { title: "Install crews", desc: "Schedules, checklists, photos, and digital handover." },
  { title: "Customers", desc: "Portal access to approve, revise, and track without logins." },
] as const;

export const PAIN_POINTS = [
  {
    title: "Not built for signage",
    desc: "Generic CRMs ignore dimensions, substrates, mounting, and custom pricing.",
  },
  {
    title: "Disconnected tools",
    desc: "Leads live in WhatsApp. Quotes in Excel. Approvals in email. Production nowhere.",
  },
  {
    title: "Approval friction",
    desc: "Jobs start without clear consent on cost or design — then disputes follow.",
  },
  {
    title: "No operational view",
    desc: "Orders stall in production. Lost deals go untracked. Nobody owns the pipeline.",
  },
] as const;

export const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    price: "$99",
    period: "/month",
    blurb: "Perfect for growing print shops.",
    features: ["Up to 5 team members", "Unlimited enquiries", "Basic CRM", "Standard support"],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "$249",
    period: "/month",
    blurb: "For established signage businesses.",
    features: [
      "Unlimited team members",
      "Automated WhatsApp",
      "Production tracking",
      "Priority 24/7 support",
      "API access",
    ],
    popular: true,
  },
] as const;

export const PRINTOMS_FAQS = [
  {
    q: "Do I need technical skills to use PrintOMS?",
    a: "No. PrintOMS is built for sales, design, workshop, and install teams — not IT departments.",
  },
  {
    q: "Can PrintOMS integrate with accounting software?",
    a: "Yes. Keep finances in sync with popular accounting tools while PrintOMS runs operations.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams are live in under 24 hours. We help migrate customers, catalog, and open jobs.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Enterprise-grade encryption, permissions, and audit trails protect your business data.",
  },
  {
    q: "Is this just another CRM?",
    a: "No. PrintOMS is an order management system for custom signage — site visits, materials, fabrication, and install included.",
  },
] as const;
