// app/(marketing)/layout.tsx
"use client"; // Enabled to control mobile viewport overlay menu states

import React, { useState } from "react";
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State tracking the open/closed status of the mobile screen utility sidebar
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Dynamic Header Component Frame: Kept sticky to maintain access to primary actions */}
      <header className="border-b border-black bg-white sticky top-0 z-50">
        <div className="section_container flex items-center justify-between !py-4">
          
          {/* Company Brand Moniker */}
          <Link href="/" className="text-2xl font-black tracking-tighter">
            DROPFLOW
          </Link>
          
          {/* Desktop Only Navigation Links Area Matrix */}
          <nav className="hidden md:flex items-center gap-8 font-bold uppercase text-xs tracking-wider">
            <Link href="#features" className="hover:underline underline-offset-4">Features</Link>
            <Link href="#how-it-works" className="hover:underline underline-offset-4">How It Works</Link>
            <Link href="#pricing" className="hover:underline underline-offset-4">Pricing</Link>
            <Link href="/login" className="hover:underline underline-offset-4">Login</Link>
            <Link href="#form" className="primary_action_btn !py-2 !px-4">
              Try It Free
            </Link>
          </nav>

          {/* Mobile Screen Toggle Triggers - Swaps layout dynamically */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-between w-6 h-4 z-50 focus:outline-none"
            aria-label="Toggle menu interface element"
          >
            {/* Conditional CSS translations to render an 'X' icon framework when open */}
            <span className={`h-0.5 w-full bg-black transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`h-0.5 w-full bg-black transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full bg-black transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Viewport Overlay Layer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col p-6 pt-24 md:hidden">
          <nav className="flex flex-col gap-6 text-xl font-black uppercase tracking-tight">
            <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="border-b border-black pb-2">Features</Link>
            <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="border-b border-black pb-2">How It Works</Link>
            <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="border-b border-black pb-2">Pricing</Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="border-b border-black pb-2">Business Login</Link>
            <Link href="#form" onClick={() => setMobileMenuOpen(false)} className="primary_action_btn text-center mt-4">
              Try It Free Now
            </Link>
          </nav>
        </div>
      )}

      {/* Primary Context Insertion Junction */}
      <main className="flex-1">
        {children}
      </main>

      {/* Minimal Stark Brand Footer Matrix */}
      <footer className="border-t border-black bg-white">
        <div className="section_container flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <span className="text-xl font-black tracking-tighter">DROPFLOW</span>
            <p className="text-xs font-medium text-neutral-500">Instant validation delivery system networks.</p>
          </div>
          {/* Navigation Matrix Sub-columns */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-wider">
            <Link href="#features" className="hover:underline">About</Link>
            <Link href="#features" className="hover:underline">Features</Link>
            <Link href="#pricing" className="hover:underline">Pricing</Link>
            <Link href="#" className="hover:underline">Contact</Link>
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="/login" className="hover:underline">Login</Link>
          </div>
        </div>
        <div className="border-t border-neutral-200 py-4 text-center text-xs font-medium text-neutral-400">
          &copy; {new Date().getFullYear()} Dropflow Terminal. Experience Prioritized.
        </div>
      </footer>
    </div>
  );
}
