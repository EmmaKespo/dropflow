"use client";
import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminWorkspaceGroupContainerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-neutral-50 text-black flex antialiased select-none">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">{children}</div>
    </div>
  );
}
