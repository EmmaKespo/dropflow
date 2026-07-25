// app/(marketing)/HeroAndForm.tsx
"use client"; // Marks this as a client component to handle local user interactive state hooks

import React, { useState } from "react";

export default function HeroAndForm() {
  // Local state tracking form input values
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [riderPhone, setRiderPhone] = useState("");

  // Tracking engine generation lifecycle status management
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Smooth scroll helper button operation anchor target hook execution
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("delivery-form")?.scrollIntoView({ behavior: "smooth" });
  };

  // Process the form submission data parameters safely
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate generation of unique tracking link payload matrix
    const randomToken = Math.random().toString(36).substring(2, 12);
    const mockTrackingUrl = `${window.location.origin}/track/${randomToken}`;
    
    setGeneratedLink(mockTrackingUrl);
  };

  // Trigger browser clipboard text injection processes
  const handleCopyLink = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-16">
      {/* ----------------- SUB-SECTION: HERO TERMINAL ----------------- */}
      <section className="section_container text-center pt-16 md:pt-24 space-y-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
          Deliver Smarter with <br /> Live Delivery Tracking
        </h1>
        <p className="text-md md:text-lg max-w-2xl mx-auto font-medium text-neutral-600">
          Create deliveries in seconds, keep customers informed, and let riders update deliveries with a single tap. Try it immediately without signing up.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Main Action Scroll Trigger Button */}
          <a 
            href="#delivery-form" 
            onClick={scrollToForm}
            className="w-full sm:w-auto border border-black bg-black text-white px-8 py-3.5 text-xs font-extrabold uppercase tracking-widest transition hover:bg-neutral-900 text-center"
          >
            Try It Free
          </a>
          {/* Secondary Control Board Login Routing Element */}
          <a 
            href="/dashboard" 
            className="w-full sm:w-auto border border-black bg-white text-black px-8 py-3.5 text-xs font-extrabold uppercase tracking-widest transition hover:bg-neutral-50 text-center"
          >
            Business Login
          </a>
        </div>
      </section>

      {/* ----------------- SUB-SECTION: LIVE DELIVERY FORM ----------------- */}
      <section id="delivery-form" className="section_container max-w-xl scroll-mt-24">
        <div className="border border-black bg-white p-8 md:p-10">
          {!generatedLink ? (
            /* ACTIVE DATA COLLECTION DISPATCH PANEL FORM MATRIX */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tight">Live Delivery Form</h2>
                <p className="text-xs font-medium text-neutral-500">Test the operational core workflow in under 30 seconds.</p>
              </div>

              {/* Input Object Frame Matrix 1 */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Customer Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter recipient full name profile context" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-black p-3 text-xs font-medium bg-white"
                />
              </div>

              {/* Input Object Frame Matrix 2 */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Customer Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="Example: +2348000000000" 
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full border border-black p-3 text-xs font-medium bg-white"
                />
              </div>

              {/* Input Object Frame Matrix 3 */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Delivery Dropoff Address</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Complete destination terminal coordinate drop-point" 
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full border border-black p-3 text-xs font-medium bg-white"
                />
              </div>

              {/* Input Object Frame Matrix 4 */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Assigned Rider Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="Example: +2348111111111" 
                  value={riderPhone}
                  onChange={(e) => setRiderPhone(e.target.value)}
                  className="w-full border border-black p-3 text-xs font-medium bg-white"
                />
              </div>

              {/* Action Pipeline Hook Creation Trigger Button */}
              <button 
                type="submit" 
                className="w-full border border-black bg-black text-white py-3.5 text-xs font-extrabold uppercase tracking-widest transition hover:bg-neutral-900"
              >
                Generate Tracking Link
              </button>
            </form>
          ) : (
            /* REACTION FRAMEWORK COMPLETED DISPATCH RECONCILIATION SUCCESS SCREEN */
            <div className="space-y-6 text-center py-4">
              <div className="space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-xl">✅</div>
                <h3 className="text-xl font-black uppercase tracking-tight">Delivery Created Successfully</h3>
                <p className="text-xs font-medium text-neutral-500">Secure pipeline operational routing link instantiated instantly.</p>
              </div>

              {/* Simulated Output String Box Interface Viewport Container Block */}
              <div className="border border-dashed border-neutral-400 bg-neutral-50 p-3 font-mono text-[11px] break-all select-all">
                {generatedLink}
              </div>

              {/* Share Distribution Layout Action Matrix Blocks */}
              <div className="space-y-3 pt-2">
                {/* Action Hook One: Manual Clip Buffer Storage injection */}
                <button 
                  onClick={handleCopyLink}
                  className="w-full border border-black bg-white text-black py-2.5 text-xs font-extrabold uppercase tracking-widest transition hover:bg-neutral-50"
                >
                  {isCopied ? "Copied To Clipboard!" : "📋 Copy Tracking Link"}
                </button>

                {/* Action Hook Two: WhatsApp Protocol Relay Generation Interface Target for Riders */}
                <a 
                  href={`https://wa.me{riderPhone.replace(/\+/g, "")}?text=${encodeURIComponent(`Hello, you've been assigned a delivery. Please use this tracking link to update the delivery status: ${generatedLink}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-black bg-black text-white py-2.5 text-xs font-extrabold uppercase tracking-widest transition hover:bg-neutral-900 text-center"
                >
                  📲 Send Tracking to Rider
                </a>

                {/* Action Hook Three: WhatsApp Protocol Relay Generation Interface Target for Customers */}
                <a 
                  href={`https://wa.me{customerPhone.replace(/\+/g, "")}?text=${encodeURIComponent(`Hello, your delivery has been created. You can track its progress here: ${generatedLink}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-neutral-300 bg-white text-neutral-600 py-2.5 text-xs font-extrabold uppercase tracking-widest transition hover:bg-neutral-50 hover:text-black hover:border-black text-center"
                >
                  👤 Send Tracking to Customer (Optional)
                </a>
              </div>

              {/* System State Cancellation Target Trigger Hook */}
              <button 
                onClick={() => setGeneratedLink(null)}
                className="text-xs font-bold uppercase tracking-wider underline text-neutral-500 hover:text-black mt-2"
              >
                Reset Module Panel
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
