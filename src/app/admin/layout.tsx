import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin — Ayush Gautam Portfolio",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
        className="antialiased min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
