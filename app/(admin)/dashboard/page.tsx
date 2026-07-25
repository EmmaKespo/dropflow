// app/(admin)/dashboard/page.tsx
/**
 *PRIMARY ADMIN CENTRAL CONTROL PANEL ORCHESTRATOR
 * Pulls together isolated sub-components to handle state management, real-time 
 * data row search filtering, and system intake deployments.
 */

"use client"; // Enabled to manage state layers dynamically on the client canvas

import React, { useState } from "react";

// Importing granular sub-components cleanly from your isolated components folder
import AdminSidebar from "../components/AdminSidebar";
import FleetSummaryGrid from "../components/FleetSummaryGrid";
import RealTimeAlertsPanel, { AlertItem } from "../components/RealTimeAlertsPanel";
import DeliveriesTable, { DeliveryRecord } from "../components/DeliveriesTable";
import CreateDeliveryModal from "../components/CreateDeliveryModal";
import DeliveryDetailModal from "../components/DeliveryDetailModal";

export default function PremiumAdminDashboardPage() {
  // Navigation layout state handlers
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Live telemetry streaming data pool simulation states
  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: "a1", orderId: "1048", type: "picked_up", message: "🔴 Rider Picked Up Order #1048 (Client: John Doe)" },
    { id: "a2", orderId: "1042", type: "arrived", message: "🟡 Rider Arrived Destination Checkpoint Order #1042" },
  ]);

  // Unified global delivery dataset logs state store
  const [deliveries, setDeliveries] = useState<DeliveryRecord[]>([
    { id: "1048", customerName: "John Doe", customerPhone: "08012345678", riderPhone: "08111111111", address: "12 Allen Avenue, Ikeja", status: "Picked Up", lastUpdated: "2 mins ago" },
    { id: "1042", customerName: "Sarah Smith", customerPhone: "09088887766", riderPhone: "08222222222", address: "VGC Estate Gate, Lekki", status: "Arrived", lastUpdated: "5 mins ago" },
    { id: "1037", customerName: "Amara Okafor", customerPhone: "07033334455", riderPhone: "08333333333", address: "45 Aminu Kano Cres, Wuse 2", status: "Delivered", lastUpdated: "1 hour ago" },
  ]);

  // Filtering parameter states and visibility flags
  const [searchQuery, setSearchQuery] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedRowDetail, setSelectedRowDetail] = useState<DeliveryRecord | null>(null);

  // Dismiss target alert banner entry from array list
  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter(item => item.id !== id));
  };

  // Process manifest submission directly from the modular type-safe form component
  const handleCreateDelivery = (newRecord: DeliveryRecord) => {
    // Inject the structured object parameter straight to your core state store matrix
    setDeliveries([newRecord, ...deliveries]);
  };

  // High-efficiency text filtering map match calculation lookup logic
  const filteredRecords = deliveries.filter(row => 
    row.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.id.includes(searchQuery) ||
    row.riderPhone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-black flex antialiased select-none">
      {/* 1. GRANULAR SIDEBAR PANEL DRAWER NAVIGATION */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Primary Workspace Fluid Viewport Grid Shell */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        
        {/* Persistent Platform Status Control Header Area Bar */}
        <header className="bg-white border-b border-black py-4 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Touch Drawer Hamburger Toggle Switch Trigger Button */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden border border-black p-2 bg-white text-xs font-black uppercase"
            >
              Menu
            </button>
            <div>
              <h1 className="text-md font-black uppercase tracking-tight">Tesla Logistics Corp Workspace</h1>
              <span className="text-[10px] font-mono text-neutral-400 font-bold block -mt-0.5">
                Terminal Operator Date: {new Date().toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-neutral-500 hidden sm:inline">
              Supabase Gateway Active
            </span>
          </div>
        </header>

        {/* Dynamic Inner Tab Interface Screen Router Layout */}
        <main className="flex-1 p-4 lg:p-8 space-y-6">
          {activeTab === "dashboard" && (
            <>
              {/* 2. GRANULAR STREAMING NOTIFICATION ALERTS MARQUEE */}
              <RealTimeAlertsPanel alerts={alerts} onDismiss={handleDismissAlert} />

              {/* Title Header Action Line Ribbon Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-black pb-4">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tighter">Operational Monitor Workspace</h2>
                  <p className="text-xs font-medium text-neutral-500">Review running delivery updates streaming over fleet networks live.</p>
                </div>
                {/* CORE OPERATIONAL CALL TO ACTION TRIGGER KEY */}
                <button
                  onClick={() => setShowFormModal(true)}
                  className="bg-black text-white border border-black px-5 py-3 text-xs font-extrabold uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(115,115,115,1)] hover:bg-neutral-900 transition flex items-center justify-center gap-2 self-start sm:self-auto"
                >
                  <span>+</span> New Delivery Order
                </button>
              </div>

              {/* 3. GRANULAR PERFORMANCE METRICS SCOREBOARD MATRIX */}
              <FleetSummaryGrid metrics={{ total: deliveries.length, awaiting: 1, transit: 1, done: 1 }} />

              {/* Search Intake Filtering Control Box Wrapper */}
              <div className="w-full max-w-sm mb-4">
                <input 
                  type="text" 
                  placeholder="Search fleet by ID, client name profile, rider phone lines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-black p-3 text-xs font-medium placeholder-neutral-400 bg-white"
                />
              </div>

              {/* 4. GRANULAR RESPONSIVE ARCHITECTURAL TABULAR OPERATIONAL DATA GRID */}
              <DeliveriesTable records={filteredRecords} onSelectRow={(row) => setSelectedRowDetail(row)} />
            </>
          )}

          {/* Fallback structural indicators mapping secondary modules features placeholders */}
          {activeTab !== "dashboard" && (
            <div className="border border-dashed border-black p-12 text-center bg-white space-y-2">
              <span className="text-2xl">⚙️</span>
              <h3 className="text-sm font-black uppercase tracking-wider">Module Segment Isolated [{activeTab}]</h3>
              <p className="text-xs font-medium text-neutral-500 max-w-xs mx-auto">
                Authentication check parameters cleared. Complete telemetry grid routing controls mapping will plug into database layers during final backend build.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* 5. GRANULAR INTAKE MANIFEST CREATOR INTERACTIVE MODAL COMPONENT */}
      <CreateDeliveryModal 
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleCreateDelivery}
      />

      {/* 6. GRANULAR INDIVIDUAL ROW ANALYSIS LOG DRILLDOWN WINDOW POPUP */}
      <DeliveryDetailModal 
        record={selectedRowDetail}
        onClose={() => setSelectedRowDetail(null)}
      />
    </div>
  );
}
