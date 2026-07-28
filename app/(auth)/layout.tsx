// app/(auth)/layout.tsx
/**
 *MONOCHROME AUTHENTICATION CANVAS SKIN SHELL
 * Formats a clean structural bounding context card centered precisely inside viewports.
 * Minimizes background noise to speed up business sign-ins.
 */

import React from "react";
import Link from "next/link";

export default function AuthenticationRouteGroupShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Base structural background container canvas layer forcing pure white workspace palette
    <div className="min-h-screen bg-neutral-50 text-black flex flex-col items-center justify-center p-4 antialiased selection:bg-black selection:text-white">
      
      {/* ----------------- AUTH CONTAINER STRUCTURE ----------------- */}
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand System Core Centered Title Link Element */}
        <div className="text-center">
          <Link 
            href="/" 
            className="text-3xl font-black tracking-tighter uppercase inline-block border-2 border-transparent hover:border-black px-2 py-1 transition-all duration-150"
          >
            DROPFLOW
          </Link>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">
            Logistics Verification Node
          </p>
        </div>

        {/* 
          CENTRAL HIGH-CONTRAST DATA WORKSPACE CARD 
          Implements sharp brutalist board lines matching your brand parameters definitions
        */}
        <main className="bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
          {children}
        </main>

        {/* Minimal Bottom Help Desk Context Footer Reference */}
        <div className="text-center text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Secured Profile Pipeline &copy; {new Date().getFullYear()} Dropflow Inc.
        </div>
      </div>
    </div>
  );
}
