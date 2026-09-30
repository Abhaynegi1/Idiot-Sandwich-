import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F7F4EA",
};

export const metadata: Metadata = {
  title: "Idiot Sandwich 🥪 — Absurd Infinite Battle Game",
  description: "An absurd, AI-assisted competitive object game where anything can be challenged, anything can be a sandwich, and sanity is optional.",
  keywords: ["idiot sandwich", "game", "ai battle", "web game", "absurd"],
  authors: [{ name: "Idiot Sandwich Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
