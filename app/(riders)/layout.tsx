// app/(riders)/layout.tsx
/**
 * NO TOMORROW HEADIN COMMENT: MINIMAL STRIPPED CORES SHELL WRAPPER LAYOUT FOR OPERATIONAL DRIVERS
 * Provides layout containers tailored directly for performance-tuned mobile navigation scenarios.
 */

import React from "react";

export default function RidersRouteGroupShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-neutral-100 text-black flex flex-col antialiased">
      {/* Structural layout wrapper sandbox providing content delivery targets isolated from marketing layouts */}
      <div className="w-full flex-1 max-w-md mx-auto bg-white border-x border-neutral-200 shadow-xs">
        {children}
      </div>
    </div>
  );
}
