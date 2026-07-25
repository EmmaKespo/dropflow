// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // Imports global Tailwind styles from your root app folder

// Global SEO and app naming configuration for Dropflow
export const metadata: Metadata = {
  title: "Dropflow",
  description: "Minimalist black and white logistics management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* The body configures your root layout canvas shell */}
      <body className="min-h-screen flex flex-col bg-white text-black antialiased">
        {/* Children will inject either marketing, admin, or rider layouts */}
        {children}
      </body>
    </html>
  );
}
