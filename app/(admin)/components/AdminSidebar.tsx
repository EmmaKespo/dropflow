// app/(admin)/components/AdminSidebar.tsx
/**
 * PERSISTENT PLATFORM NAVIGATION ENGINE INTERFACE
 * Renders the structural navigation column. Manages state translations for drawer views.
 */

import React from "react";
import Link from "next/link";

// Local typing structure protecting menu parameters mapping properties
interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab 
}: AdminSidebarProps) {
  // Navigation links metadata array matrix mapping interface states
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "deliveries", label: "Deliveries", icon: "📦" },
    { id: "activity", label: "Activity Feed", icon: "🔔" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <>
      {/* Structural Mobile Canvas Backdrop Layer Overlay: Catches closure touch signals */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity"
        />
      )}

      {/* Primary Sidebar Container Element Panel Frame Layout */}
      <aside className={`fixed top-0 bottom-0 left-0 bg-white border-r border-black w-64 z-50 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex-1 flex flex-col">
          {/* Brand Logo Text Box Title Segment Banner */}
          <div className="p-6 border-b border-black flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <span className="text-xl font-black tracking-tighter">DROPFLOW</span>
            </div>
            {/* Mobile Touch Close Interceptor Switch Option Button */}
            <button onClick={onClose} className="md:hidden text-xs font-bold border border-black px-2 py-1">
              Close
            </button>
          </div>

          {/* Core Sidebar Workspace Selection Links Matrix List */}
          <nav className="flex-1 p-4 space-y-1 pt-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-extrabold uppercase tracking-wider transition border ${
                  activeTab === item.id 
                    ? "bg-black text-white border-black" 
                    : "bg-white text-black border-transparent hover:border-black"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Global Exit Boundary Router Gateway Button Link Component */}
        <div className="p-4 border-t border-black bg-neutral-50">
          <Link 
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-extrabold uppercase tracking-widest bg-white border border-black text-black hover:bg-neutral-100 transition text-center"
          >
            🚪 Logout Dashboard
          </Link>
        </div>
      </aside>
    </>
  );
}
