// app/(riders)/track/[token]/page.tsx
/**
 * SUPABASE SECURE TOKEN ROUTE INITIALIZER
 * Resolves the dynamic URL token slug to pull specific delivery records 
 * directly from your live database under unauthenticated public access.
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Importing isolated modular segments cleanly from our component folder layer
import ProgressTrackBar from "./components/ProgressTrackBar";
import DeliveryInfoCard from "./components/DeliveryInfoCard";
import DeliveryNotesCard from "./components/DeliveryNotesCard";
import ContactCustomerPanel from "./components/ContactCustomerPanel";

export default function RiderTrackingPage() {
  const params = useParams();
  const token = params?.token as string;

  // Type-safe dynamic delivery hook container matching your explicit schema layout
  const [delivery, setDelivery] = useState<{
    id: string;
    rawId: string;
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    notes: string;
    status: "pending" | "picked_up" | "arrived" | "delivered";
    isPremium: boolean;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // OPTIMIZED STABLE DATA LOAD ENGINE MATCHING TOKEN HASH CODES
 // 1. Reusable fetch function
const loadRiderTelemetryData = useCallback(async () => {
  if (!token) return;

  setIsLoading(true);
  try {
    const { data: row, error } = await supabase
      .from("deliveries")
      .select("id, customer_name, customer_phone, delivery_address, status, tracking_token, business_id")
      .eq("tracking_token", token)
      .single();

    if (error || !row) {
      setDelivery(null);
      return;
    }

    let mappedStatus: "pending" | "picked_up" | "arrived" | "delivered" = "pending";
    if (row.status === "picked_up") mappedStatus = "picked_up";
    if (row.status === "arrived") mappedStatus = "arrived";
    if (row.status === "delivered") mappedStatus = "delivered";

    setDelivery({
      id: row.id.substring(0, 8).toUpperCase(),
      rawId: row.id,
      customerName: row.customer_name,
      customerPhone: row.customer_phone,
      deliveryAddress: row.delivery_address,
      notes: "Call customer before arrival.",
      status: mappedStatus,
      isPremium: row.business_id !== null,
    });
  } catch (err) {
    console.error("RIDER RECOVERY ENGINE FAULT:", err);
    setDelivery(null);
  } finally {
    setIsLoading(false);
  }
}, [token]);

// 2. Trigger asynchronously in useEffect using setTimeout
useEffect(() => {
  const timer = setTimeout(() => {
    loadRiderTelemetryData();
  }, 0);

  return () => clearTimeout(timer);
}, [loadRiderTelemetryData]);


const handleUpdateStatus = async (
  targetNextStatus: "pending" | "picked_up" | "arrived" | "delivered"
) => {
  if (!delivery) return;

  // Intercept completion actions with the physical layout verification modal overlay
  if (targetNextStatus === "delivered" && !showConfirmModal) {
    setShowConfirmModal(true);
    return;
  }

  setIsLoading(true);
  try {
    const updatePayload: Record<string, unknown> = { status: targetNextStatus };

    if (targetNextStatus === "picked_up") updatePayload.picked_up_at = new Date().toISOString();
    if (targetNextStatus === "arrived") updatePayload.arrived_at = new Date().toISOString();
    if (targetNextStatus === "delivered") updatePayload.delivered_at = new Date().toISOString();

    // 1. Update the core delivery status and timestamp fields
  const { error: updateError } = await supabase
      .from("deliveries")
      .update(updatePayload)
      .eq("id", delivery.rawId);

    if (updateError) throw updateError;

     // Inject a new immutable milestone record straight into your activity_logs
  const { error: logError } = await supabase
    .from("activity_logs")
    .insert([{
      delivery_id: delivery.rawId, // Links logs directly to our active delivery item
      event_type: targetNextStatus // Saves the exact action string ('picked_up', 'arrived', 'delivered')
    }]);

  if (logError) throw logError;

  // AUTOMATED NOTIFICATION TRANSACTIONAL LOGGING GATEWAY
// =======================================================
// Check if the rider just checked into the drop point destination checkpoint
if (targetNextStatus === "arrived") {
  console.log(" Arrival checkpoint hit. Triggering server-side notification auditing record...");
  
  const { error: notificationLogError } = await supabase
    .from("notifications")
    .insert([{
      delivery_id: delivery.rawId,           // Links message directly to the specific order item 
      recipient_type: "customer",             // Sets target destination role flag 
      recipient_phone: delivery.customerPhone, // Passes recipient contact string 
      notification_type: "customer_arrived",  // Marks explicit message timeline event token
      channel: "whatsapp",                    // Communication channel identifier 
      status: "pending"                       // Sets baseline entry tracking state before Twilio fires
    }]);

  if (notificationLogError) {
    // Console log the error but don't crash the rider workflow if the audit layer slips
    console.error("NOTIFICATION AUDIT REGISTRATION FAULT:", notificationLogError.message);
  }
  
  // FIRE OUTBOUND CLOUD GATEWAY FETCH TRIGGER PIPELINE
// =========================================================================
// Silently dispatch notification tasks to background server routes
try {
  fetch("/api/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      deliveryId: delivery.rawId,
      customerPhone: delivery.customerPhone,
      customerName: delivery.customerName,
      trackingToken: token
    })
  });
} catch (apiFetchSilentErr) {
  console.error("SERVERLESS ROUTE DISPATCH FAULT:", apiFetchSilentErr);
}
}

    // Refresh local screen parameters cleanly from database definitions
    await loadRiderTelemetryData();
    setShowConfirmModal(false);
  } catch (err) {
    const error = err as Error;
    console.error("RIDER TELEMETRY OVERRIDE CRASH:", error.message);
    alert(`Update Failed: ${error.message || "Database permission rejection."}`);
    setIsLoading(false);
  }
};


  // Loading skeleton block page wrapper frame boundary
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center p-6 font-mono text-xs text-neutral-400 animate-pulse uppercase tracking-widest">
        Resolving secure token telemetry matrices...
      </div>
    );
  }

  // Intercept and throw specific link validation error screens if lookup returns empty arrays [26-Jul-26 11:37 AM]
  if (!delivery) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center">
        <div className="border border-black p-8 max-w-sm space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-3xl">❌</div>
          <h1 className="text-xl font-black uppercase tracking-tight">Delivery Link Invalid</h1>
          <p className="text-xs font-medium text-neutral-600 leading-relaxed">
            This deployment routing link token mapping is no longer valid or has expired. Please contact the dispatch sender business for support.
          </p>
        </div>
      </div>
    );
  }

  // Check if active delivery has already reached terminal completion
  if ((delivery.status as string) === "delivered") {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center">
        <div className="border-2 border-black bg-white p-8 max-w-sm space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-3xl">✅</div>
          <h1 className="text-xl font-black uppercase tracking-tight">Delivery Already Completed</h1>
          <p className="text-xs font-medium text-neutral-600 leading-relaxed">
            This tracking token route has concluded successfully. No further action is required. You may close this page window safely.
          </p>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-neutral-50 text-black pb-12 select-none relative">
      <header className="bg-white border-b border-black py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 flex items-center justify-between">
          <span className="text-xs font-black tracking-widest uppercase">Dropflow Rider Panel</span>
          <span className="text-[10px] font-mono font-bold bg-neutral-100 border border-neutral-300 px-2 py-0.5">
            Token: {token.substring(0, 6)}...
          </span>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-6 space-y-6">
        <ProgressTrackBar status={delivery.status} />
        <DeliveryInfoCard data={delivery} />
        <DeliveryNotesCard notes={delivery.notes} />
        <ContactCustomerPanel data={delivery} />

        <div className="space-y-4 pt-2">
          <span className="block text-[9px] uppercase font-black tracking-widest text-neutral-400 text-center">
            Required Step Sequences (Tap to change status)
          </span>

          <button
            onClick={() => handleUpdateStatus("picked_up")}
            disabled={delivery.status !== "pending"}
            className={`w-full py-4 text-center border-2 text-sm font-black uppercase tracking-widest transition-all duration-150 flex items-center justify-center gap-2 ${
              delivery.status === "pending"
                ? "bg-[#FBBF24] border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                : "bg-neutral-100 border-neutral-300 text-neutral-400 cursor-not-allowed"
            }`}
          >
            <span>🟡</span> Picked Up
          </button>

          <button
            onClick={() => handleUpdateStatus("arrived")}
            disabled={delivery.status !== "picked_up"}
            className={`w-full py-4 text-center border-2 text-sm font-black uppercase tracking-widest transition-all duration-150 flex items-center justify-center gap-2 ${
              delivery.status === "picked_up"
                ? "bg-[#F97316] border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                : "bg-neutral-100 border-neutral-300 text-neutral-400 cursor-not-allowed"
            }`}
          >
            <span>🟠</span> Arrived
          </button>

          <button
            onClick={() => handleUpdateStatus("delivered")}
            disabled={delivery.status !== "arrived"}
            className={`w-full py-4 text-center border-2 text-sm font-black uppercase tracking-widest transition-all duration-150 flex items-center justify-center gap-2 ${
              delivery.status === "arrived"
                ? "bg-[#22C55E] border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                : "bg-neutral-100 border-neutral-300 text-neutral-400 cursor-not-allowed"
            }`}
          >
            <span>🟢</span> Delivered
          </button>
        </div>
      </main>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border-2 border-black p-6 w-full max-w-xs space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-2">
              <h3 className="text-md font-black uppercase tracking-tight">Confirm Status Modification?</h3>
              <p className="text-xs font-medium text-neutral-600">
                Are you absolutely sure this package has been successfully delivered? This operation locks further tracking data entries.
              </p>
            </div>
<div className="grid grid-cols-2 gap-3 text-xs font-black uppercase tracking-wider">
  <button onClick={() => setShowConfirmModal(false)} className="border border-black bg-white text-black py-2.5 hover:bg-neutral-50 transition">Cancel</button>
  
  {/* FIX: Trigger the direct delivery state transition upon manual operator verification */}
  <button onClick={() => handleUpdateStatus("delivered")} className="border border-black bg-black text-white py-2.5 hover:bg-neutral-900 transition">Confirm</button>
</div>

          </div>
        </div>
      )}
    </div>
  );
}
