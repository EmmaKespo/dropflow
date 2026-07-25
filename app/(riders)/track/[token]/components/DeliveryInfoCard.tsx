// app/(riders)/track/[token]/components/DeliveryInfoCard.tsx
/**
 * DELIVERY SPECIFIC PROFILE DISPATCH META CARD
 * Houses customer destination targets and Google Maps deep link navigation protocols.
 */

import React from "react";

// Local structural shape interfaces for context validation runtime
export interface DeliveryInfoProps {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  isPremium: boolean;
}

export default function DeliveryInfoCard({ data }: { data: DeliveryInfoProps }) {
  // Safe string encapsulation for deep links configuration processing
  const mapsUrl = `https://google.com{encodeURIComponent(data.deliveryAddress)}`;

  return (
    <div className="border border-black bg-white p-5 space-y-4">
      {/* Structural Card Identification Header Layout */}
      <div className="flex justify-between items-start border-b border-neutral-200 pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">Active Delivery Task</span>
          <h2 className="text-lg font-black tracking-tight uppercase">📦 Order #{data.id}</h2>
        </div>
        {/* Visual Badge representing corporate priority routing variables */}
        <span className={`text-[9px] font-bold uppercase tracking-widest border px-1.5 py-0.5 ${data.isPremium ? "border-black bg-black text-white" : "border-neutral-300 text-neutral-500"}`}>
          {data.isPremium ? "Premium Fleet" : "Standard"}
        </span>
      </div>

      {/* Target Consumer Context Records Segment */}
      <div className="space-y-3 text-xs font-medium">
        <div>
          <span className="block text-[9px] uppercase font-black tracking-widest text-neutral-400">Recipient Profile Name</span>
          <span className="text-sm font-bold">{data.customerName}</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase font-black tracking-widest text-neutral-400">Terminal Contact Line</span>
          <span className="text-sm font-mono">{data.customerPhone}</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase font-black tracking-widest text-neutral-400">Destination Terminal Drop Address</span>
          <span className="text-sm font-bold block leading-tight">{data.deliveryAddress}</span>
        </div>
      </div>

      {/* External Mapping Launch Tool Anchor Button */}
      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-4">
        <a 
          href={mapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-center border border-black bg-white text-black py-2.5 text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-50 transition"
        >
          🗺️ Open In Navigation Maps
        </a>
      </div>
    </div>
  );
}
