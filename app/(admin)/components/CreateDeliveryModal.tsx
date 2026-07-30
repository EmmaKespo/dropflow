// app/(admin)/components/CreateDeliveryModal.tsx
/**
 * TYPE-SAFE MANIFEST CREATION MODAL CONTAINER
 * Adapts the modular shared form component cleanly to the corporate dashboard context.
 */

import React from "react";
import SharedDeliveryForm, { FormSubmittedRecord } from "@/components/shared-form";

// Define the exact props contract required to talk to the dashboard orchestrator
interface CreateDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Reconciled parameter mapping to match your optimized FormSubmittedRecord shape layout
  onSubmit: (record: FormSubmittedRecord) => void;
}

export default function CreateDeliveryModal({ 
  isOpen, 
  onClose, 
  onSubmit 
}: CreateDeliveryModalProps) {
  
  // Intercept and halt rendering logic if display parameters evaluate to hidden
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      {/* Central Modal Dashboard Panel Housing Box Layout */}
      <div className="bg-white border-2 border-black p-6 w-full max-w-md space-y-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
        
        {/* Header Metadata Control Action Strip Layout Bar */}
        <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
          <h3 className="text-lg font-black uppercase tracking-tight">Deploy System Delivery Manifest</h3>
          <button onClick={onClose} className="text-xs font-bold border border-black px-2 py-0.5 hover:bg-neutral-100 transition">✕</button>
        </div>

        {/* Reusable Core Data Intake Form Engine Matrix */}
        <SharedDeliveryForm 
          userType="premium" 
          onSuccessAction={(record) => {
            // Forward the processed telemetry record straight up to the dashboard state row store
            onSubmit(record);
            // Close the overlay structural card instantly upon successful pipeline validation completion
            onClose();
          }} 
        />
      </div>
    </div>
  );
}
