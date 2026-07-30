// app/(admin)/components/DeliveryDetailModal.tsx
/**
 * PLATFORM ANALYTICAL CRITICAL DRILLDOWN MODULE
 * Displays comprehensive delivery row entries, handles automated notification checks, 
 * and provides backoffice manual update and deletion pipelines under strict RLS constraints.
 */

import React, { useState } from "react";
import { DeliveryRecord } from "./DeliveriesTable";
import { supabase } from "@/lib/supabase";
interface DeliveryRecordWithIds extends DeliveryRecord {
  rawId?: string;
  tokenSlug?: string;
}

interface DeliveryDetailModalProps { 
  record: DeliveryRecordWithIds | null; 
  onClose: () => void; 
  onRowMutation: () => void;
}

// interface DeliveryDetailModalProps {
//   record: DeliveryRecord | null;
//   onClose: () => void;
//   onRowMutation: () => void; // Refresh callback hook to update master data tables
// }

export default function DeliveryDetailModal({
  record,
  onClose,
  onRowMutation
}: DeliveryDetailModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!record) return null;

  // Handle manual database status modifications directly from the backoffice dashboard [26-Jul-26 11:37 AM]
  const handleModifyStatus = async (targetNextStatus: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const { error } = await supabase
        .from("deliveries")
        .update({ status: targetNextStatus })
          .eq("id", record.rawId); // Uses full un-truncated database UUID lines

      if (error) throw error;
      onRowMutation(); // Trigger re-fetch loop on master page
      onClose();
    } catch (err) {
      const error = err as Error
      alert(`Status Mutation Aborted: ${error.message || "RLS Security Policy Rejection."}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle total database manifest removal options [26-Jul-26 11:37 AM]
  const handlePurgeManifest = async () => {
    if (!window.confirm("Are you completely certain you want to delete this delivery manifest record from active logs?")) return;
    setIsProcessing(true);

    try {
      const { error } = await supabase
        .from("deliveries")
        .delete()
        .eq("id", record.rawId);

      if (error) throw error;
      onRowMutation();
      onClose();
    } catch (err) {
      const error = err as Error
      alert(`Purge Operation Aborted: ${error.message || "RLS Violation."}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopySecureLink = () => {
    const trackingUrl = `${window.location.origin}/track/${record.tokenSlug}`;
    navigator.clipboard.writeText(trackingUrl);
    alert("Generated fleet tracking path copied safely to clipboard buffer.");
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white border-2 border-black p-6 w-full max-w-sm space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
        
        <div className="border-b border-black pb-2 flex justify-between items-center">
          <div>
            <span className="text-[9px] text-neutral-400 font-mono font-bold uppercase">Record Analytics Drilldown</span>
            <h3 className="text-md font-black uppercase tracking-tight">Order #{record.id}</h3>
          </div>
          <button onClick={onClose} className="text-xs font-bold border border-black px-2 py-0.5">✕</button>
        </div>

        <div className="space-y-3 text-xs font-medium text-neutral-600">
          <div><span className="font-bold text-black uppercase block text-[9px] tracking-wider text-neutral-400">Client Profile:</span> <span className="text-sm font-bold text-black uppercase">{record.customerName}</span></div>
          <div><span className="font-bold text-black uppercase block text-[9px] tracking-wider text-neutral-400">Client Line:</span> <span className="font-mono text-black">{record.customerPhone}</span></div>
          <div><span className="font-bold text-black uppercase block text-[9px] tracking-wider text-neutral-400">Courier Line:</span> <span className="font-mono text-black">{record.riderPhone}</span></div>
          <div><span className="font-bold text-black uppercase block text-[9px] tracking-wider text-neutral-400">Drop Address:</span> <span className="text-black font-bold">{record.address}</span></div>
          <div>
            <span className="font-bold text-black uppercase block text-[9px] tracking-wider text-neutral-400">Pipeline Timeline Status:</span>
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-black uppercase border border-black bg-neutral-100 text-black">
              {record.status}
            </span>
          </div>
        </div>

        {/* Dynamic Backoffice CRUD Control Switches */}
        <div className="pt-2 border-t border-neutral-200 space-y-2">
          <span className="block text-[8px] font-black uppercase tracking-widest text-neutral-400">Manual Control Overrides</span>
          <div className="grid grid-cols-3 gap-1.5 text-[9px] font-black uppercase tracking-wider">
            <button disabled={isProcessing} onClick={() => handleModifyStatus("picked_up")} className="border border-black bg-white py-1.5 hover:bg-neutral-50 transition text-center">Pick Up</button>
            <button disabled={isProcessing} onClick={() => handleModifyStatus("arrived")} className="border border-black bg-white py-1.5 hover:bg-neutral-50 transition text-center">Arrive</button>
            <button disabled={isProcessing} onClick={() => handleModifyStatus("delivered")} className="border border-black bg-white py-1.5 hover:bg-neutral-50 transition text-center">Deliver</button>
          </div>

          <button 
            onClick={handleCopySecureLink}
            className="w-full text-center border border-black bg-white text-black py-2 text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-50 transition"
          >
            📋 Copy Secure Tracking Link
          </button>

          <button 
            disabled={isProcessing}
            onClick={handlePurgeManifest}
            className="w-full text-center border border-red-600 bg-red-50 text-red-700 py-2 text-xs font-extrabold uppercase tracking-widest hover:bg-red-100 transition"
          >
            🚨 Delete Delivery Manifest
          </button>
        </div>
      </div>
    </div>
  );
}
