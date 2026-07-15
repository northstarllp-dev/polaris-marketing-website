"use client";

import Link from "next/link";

const FOOTER_LINKS = {
  Products: [
    { label: "PrintOMS", to: "/products/printoms" },
    { label: "More coming soon", to: "/#ecosystem" },
  ],
  Company: [
    { label: "Why Polaris", to: "/#why" },
  ],
  Resources: [
    // { label: "Pricing", to: "/products/printoms#pricing" },
    { label: "FAQ", to: "/products/printoms#faq" },
  ],
  Contact: [
    { label: "sales@thepolarislabs.com", to: "mailto:sales@thepolarislabs.com" },
    { label: "+91 9994400311", to: "tel:+919994400311" },
    { label: "+91 8189999998", to: "tel:+918189999998" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[var(--brand-navy-deep)] pt-12 pb-6 overflow-hidden">
      {/* Ambient top border & glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-brand-gradient opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-10">
          {/* Brand & CTA Section */}
          <div className="md:col-span-5 flex flex-col items-start">
            <img
              src="/Dark withoutbg.png"
              alt="Polaris"
              className="h-16 w-full md:w-auto object-contain object-left mb-6"
            />
            <h3 className="font-['Figtree',sans-serif] text-[clamp(24px,2.5vw,32px)] font-light text-white leading-tight mb-4">
              Build better businesses.
            </h3>
            <p className="font-['Figtree',sans-serif] text-[15px] text-white/50 max-w-[320px] leading-relaxed mb-8">
              We identify the real problem, then we build the fix. The operating system for modern business workflows.
            </p>
            <a
              href="/#contact"
              className="px-7 py-3 bg-white text-black font-bold text-xs tracking-[0.15em] uppercase hover:bg-gray-200 transition-colors"
            >
              Get in Touch &gt;
            </a>
          </div>

          {/* Links Section */}
          <div className="md:col-span-7 grid grid-cols-2 sm:flex sm:flex-wrap md:flex-nowrap md:justify-end gap-x-4 gap-y-12 md:gap-16 pt-4">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section} className="sm:min-w-[140px]">
                <h4 className="font-['Figtree',sans-serif] font-bold text-[12px] text-white/80 mb-6 uppercase tracking-[0.2em]">
                  {section}
                </h4>
                <ul className="flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.to.startsWith("/") ? (
                        <Link
                          href={link.to}
                          className="font-['Figtree',sans-serif] font-medium text-[14.5px] text-white/40 hover:text-brand-gradient transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.to}
                          className="font-['Figtree',sans-serif] font-medium text-[14.5px] text-white/40 hover:text-brand-gradient transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-['Figtree',sans-serif] font-medium text-[13px] text-white/30">
            © {new Date().getFullYear()} Polaris. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="font-['Figtree',sans-serif] font-medium text-[13px] text-white/30 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-['Figtree',sans-serif] font-medium text-[13px] text-white/30 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
