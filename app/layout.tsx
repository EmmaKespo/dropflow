// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // Imports global Tailwind styles from your root app folder
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
/>
// Global SEO and app naming configuration for Dropflow

export const metadata: Metadata = {
  
  metadataBase: new URL("https://your-domain.vercel.app"), 

  title: "DropFlow | Real-Time Fleet Logistics & Delivery Tracking Engine",
  description: "Deploy premium corporate fleet dashboards or track guest delivery manifests live with secure token pipelines and zero overhead.",
  openGraph: {
    title: "DropFlow Logistics Network Control Node",
    description: "Real-time, mobile-first logistics tracking console powering free dispatches and premium enterprise fleets.",
    url: "https://your-domain.vercel.app", 
    siteName: "DropFlow Inc.",
    images: [
      {
        url: "/marketing-preview.png", 
        width: 1200,
        height: 630,
        alt: "DropFlow Brutalist Tracking Terminal Interface Console Screen Frame Layout",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
icons: {
    icon: "/marketing-preview.png", 
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  //  Add twitter card metadata for full social preview coverage
  twitter: {
    card: "summary_large_image",
    title: "DropFlow Logistics Network Control Node",
    description: "Real-time, mobile-first logistics tracking console powering free dispatches and premium enterprise fleets.",
    images: ["/marketing-preview.png"],
  },
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
