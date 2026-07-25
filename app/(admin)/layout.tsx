// app/(admin)/layout.tsx
/**
 * SECURE BASE ENCLOSING CANVAS LAYOUT SHELL
 * Enforces unified canvas alignments across premium backoffice workspace modules.
 */

import React from "react";

export default function AdminProtectedGroupRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Establishes a standard screen baseline canvas layout wrapper
    <div className="w-full min-h-screen bg-neutral-50 text-black antialiased">
      {/* Target injection slot mounting nested dashboard views smoothly */}
      {children}
    </div>
  );
}
