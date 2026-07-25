// app/(marketing)/HeroAndForm.tsx
/**
 *  MARKETING LANDING HERO AND FORM SLUICE
 * Displays the core market messaging headers and mounts the unified shared form component 
 * as a standard free guest delivery dispatch sandbox instance.
 */

"use client"; // Marks this as a client component to handle landing viewport anchors

import React from "react";
// Import the split, modular shared form system from your components directory root
import SharedDeliveryForm from "@/components/shared-form";

export default function HeroAndForm() {
  // Smooth scroll helper layout anchor button interaction intercept tracker hook
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("delivery-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-16">
      {/* =========================================================================
          SUB-SECTION: HERO TERMINAL CORES PRESENTATION
          ========================================================================= */}
      <section className="section_container text-center pt-16 md:pt-24 space-y-6">
        {/* Large Stark Branding Industrial Display Text */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
          Deliver Smarter with <br /> Live Delivery Tracking
        </h1>
        {/* Core Explanatory Value Proposition Supporting Subtext Label */}
        <p className="text-md md:text-lg max-w-2xl mx-auto font-medium text-neutral-600">
          Create deliveries in seconds, keep customers informed, and let riders update deliveries with a single tap. Try it immediately without signing up.
        </p>
        
        {/* Navigation Action Buttons Container Matrix Row Wrapper */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Main Action Touch Anchor Smooth Target Scroll Hook Button */}
          <a 
            href="#delivery-form" 
            onClick={scrollToForm}
            className="w-full sm:w-auto border border-black bg-black text-white px-8 py-3.5 text-xs font-extrabold uppercase tracking-widest transition hover:bg-neutral-900 text-center"
          >
            Try It Free
          </a>
          {/* Secondary Dashboard Access Auth Router Entrypoint Link */}
          <a 
            href="/dashboard" 
            className="w-full sm:w-auto border border-black bg-white text-black px-8 py-3.5 text-xs font-extrabold uppercase tracking-widest transition hover:bg-neutral-50 text-center"
          >
            Business Login
          </a>
        </div>
      </section>

      {/* =========================================================================
          SUB-SECTION: LIVE DELIVERY INTEL INTEGERS CONTAINER BOX
          ========================================================================= */}
      <section id="delivery-form" className="section_container max-w-xl scroll-mt-24">
        <div className="border border-black bg-white p-8 md:p-10">
          <div className="mb-6 space-y-1">
            {/* Modular Title Headers Matching Style Guides Specifications */}
            <h2 className="text-2xl font-black uppercase tracking-tight">Live Delivery Form</h2>
            <p className="text-xs font-medium text-neutral-500">Test the operational core workflow in under 30 seconds.</p>
          </div>

          {/* 
            SHARED DATA MANIFEST ENTRY JUNCTION ENGINE
            Mounts the unified component engine running on its free profile workflow loop 
          */}
          <SharedDeliveryForm userType="free" />
        </div>
      </section>
    </div>
  );
}
