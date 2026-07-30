// app/(admin)/components/AdminSidebar.tsx
/**
 * HYDRATION-SAFE PRODUCTION NAVIGATION SIDEBAR
 * Encapsulates window routing lookups inside safe asynchronous mounting hooks 
 * to guarantee immediate visibility across all administrative viewports.
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: string;
  setActiveTab?: (v: string) => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Client state to prevent server rendering hydration mismatch flashes
 const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setIsMounted(true);
  }, 0);

  return () => clearTimeout(timer);
}, []);

  const handleSystemLogout = async () => {
    if (!window.confirm("Are you sure you want to securely log out of this fleet console?")) return;
    
    try {
      await supabase.auth.signOut();
      document.cookie = "sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      onClose();
      router.push("/login");
    } catch (err) {
      console.error("LOGOUT TERMINATION CRASH:", err);
    }
  };

  // Safe client-side conditional highlighting logic
  const isRowActive = (targetPath: string) => {
    if (!isMounted) return false;
    return pathname === targetPath;
  };

  // Render a clean structural layout bounding block if server is compiling
  if (!isMounted) {
    return <div className="hidden md:block fixed inset-y-0 left-0 w-64 bg-white border-r-2 border-black z-50" />;
  }

  return (
    <>
      {/* Mobile Drawer Overlay Background Sheet */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* CORE SIDEBAR STRUCTURAL COLUMN */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r-2 border-black z-50 transform md:transform-none transition-transform duration-200 flex flex-col justify-between ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        {/* Top Branding Section Layout */}
        <div className="flex flex-col flex-1">
          <div className="border-b border-black p-4 flex justify-between items-center bg-neutral-50">
            <div>
              <span className="text-[10px] font-mono font-black text-neutral-400 block tracking-widest uppercase">Console Panel</span>
              <span className="text-xl font-black tracking-tighter uppercase text-black">DROPFLOW</span>
            </div>
            <button onClick={onClose} className="md:hidden text-xs font-bold border border-black px-2 py-0.5 bg-white">✕</button>
          </div>

          {/* DYNAMIC NAVIGATION LINKS BLOCK */}
          <nav className="flex-1 text-xs font-black uppercase tracking-wider text-left">
            
            <Link 
              href="/dashboard" onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3.5 border-b border-black transition ${
                isRowActive("/dashboard") ? "bg-black text-white" : "text-black hover:bg-neutral-50 bg-white"
              }`}
            >
              📊 Core Monitor Dashboard
            </Link>

            <Link 
              href="/deliveries" onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3.5 border-b border-black transition ${
                isRowActive("/deliveries") ? "bg-black text-white" : "text-black hover:bg-neutral-50 bg-white"
              }`}
            >
              📂 Deliveries Ledger Matrix
            </Link>

            <Link 
              href="/activity" onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3.5 border-b border-black transition ${
                isRowActive("/activity") ? "bg-black text-white" : "text-black hover:bg-neutral-50 bg-white"
              }`}
            >
              ⏱️ Real-Time Activity Feed
            </Link>

            <Link 
              href="/analytics" onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3.5 border-b border-black transition ${
                isRowActive("/analytics") ? "bg-black text-white" : "text-black hover:bg-neutral-50 bg-white"
              }`}
            >
              📈 Fleet Performance Analytics
            </Link>

            <Link 
              href="/settings" onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3.5 border-b border-black transition ${
                isRowActive("/settings") ? "bg-black text-white" : "text-black hover:bg-neutral-50 bg-white"
              }`}
            >
              ⚙️ System Account Settings
            </Link>

          </nav>
        </div>

        {/* SECURED ACCOUNT REJECTION EXIT SYSTEM TRIGGER */}
        <div className="p-4 border-t border-black bg-neutral-50">
          <button 
            onClick={handleSystemLogout}
            className="w-full text-center border-2 border-black bg-red-50 text-red-700 py-2.5 text-xs font-extrabold uppercase tracking-widest hover:bg-red-100 transition cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            🚪 Exit Fleet Console
          </button>
        </div>

      </aside>
    </>
  );
}
