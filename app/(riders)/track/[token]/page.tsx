// app/(riders)/track/[token]/page.tsx
/**
 * PRIMARY DEPLOYED DRIVER OPERATION MANAGEMENT PANEL
 * Orchestrates divided modules, safety confirmations, runtime tokens checks, and mutation handlers.
 */

"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

// Importing isolated modular segments cleanly from our component folder layer
import ProgressTrackBar from "./components/ProgressTrackBar";
import DeliveryInfoCard from "./components/DeliveryInfoCard";
import DeliveryNotesCard from "./components/DeliveryNotesCard";
import ContactCustomerPanel from "./components/ContactCustomerPanel";

export default function RiderTrackingPage() {
  // Capture the URL parameter path variables
  const params = useParams();
  const token = params?.token as string;

  // Local state handling driver session simulation configurations
  const [delivery, setDelivery] = useState({
    id: "1048",
    customerName: "John Doe",
    customerPhone: "08012345678",
    deliveryAddress: "12 Allen Avenue, Ikeja, Lagos State, Nigeria",
    notes: "Call customer before arrival. Gate code is #4930 if front desk operator is unavailable.",
    status: "pending" as "pending" | "picked_up" | "arrived" | "delivered",
    isPremium: false
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Validate operational link criteria before serving asset matrices
  if (token === "expired" || !token) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center">
        <div className="border border-black p-8 max-w-sm space-y-4">
          <div className="text-3xl">❌</div>
          <h1 className="text-xl font-black uppercase tracking-tight">Delivery Link Invalid</h1>
          <p className="text-xs font-medium text-neutral-600">
            This deployment routing sequence parameter mapping is no longer available inside active databases.
          </p>
        </div>
      </div>
    );
  }

  // Intercept and break workflow display operations if system state is complete
  if (delivery.status as string === "delivered") {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center">
        <div className="border-2 border-black bg-white p-8 max-w-sm space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-3xl">✅</div>
          <h1 className="text-xl font-black uppercase tracking-tight">Delivery Completed</h1>
          <p className="text-xs font-medium text-neutral-600">
            The core logistics platform pipeline validation has concluded safely. You may now close this browser tab safely.
          </p>
        </div>
      </div>
    );
  }

  // Handle stage validation changes safely
  const handleUpdateStatus = (targetNextStatus: typeof delivery.status) => {
    if (targetNextStatus === "delivered") {
      setShowConfirmModal(true);
      return;
    }
    setDelivery({ ...delivery, status: targetNextStatus });
  };

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

      {/* Main Container Injector Area Grid */}
      <main className="max-w-md mx-auto px-4 mt-6 space-y-6">
        <ProgressTrackBar status={delivery.status} />
        <DeliveryInfoCard data={delivery} />
        <DeliveryNotesCard notes={delivery.notes} />
        <ContactCustomerPanel data={delivery} />

        {/* 3 Large Touch Interaction Targets Panels */}
        <div className="space-y-4 pt-2">
          <span className="block text-[9px] uppercase font-black tracking-widest text-neutral-400 text-center">
            Required Step Sequences (Tap to change status)
          </span>

          {/* TAP TARGET 1: PICKED UP */}
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

          {/* TAP TARGET 2: ARRIVED */}
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

          {/* TAP TARGET 3: DELIVERED */}
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

      {/* RECONCILIATION MODAL POPUP GATEWAY */}
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
              <button
                onClick={() => setShowConfirmModal(false)}
                className="border border-black bg-white text-black py-2.5 hover:bg-neutral-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setDelivery({ ...delivery, status: "delivered" });
                }}
                className="border border-black bg-black text-white py-2.5 hover:bg-neutral-900 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
