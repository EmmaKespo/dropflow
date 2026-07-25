// app/(marketing)/MarketingDetails.tsx
import React from "react";

export default function MarketingDetails() {
  return (
    <div className="space-y-20">
      {/* ----------------- SECTION 3: HOW IT WORKS DISPLAY GRID ----------------- */}
      <div className="border-t border-black bg-white py-16">
        <div className="section_container">
          <h2 className="mb-12 text-center text-3xl font-extrabold uppercase tracking-tighter md:text-4xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            {[
              { step: "1", title: "Create Delivery", desc: "Input system details without profiles." },
              { step: "2", title: "Share Link", desc: "Pass tokenized routing paths to workers." },
              { step: "3", title: "Rider Updates", desc: "One-tap state change tracking options." },
              { step: "4", title: "Customer Tracks", desc: "Real-time mapping execution monitoring." },
              { step: "5", title: "Completed", desc: "Order pipeline validation finished safely." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center border-2 border-black bg-black font-mono text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-extrabold uppercase tracking-tight">{item.title}</h3>
                <p className="text-sm font-medium text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 4: FEATURE HIGHLIGHTS ----------------- */}
      <div id="features" className="border-t border-black bg-white py-16">
        <div className="section_container">
          <h2 className="mb-12 text-center text-3xl font-extrabold uppercase tracking-tighter md:text-4xl">
            Core Capabilities
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { title: "Live Tracking", desc: "Instant visibility for consumers with zero configuration lag." },
              { title: "Mobile-First UI", desc: "Ultra-lightweight operations screen engineered for active drivers." },
              { title: "Secure Hashes", desc: "Protected tokens keep customer contact variables data hidden." },
              { title: "Real-Time Board", desc: "Premium monitoring control systems for back-office operators." },
              { title: "Auto Notifications", desc: "Premium automated dispatch triggers over active communication loops." },
              { title: "Deep Analytics", desc: "Premium telemetry reporting structures to monitor efficiency." }
            ].map((feature, idx) => (
              <div key={idx} className="border border-black p-6 bg-white">
                <h3 className="mb-2 text-md font-extrabold uppercase tracking-wider"> {feature.title}</h3>
                <p className="text-sm font-medium text-neutral-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 5: PRICING PREVIEW ----------------- */}
      <div id="pricing" className="border-t border-black bg-neutral-50 py-16">
        <div className="section_container max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-extrabold uppercase tracking-tighter md:text-4xl">
            Transparent Access Structures
          </h2>
          <p className="mb-12 text-center text-sm font-medium text-neutral-600">
            Pick the tier that matches your active logistics operations scope.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Free Tier Card */}
            <div className="flex flex-col border border-black bg-white p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Tier 01</span>
              <h3 className="text-2xl font-black uppercase tracking-tight mt-1">Free Sandbox</h3>
              <div className="my-4 text-3xl font-mono font-black">$0 / Mo</div>
              <p className="mb-6 text-sm font-medium text-neutral-600 min-h-[40px]">
                Perfect for independent business operations testing basic dispatches manually.
              </p>
              <ul className="mb-8 space-y-3 text-sm font-medium flex-1">
                <li>✓ Unlimited Free Deliveries</li>
                <li>✓ Unique Hash Links</li>
                <li>✓ Manual Messaging Triggers</li>
                <li>✓ Live Tracking Interfaces</li>
              </ul>
              <a href="#delivery-form" className="block text-center border border-black py-2.5 text-xs font-extrabold uppercase tracking-widest transition bg-white text-black hover:bg-neutral-100">
                Deploy Free Order
              </a>
            </div>

            {/* Premium Tier Card */}
            <div className="flex flex-col border-2 border-black bg-white p-8 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="absolute -top-3 right-4 border border-black bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">Highly Advised</span>
              <span className="text-xs font-bold uppercase tracking-widest text-black">Tier 02</span>
              <h3 className="text-2xl font-black uppercase tracking-tight mt-1">Premium Flow</h3>
              <div className="my-4 text-3xl font-mono font-black">$49 / Mo</div>
              <p className="mb-6 text-sm font-medium text-neutral-600 min-h-[40px]">
                Engineered for fleet teams running high-volume systemic delivery sequences.
              </p>
              <ul className="mb-8 space-y-3 text-sm font-medium flex-1">
                <li className="font-bold">✓ Everything In Sandbox Plan</li>
                <li>✓ Live Control Center Sidebar Dashboard</li>
                <li>✓ Automated WhatsApp Pipeline Relays</li>
                <li>✓ Real-time Central Activity Feed Monitor</li>
                <li>✓ Global Dispatch History Log Retention</li>
                <li>✓ Complete Performance Data Analytics</li>
              </ul>
              <button className="block w-full text-center border border-black py-2.5 text-xs font-extrabold uppercase tracking-widest transition bg-black text-white hover:bg-neutral-900">
                Initialize Account Setup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 6: PREMIUM UPGRADE AFTER-EXPERIENCE CTA ----------------- */}
      <div className="border-t border-black bg-black text-white py-16">
        <div className="section_container max-w-3xl text-center space-y-6">
          <span className="inline-block border border-neutral-700 bg-neutral-900 text-neutral-400 px-3 py-1 text-xs font-mono tracking-widest uppercase">
            Operational Scale
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            Ready to Completely <br /> Automate Fleet Logistics?
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto font-medium text-neutral-400">
            Stop messing with manual text copy-pasting loops. Upgrade to Dropflow Premium to unlock automatic worker dispatches and unified analytical dashboards.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-white text-black border border-white px-8 py-3.5 text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-100 transition">
              Claim Premium Workspace
            </button>
            <a href="#delivery-form" className="w-full sm:w-auto bg-transparent text-white border border-white px-8 py-3.5 text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-900 transition text-center">
              Test Another Free Run
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
