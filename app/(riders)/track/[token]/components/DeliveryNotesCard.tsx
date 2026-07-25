// app/(riders)/track/[token]/components/DeliveryNotesCard.tsx
/**
 * DRIVER SPECIAL INSTRUCTIONS OVERLAY CONTAINER
 * Handles spatial delivery exceptions or door passcode strings cleanly.
 */

import React from "react";

export default function DeliveryNotesCard({ notes }: { notes?: string }) {
  // Prevent template output mutations if structural records parameters are blank
  if (!notes) return null;

  return (
    <div className="border border-black bg-neutral-50 p-4 space-y-1">
      <span className="block text-[9px] uppercase font-black tracking-widest text-neutral-500">
        📝 Core Delivery Handling Notes
      </span>
      <p className="text-xs font-bold text-black leading-relaxed">
        {notes}
      </p>
    </div>
  );
}
