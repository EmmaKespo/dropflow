// app/(admin)/components/DashboardSkeleton.tsx
/**
 * MINIMALIST HIGH-CONTRAST DATA PACK SKELETON
 * Displays uniform loading visual blocks, preventing jarring template layout shifts.
 */

import React from "react";

export default function DashboardSkeleton() {
  return (
    <div className="border border-black p-8 text-center bg-white font-mono text-xs text-neutral-400 uppercase tracking-widest space-y-2 animate-pulse">
      <div>Querying live manifest array records...</div>
      <div className="w-full max-w-xs h-1.5 bg-neutral-100 mx-auto rounded-full overflow-hidden">
        <div className="w-1/2 h-full bg-neutral-300 animate-slide" />
      </div>
    </div>
  );
}
