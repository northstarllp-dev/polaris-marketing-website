"use client";

import { useState, type ReactNode } from "react";
import { Mail, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const WHATSAPP_NUMBER = "918189999998";
const EMAIL = "akshay@thepolarislabs.com";

const DEMO_MESSAGE =
  "Hi! I'd like to book a demo of Polaris / PrintOMS. Please let me know a good time to connect.";
const DEMO_SUBJECT = "Book a Demo , Polaris";

export const bookDemoWhatsAppHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEMO_MESSAGE)}`;
export const bookDemoEmailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(DEMO_SUBJECT)}&body=${encodeURIComponent(DEMO_MESSAGE)}`;

type BookDemoButtonProps = {
  className?: string;
  children?: ReactNode;
};

/** Opens a chooser: WhatsApp or email, then redirects with a prefilled demo message. */
export function BookDemoButton({ className = "", children }: BookDemoButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children ?? "Book a Demo"}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md border-0 bg-white p-0 overflow-hidden rounded-2xl shadow-2xl">
          <DialogHeader className="px-6 pt-6 pb-2 text-left">
            <DialogTitle className="font-['Figtree',sans-serif] font-black text-[22px] text-[var(--brand-ink)]">
              Book a demo
            </DialogTitle>
            <DialogDescription className="font-['Figtree',sans-serif] text-[14px] text-[var(--brand-muted)]">
              Choose how you&apos;d like us to reach you.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
            <a
              href={bookDemoWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 rounded-xl border border-[rgba(0,0,0,0.08)] bg-[#f7fdf9] px-4 py-4 transition-colors hover:border-[#25D366]/50 hover:bg-[#ecfdf3]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <MessageCircle size={22} />
              </span>
              <span className="text-left">
                <span className="block font-['Figtree',sans-serif] font-bold text-[15px] text-[var(--brand-ink)]">
                  WhatsApp
                </span>
                <span className="block font-['Figtree',sans-serif] text-[13px] text-[var(--brand-muted)]">
                  Chat on +91 81899 99998
                </span>
              </span>
            </a>

            <a
              href={bookDemoEmailHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 rounded-xl border border-[rgba(0,0,0,0.08)] bg-[var(--brand-surface)] px-4 py-4 transition-colors hover:border-[var(--brand-orange)]/40 hover:bg-[#fff4ef]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand-navy)] text-white">
                <Mail size={22} />
              </span>
              <span className="text-left">
                <span className="block font-['Figtree',sans-serif] font-bold text-[15px] text-[var(--brand-ink)]">
                  Email
                </span>
                <span className="block font-['Figtree',sans-serif] text-[13px] text-[var(--brand-muted)]">
                  {EMAIL}
                </span>
              </span>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
