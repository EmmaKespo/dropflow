"use client";

import React from "react";
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

  const isRowActive = (targetPath: string) => pathname === targetPath;

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs" />
      )}

    {/* FIXED: On medium+ screens (md:), force translate-x-0 so it's always visible */}
<aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r-2 border-black z-50 transition-transform duration-200 flex flex-col justify-between ${
  isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
}`}>
        <div className="flex flex-col flex-1">
          <div className="border-b border-black p-4 flex justify-between items-center bg-neutral-50">
            <div>
              <span className="text-[10px] font-mono font-black text-neutral-400 block tracking-widest uppercase">Console Panel</span>
              <span className="text-xl font-black tracking-tighter uppercase text-black">DROPFLOW</span>
            </div>
            <button onClick={onClose} className="md:hidden text-xs font-bold border border-black px-2 py-0.5 bg-white">✕</button>
          </div>

          <nav className="flex-1 text-xs font-black uppercase tracking-wider text-left">
            <Link href="/dashboard" onClick={onClose} className={`flex items-center gap-3 px-4 py-3.5 border-b border-black transition ${
              isRowActive("/dashboard") ? "bg-black text-white" : "text-black hover:bg-neutral-50 bg-white"
            }`}>
              <i className="fa-solid fa-chart-simple small-icon"></i> Core Monitor Dashboard
            </Link>
            <Link href="/deliveries" onClick={onClose} className={`flex items-center gap-3 px-4 py-3.5 border-b border-black transition ${
              isRowActive("/deliveries") ? "bg-black text-white" : "text-black hover:bg-neutral-50 bg-white"
            }`}>
              <i className="fa-solid fa-folder-closed small-icon"></i> Deliveries Ledger Matrix
            </Link>
            <Link href="/activity" onClick={onClose} className={`flex items-center gap-3 px-4 py-3.5 border-b border-black transition ${
              isRowActive("/activity") ? "bg-black text-white" : "text-black hover:bg-neutral-50 bg-white"
            }`}>
              <i className="fa-regular fa-clock small-icon"></i> Real-Time Activity Feed
            </Link>
            <Link href="/analytics" onClick={onClose} className={`flex items-center gap-3 px-4 py-3.5 border-b border-black transition ${
              isRowActive("/analytics") ? "bg-black text-white" : "text-black hover:bg-neutral-50 bg-white"
            }`}>
              <i className="fa-solid fa-chart-line small-icon"></i> Fleet Performance Analytics
            </Link>
            <Link href="/settings" onClick={onClose} className={`flex items-center gap-3 px-4 py-3.5 border-b border-black transition ${
              isRowActive("/settings") ? "bg-black text-white" : "text-black hover:bg-neutral-50 bg-white"
            }`}>
              <i className="fa-solid fa-gear small-icon"></i> System Account Settings
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-black bg-neutral-50">
          <button onClick={handleSystemLogout} className="w-full flex items-center justify-center gap-2 border-2 border-black bg-red-50 text-red-700 py-2.5 text-xs font-extrabold uppercase tracking-widest hover:bg-red-100 transition cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <i className="fa-solid fa-right-from-bracket small-icon"></i> Exit Fleet Console
          </button>
        </div>
      </aside>
    </>
  );
}