import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ayush Gautam — ML & Full Stack Engineer",
  description:
    "Portfolio of Ayush Gautam, a developer at NIT Rourkela building fast, accessible, and pixel-perfect web applications and ML solutions.",
  keywords: [
    "Ayush Gautam",
    "Portfolio",
    "Full Stack",
    "Machine Learning",
    "NIT Rourkela",
    "Web Developer",
  ],
  authors: [{ name: "Ayush Gautam" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
