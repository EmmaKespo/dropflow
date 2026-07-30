"use client";

import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminWorkspaceGroupContainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 text-black flex relative w-full overflow-x-hidden antialiased">
      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 w-full md:pl-64 flex flex-col">
        {children}
      </div>
    </div>
  );
}