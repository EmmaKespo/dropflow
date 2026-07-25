// app/(riders)/track/[token]/components/ContactCustomerPanel.tsx
/**
 * CONTEXT-SENSITIVE CELLULAR LINK COMMUNICATOR
 * Automatically evaluates tier configurations to choose dialers or native WhatsApp integrations.
 */

import React from "react";

export interface ContactDataProps {
  customerPhone: string;
  status: "pending" | "picked_up" | "arrived" | "delivered";
  isPremium: boolean;
}

export default function ContactCustomerPanel({ data }: { data: ContactDataProps }) {
  // Lock visibility safety parameters unless driver has reached destination checkpoint
  if (data.status !== "arrived") return null;

  // Pre-formatted messaging parameters for messaging system links
  const prefilledText = "Hello, your delivery has arrived. Please let me know where to meet you. Thank you.";
  const whatsappDeepLink = `https://wa.me{data.customerPhone.replace(/\+/g, "")}?text=${encodeURIComponent(prefilledText)}`;
  const dialerDeepLink = `tel:${data.customerPhone}`;

  return (
    <div className="border border-black bg-white p-5 space-y-3">
      <div className="space-y-0.5">
        <span className="block text-[9px] uppercase font-black tracking-widest text-neutral-500">Checkpoint Comms Interface Channel</span>
        <h4 className="text-xs font-black uppercase tracking-tight">Contact Customer Actions Needed</h4>
        {data.isPremium && (
          <p className="text-[10px] font-medium text-neutral-500 italic">
            ⚡ Automated WhatsApp arrival notice has been sent to client via system gateway logs.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Communication Node Action 1: System Level Carrier Call Route */}
        <a 
          href={dialerDeepLink}
          className="flex items-center justify-center gap-2 border border-black bg-white text-black font-extrabold uppercase text-xs tracking-wider py-3 hover:bg-neutral-50 active:bg-neutral-100 transition text-center"
        >
          📞 Call Customer
        </a>

        {/* Communication Node Action 2: Manual WhatsApp redirection hook for free standard environments */}
        {!data.isPremium && (
          <a 
            href={whatsappDeepLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-black bg-black text-white font-extrabold uppercase text-xs tracking-wider py-3 hover:bg-neutral-900 transition text-center"
          >
            💬 WhatsApp Customer
          </a>
        )}
      </div>
    </div>
  );
}
