// app/(admin)/components/DeliveryDetailModal.tsx
/**
 * ANALYTICAL FLEET INCIDENT DETAILED VIEW WINDOW
 * Exposes internal dataset arrays logs, automation tracking indicators, and copies 
 * routing secure clipboard link text buffers to remote systems.
 */

import React from "react";
import { DeliveryRecord } from "./DeliveriesTable";

interface DeliveryDetailModalProps {
  record: DeliveryRecord | null;
  onClose: () => void;
}

export default function DeliveryDetailModal({
  record,
  onClose
}: DeliveryDetailModalProps) {
  // Prevent template compilation errors if no item row index target selection is configured
  if (!record) return null;

  // Process secure temporary clipboard sharing link string buffers
  const handleCopySecureLink = () => {
    const trackingUrl = `${window.location.origin}/track/mock-token-${record.id}`;
    navigator.clipboard.writeText(trackingUrl);
    alert("Generated fleet tracking path copied safely to clipboard buffer.");
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      {/* Central Detail Display Panel Frame */}
      <div className="bg-white border-2 border-black p-6 w-full max-w-sm space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
        
        {/* Header Block Section and Context Labels */}
        <div className="border-b border-black pb-2 flex justify-between items-center">
          <div>
            <span className="text-[9px] text-neutral-400 font-mono font-bold uppercase">Record Analytics Drilldown</span>
            <h3 className="text-md font-black uppercase tracking-tight">Order #{record.id} Logs</h3>
          </div>
          <button onClick={onClose} className="text-xs font-bold border border-black px-2 py-0.5">✕</button>
        </div>

        {/* Technical Metadata Parameters Layout Values Stack */}
        <div className="space-y-3 text-xs font-medium text-neutral-600">
          <div><span className="font-bold text-black uppercase block text-[9px] tracking-wider text-neutral-400">Client Profile:</span> <span className="text-sm font-bold text-black uppercase">{record.customerName}</span></div>
          <div><span className="font-bold text-black uppercase block text-[9px] tracking-wider text-neutral-400">Client Line:</span> <span className="font-mono text-black">{record.customerPhone}</span></div>
          <div><span className="font-bold text-black uppercase block text-[9px] tracking-wider text-neutral-400">Courier Line:</span> <span className="font-mono text-black">{record.riderPhone}</span></div>
          <div><span className="font-bold text-black uppercase block text-[9px] tracking-wider text-neutral-400">Drop Address:</span> <span className="text-black font-bold">{record.address}</span></div>
          
          {/* Tracking Step Milestone Badge Flag Container */}
          <div>
            <span className="font-bold text-black uppercase block text-[9px] tracking-wider text-neutral-400">Pipeline Timeline Status:</span>
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-black uppercase border border-black bg-neutral-100 text-black">
              {record.status}
            </span>
          </div>
        </div>

        {/* Active Interaction Option Action Keys Row Container */}
        <div className="pt-2 border-t border-neutral-100 space-y-2">
          {/* Clipboard Management Protocol Hook Button Trigger */}
          <button 
            onClick={handleCopySecureLink}
            className="w-full text-center border border-black bg-white text-black py-2.5 text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-50 transition"
          >
            📋 Copy Secure Tracking Link
          </button>
          
          {/* System Modal Visibility Closer Node Switch Trigger */}
          <button 
            onClick={onClose} 
            className="w-full text-center border border-transparent bg-neutral-100 text-neutral-500 py-2 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition"
          >
            Close Logs Window
          </button>
        </div>
      </div>
    </div>
  );
}
