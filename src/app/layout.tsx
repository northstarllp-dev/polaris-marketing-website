import type { Metadata } from "next";
import { NavBar } from "./layout/NavBar";
import { Footer } from "./layout/Footer";
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
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
