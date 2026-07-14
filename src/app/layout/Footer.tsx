import { Link } from "react-router";

const FOOTER_LINKS = {
  Products: [
    { label: "PrintOMS", to: "/products/printoms" },
    { label: "More coming soon", to: "/#ecosystem" },
  ],
  Company: [
    { label: "Why Polaris", to: "/#why" },
    { label: "Contact", to: "#contact" },
  ],
  Resources: [
    { label: "Pricing", to: "/products/printoms#pricing" },
    { label: "FAQ", to: "/products/printoms#faq" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--brand-navy-deep)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/Dark withoutbg.png"
                alt="Polaris"
                className="h-32 w-auto object-contain"
              />
            </div>
            <p className="font-['Figtree',sans-serif] font-normal text-[13px] text-white/30 leading-relaxed max-w-[200px]">
              Build better businesses.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-['Figtree',sans-serif] font-black text-[11px] text-white/40 mb-5 uppercase tracking-widest">
                {section}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.to.startsWith("#") ? (
                      <a
                        href={link.to}
                        className="font-['Figtree',sans-serif] font-normal text-[14px] text-white/40 hover:text-white/80 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="font-['Figtree',sans-serif] font-normal text-[14px] text-white/40 hover:text-white/80 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['Figtree',sans-serif] font-normal text-[12px] text-white/25">
            © {new Date().getFullYear()} Polaris. All rights reserved.
          </p>
          <p className="font-['Figtree',sans-serif] font-normal text-[12px] text-white/25">
            The operating system for modern businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
