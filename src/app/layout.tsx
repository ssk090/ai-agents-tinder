import type { Metadata } from "next";
import { Audiowide, Rajdhani } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const displayFont = Audiowide({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Rajdhani({
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SYNAPSE MATCH // AI NETWORK",
  description: "Next Generation AI Pairing Protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased font-body relative min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>
        {/* CRT Overlay Effect */}
        <div className="pointer-events-none fixed inset-0 z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="pointer-events-none fixed inset-0 z-[100] crt-scanlines"></div>

        <Navigation />
        <main className="pt-20 min-h-screen relative z-10 w-full overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
