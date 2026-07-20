import type { Metadata } from "next";
import { NavBar } from "./layout/NavBar";
import { Footer } from "./layout/Footer";
import { BookDemoButton } from "./components/BookDemoButton";
import { MessageCircle } from "lucide-react";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Polaris , Build Better Businesses",
  description: "Polaris builds purpose-built software for modern businesses. PrintOMS , order management for signage and fabrication , is live now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <div id="root" className="min-h-screen font-['Figtree',sans-serif]">
          <NavBar />
          {/* Higher stack than sticky footer so content lifts away and reveals it */}
          <div className="relative z-10">
            <main>{children}</main>
          </div>
          <Footer />
          
          <div className="fixed bottom-6 right-6 z-50">
            <BookDemoButton className="flex items-center justify-center h-14 w-14 rounded-full bg-[var(--brand-orange)] text-white shadow-xl hover:scale-105 transition-transform">
              <MessageCircle size={26} />
            </BookDemoButton>
          </div>
        </div>
      </body>
    </html>
  );
}
