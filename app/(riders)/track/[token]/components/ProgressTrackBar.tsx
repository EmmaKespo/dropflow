// app/(riders)/track/[token]/components/ProgressTrackBar.tsx
/**
 *  REAL-TIME PIPELINE VISUAL TIMELINE INDICATOR
 * Renders spatial state completion checks using custom high-contrast monochrome tokens.
 */

import React from "react";

export default function ProgressTrackBar({ status }: { status: "pending" | "picked_up" | "arrived" | "delivered" }) {
  // Evaluation maps determining active checkpoint assertions safely
  const isPickedUp = status !== "pending";
  const isArrived = status === "arrived" || status === "delivered";
  const isDelivered = status === "delivered";

  return (
    <div className="border border-black bg-white p-4">
      <div className="flex items-center justify-between max-w-xs mx-auto text-[10px] font-bold uppercase tracking-wider text-center">
        {/* Operational Segment Milestone Check 1 */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div className={`h-4 w-4 rounded-full border-2 ${isPickedUp ? "bg-black border-black" : "bg-white border-neutral-300"}`} />
          <span className={isPickedUp ? "text-black font-black" : "text-neutral-400"}>Picked Up</span>
        </div>
        {/* Core Connection Rule Line 1 */}
        <div className={`h-0.5 flex-1 -mt-4 transition-colors ${isArrived ? "bg-black" : "bg-neutral-200"}`} />
        
        {/* Operational Segment Milestone Check 2 */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div className={`h-4 w-4 rounded-full border-2 ${isArrived ? "bg-black border-black" : "bg-white border-neutral-300"}`} />
          <span className={isArrived ? "text-black font-black" : "text-neutral-400"}>Arrived</span>
        </div>
        {/* Core Connection Rule Line 2 */}
        <div className={`h-0.5 flex-1 -mt-4 transition-colors ${isDelivered ? "bg-black" : "bg-neutral-200"}`} />

        {/* Operational Segment Milestone Check 3 */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div className={`h-4 w-4 rounded-full border-2 ${isDelivered ? "bg-black border-black" : "bg-white border-neutral-300"}`} />
          <span className={isDelivered ? "text-black font-black" : "text-neutral-400"}>Delivered</span>
        </div>
      </div>
    </div>
  );
}
