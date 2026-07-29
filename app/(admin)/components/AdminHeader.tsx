// app/(admin)/components/AdminHeader.tsx
/**
 * ISOLATED PLATFORM STATUS CONTROLLER HEADER
 * Queries your live Supabase profiles table using active authentication sessions 
 * to inject business metadata directly into the top navigation row panel.
 */

"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const [businessName, setBusinessName] = useState("Loading Terminal...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHeaderProfile() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw new Error("No active session.");

        const { data: profileRow, error: profileError } = await supabase
          .from("profiles")
          .select("business_name")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;
        if (profileRow) setBusinessName(profileRow.business_name);
      }  catch (err) { // Omit the type declaration here
  const error = err as Error; // Typecast inside the block
  console.error("PROFILE TELEMETRY FETCH FAILED:", error.message);
  setBusinessName("Unknown Fleet Operator");
} finally {
  setIsLoading(false);
}
    }
    fetchHeaderProfile();
  }, []);

  return (
    <header className="bg-white border-b border-black py-4 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mobile touch indicator menu button toggle switch */}
        <button 
          onClick={onMenuToggle}
          className="md:hidden border border-black p-2 bg-white text-xs font-black uppercase"
        >
          Menu
        </button>
        <div>
          <h1 className="text-md font-black uppercase tracking-tight">{businessName} Workspace</h1>
          <span className="text-[10px] font-mono text-neutral-400 font-bold block -mt-0.5">
            Terminal Operator Date: {new Date().toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className={`h-2 w-2 rounded-full animate-pulse ${isLoading ? "bg-amber-500" : "bg-emerald-500"}`} />
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-neutral-500 hidden sm:inline">
          {isLoading ? "Synchronizing Schema..." : "Supabase Gateway Active"}
        </span>
      </div>
    </header>
  );
}
