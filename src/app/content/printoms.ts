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
      { job: "Phoenix Mall LED Sign", client: "Landmark Group", value: "₹4,05,000", status: "New", statusColor: "#3b82f6" },
      { job: "Metro Station Banners", client: "Chennai Metro Rail", value: "₹1,84,000", status: "Quoted", statusColor: "#f59e0b" },
      { job: "IT Park Office Wrap", client: "Prestige Estates", value: "₹5,60,000", status: "Won", statusColor: "#10b981" },
      { job: "Fleet Graphics – 12 vans", client: "Delhivery Logistics", value: "₹1,23,500", status: "New", statusColor: "#3b82f6" },
      { job: "Marina Mall Wayfinding", client: "DLF Properties", value: "₹7,62,000", status: "In Review", statusColor: "#8b5cf6" },
    ],
  },
  {
    id: "site-visit",
    label: "Site Visit",
    color: "#0ea5e9",
    sidebarKey: "Site Visits",
    rows: [
      { job: "Phoenix Mall LED Sign", client: "Recce scheduled", value: "Today 2pm", status: "Booked", statusColor: "#0ea5e9" },
      { job: "Marina Mall Wayfinding", client: "Measurements frozen", value: "3 locations", status: "Done", statusColor: "#10b981" },
      { job: "IT Park Office Wrap", client: "Awaiting access", value: "Tomorrow", status: "Pending", statusColor: "#f59e0b" },
    ],
  },
  {
    id: "quotation",
    label: "Quotation",
    color: "#f59e0b",
    sidebarKey: "Quotations",
    rows: [
      { job: "Phoenix Mall LED Sign", client: "Sent · awaiting approval", value: "₹4,05,000", status: "Sent", statusColor: "#f59e0b" },
      { job: "Metro Station Banners", client: "Revision requested", value: "₹1,84,000", status: "Revising", statusColor: "#ef4444" },
      { job: "IT Park Office Wrap", client: "Approved via portal", value: "₹5,60,000", status: "Approved", statusColor: "#10b981" },
      { job: "Fleet Graphics – 12 vans", client: "Draft · from site visit", value: "₹1,23,500", status: "Draft", statusColor: "#8b5cf6" },
    ],
  },
  {
    id: "production",
    label: "Production",
    color: "#3b82f6",
    sidebarKey: "Production",
    rows: [
      { job: "Phoenix Mall LED Sign", client: "Printing , 75%", value: "Due 18 Jul", status: "On Track", statusColor: "#10b981" },
      { job: "Metro Station Banners", client: "Design Review", value: "Due 16 Jul", status: "Pending", statusColor: "#f59e0b" },
      { job: "IT Park Office Wrap", client: "Installation", value: "Due 20 Jul", status: "On Track", statusColor: "#10b981" },
      { job: "Marina Mall Wayfinding", client: "Fabrication , 40%", value: "Due 25 Jul", status: "At Risk", statusColor: "#ef4444" },
    ],
  },
  {
    id: "approvals",
    label: "Design Approvals",
    color: "#8b5cf6",
    sidebarKey: "Approvals",
    rows: [
      { job: "Phoenix Mall LED Sign", client: "Sent via portal", value: "2h ago", status: "Awaiting", statusColor: "#f59e0b" },
      { job: "IT Park Office Wrap", client: "Customer approved", value: "Yesterday", status: "Approved", statusColor: "#10b981" },
      { job: "Marina Mall Wayfinding", client: "Revision requested", value: "3h ago", status: "Changes", statusColor: "#ef4444" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    color: "#10b981",
    sidebarKey: "Analytics",
    stats: [
      { label: "Revenue This Month", value: "₹20,35,000", change: "+18%", up: true },
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
    desc: "Capture leads from Meta, website, phone, or walk-in into one inbox.",
    color: "#ff7043",
  },
  {
    id: "site-visit",
    title: "Site Visit",
    desc: "Schedule recce, capture measurements and photos that feed quoting.",
    color: "#0ea5e9",
  },
  {
    id: "quotation",
    title: "Quotation",
    desc: "Build catalog-based quotes and send for portal approval.",
    color: "#8b5cf6",
  },
  {
    id: "approval",
    title: "Customer Approval",
    desc: "Clients approve cost and design from the portal — no buried emails.",
    color: "#f59e0b",
  },
  {
    id: "design",
    title: "Design",
    desc: "Share proofs, collect feedback, lock files before production.",
    color: "#ec4899",
  },
  {
    id: "production",
    title: "Production",
    desc: "Track cutting, printing, fabrication, and QC with live status.",
    color: "#3b82f6",
  },
  {
    id: "installation",
    title: "Installation",
    desc: "Schedule crews, checklists, after photos, and digital sign-off.",
    color: "#0085ff",
  },
  {
    id: "completed",
    title: "Completed",
    desc: "Job closed, portal updated, analytics recorded.",
    color: "#10b981",
  },
] as const;

export const OUTCOMES = [
  { title: "Save Time", desc: "One workspace instead of WhatsApp, Excel, and email threads.", color: "#ff7043" },
  { title: "Never Lose Orders", desc: "Every enquiry captured and tracked to completion.", color: "#0ea5e9" },
  { title: "Track Every Job", desc: "Live stage status from quote to install.", color: "#8b5cf6" },
  { title: "Faster Customer Approvals", desc: "Portal magic-links — approve quotes and designs in one tap.", color: "#f59e0b" },
  { title: "Real-time Production Tracking", desc: "Workshop milestones visible to owners and sales.", color: "#3b82f6" },
  { title: "Customer Portal", desc: "Clients see progress without calling your team.", color: "#10b981" },
] as const;

export const PROBLEM_CHAOS = [
  "WhatsApp",
  "Excel",
  "Lost Orders",
  "Calling Customers",
  "Forgotten Follow-ups",
] as const;

export const FEATURE_STORIES = [
  {
    id: "crm",
    title: "Customer CRM",
    desc: "A directory built for signage jobs — history, contacts, and lifetime value.",
    color: "#ff7043",
    demo: "crm" as const,
  },
  {
    id: "quotation",
    title: "Quotation",
    desc: "Quotes build themselves from catalog, site data, GST, and totals.",
    color: "#0ea5e9",
    demo: "quote" as const,
  },
  {
    id: "approvals",
    title: "Approvals",
    desc: "Customer clicks Approve — status updates across the job instantly.",
    color: "#8b5cf6",
    demo: "approve" as const,
  },
  {
    id: "production",
    title: "Production",
    desc: "Pending → Cutting → Printing → Fabrication → Installation.",
    color: "#3b82f6",
    demo: "production" as const,
  },
] as const;

export const TEAM_ROLES = [
  { title: "Owner", desc: "Full pipeline visibility, stage locks, and overrides.", preview: "Pipeline value & KPIs" },
  { title: "Sales", desc: "Quotes grounded in catalog and site measurements.", preview: "Enquiry inbox & quotes" },
  { title: "Design", desc: "Proofs, revisions, and production file handoff.", preview: "Approval queue" },
  { title: "Production", desc: "Milestone checklists from procurement through QC.", preview: "Workshop board" },
  { title: "Installation", desc: "Schedules, checklists, photos, and digital handover.", preview: "Crew calendar" },
  { title: "Customer", desc: "Portal access to approve, revise, and track.", preview: "Order timeline" },
] as const;

export const PORTAL_STEPS = [
  { id: "quote", label: "Quotation", color: "#f59e0b" },
  { id: "approved", label: "Approved", color: "#10b981" },
  { id: "production", label: "Production", color: "#3b82f6" },
  { id: "install", label: "Installation", color: "#0085ff" },
  { id: "done", label: "Completed", color: "#10b981" },
] as const;

export const REPORT_METRICS = [
  { label: "Revenue", value: 2035000, prefix: "₹", suffix: "", format: "currency" as const },
  { label: "Orders", value: 47, prefix: "", suffix: "", format: "number" as const },
  { label: "Pending", value: 12, prefix: "", suffix: "", format: "number" as const },
  { label: "Completed", value: 35, prefix: "", suffix: "", format: "number" as const },
] as const;

export const TESTIMONIALS = [
  {
    quote: "We stopped chasing quotes on WhatsApp. PrintOMS gave us one pipeline the whole shop can see.",
    name: "Operations Lead",
    company: "Printec",
    initials: "P",
  },
  {
    quote: "Customer approvals that used to take days now happen in the portal the same afternoon.",
    name: "Sales Manager",
    company: "The Board Company",
    initials: "B",
  },
  {
    quote: "Production and install finally talk to the same job card. Fewer surprises on site.",
    name: "Workshop Head",
    company: "SignWorld",
    initials: "S",
  },
] as const;

export const CAPABILITIES = [
  {
    id: "crm",
    title: "Customer CRM",
    desc: "A directory built for signage jobs , history, contacts, and lifetime value in one place.",
    color: "#ff7043",
  },
  {
    id: "quotations",
    title: "Quotations",
    desc: "Catalog-driven quoting with measurements from site visits , not spreadsheet guesswork.",
    color: "#0ea5e9",
  },
  {
    id: "portal",
    title: "Customer portal",
    desc: "Magic-link access for clients to approve quotes and designs, track progress, and schedule.",
    color: "#8b5cf6",
  },
  {
    id: "whatsapp",
    title: "Automated WhatsApp",
    desc: "Stage notifications that keep customers and teams aligned without chasing threads.",
    color: "#f59e0b",
  },
  {
    id: "production",
    title: "Production tracking",
    desc: "Workshop milestones so owners know what is on track , and what is at risk.",
    color: "#3b82f6",
  },
  {
    id: "installation",
    title: "Installation scheduling",
    desc: "Dispatch crews with the context they need: access, scaffolding, photos, and sign-off.",
    color: "#0085ff",
  },
  {
    id: "analytics",
    title: "Analytics",
    desc: "Funnel, pipeline value, and operational KPIs for signage businesses.",
    color: "#10b981",
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
    desc: "Jobs start without clear consent on cost or design , then disputes follow.",
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
    price: "$999",
    period: "Setup + $49/mo",
    blurb: "For growing print shops.",
    features: ["Up to 5 team members", "Unlimited enquiries", "Basic CRM", "Standard support"],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "$1,299",
    period: "Setup + $49/mo",
    blurb: "For established signage businesses.",
    features: [
      "Unlimited team members",
      "Automated WhatsApp",
      "Production tracking",
      "Customer portal",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "Tailored rollout",
    blurb: "Multi-branch and custom workflows.",
    features: ["Everything in Professional", "SSO & advanced permissions", "API access", "Dedicated success manager"],
    popular: false,
  },
] as const;

export const PRINTOMS_FAQS = [
  {
    q: "Do I need technical skills to use PrintOMS?",
    a: "No. PrintOMS is built for sales, design, workshop, and install teams , not IT departments.",
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
    a: "No. PrintOMS is an order management system for custom signage , site visits, materials, fabrication, and install included.",
  },
] as const;
