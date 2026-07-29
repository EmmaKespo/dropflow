// app/(admin)/dashboard/page.tsx
/**
 * OPTIMIZED CENTRAL DISPATCH MASTER CONTROL ORCHESTRATOR
 * Serves as the primary parent state container, coordinating modular layout fragments,
 * search parameters filter criteria strings, and manifest creation overlay switches.
 */

"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Import core presentation grid elements cleanly
import AdminSidebar from "../components/AdminSidebar";
import FleetSummaryGrid from "../components/FleetSummaryGrid";
import RealTimeAlertsPanel, { AlertItem } from "../components/RealTimeAlertsPanel";
import DeliveriesTable, { DeliveryRecord } from "../components/DeliveriesTable";
import CreateDeliveryModal from "../components/CreateDeliveryModal";
import DeliveryDetailModal from "../components/DeliveryDetailModal";

// Import your newly split sub-component layout modules
import AdminHeader from "../components/AdminHeader";
import TabsController from "../components/TabsController";
import DashboardSkeleton from "../components/DashboardSkeleton";

export default function PremiumAdminDashboardPage() {
  // Navigation layout state handlers
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);

  // Core array datasets states containers
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [deliveries, setDeliveries] = useState<DeliveryRecord[]>([]);

  // Filtering tracking states and modal flags
  const [searchQuery, setSearchQuery] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedRowDetail, setSelectedRowDetail] = useState<DeliveryRecord | null>(null);

  // Instant on-the-fly analytical count calculation derived parameters 
  const metrics = {
    total: deliveries.length,
    awaiting: deliveries.filter(d => d.status === "Awaiting Pickup" || d.status as string === "awaiting").length,
    transit: deliveries.filter(d => d.status === "Picked Up" || d.status as string === "arrived").length,
    done: deliveries.filter(d => d.status === "Delivered").length
  };

  // CORE MANIFEST QUERIES INITIALIZATION LIFECYCLE
  useEffect(() => {
    async function loadWorkspaceOperationalData() {
      try {
        setIsLoading(true);
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw new Error("No active session.");

        const { data: databaseRows, error: deliveriesError } = await supabase
          .from("deliveries")
          .select("id, customer_name, customer_phone, rider_phone, delivery_address, status, created_at")
          .eq("business_id", user.id)
          .order("created_at", { ascending: false });

        if (deliveriesError) throw deliveriesError;

        if (databaseRows) {
          const formattedRecords: DeliveryRecord[] = databaseRows.map((row) => {
            let displayStatus: DeliveryRecord["status"] = "Awaiting Pickup";
            if (row.status === "picked_up") displayStatus = "Picked Up";
            if (row.status === "arrived") displayStatus = "Arrived";
            if (row.status === "delivered") displayStatus = "Delivered";

            return {
              id: row.id.substring(0, 8).toUpperCase(),
              customerName: row.customer_name,
              customerPhone: row.customer_phone,
              riderPhone: row.rider_phone,
              address: row.delivery_address,
              status: displayStatus,
              lastUpdated: "Active Log"
            };
          });
          setDeliveries(formattedRecords);
        }
      } catch (err) { // Omit the type declaration here
  const error = err as Error; // Typecast inside the block
  console.error("DASHBOARD DATA ENGINE CRASH:", error.message);

} finally {
  setIsLoading(false);
}
    }
    loadWorkspaceOperationalData();
  }, []);

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter(item => item.id !== id));
  };

  /* LIVE DATABASE MANIFEST DEPLOYMENT SWITCHER
 * Intercepts successful modular form submissions, maps parameters to match 
 * strict snake_case schema lines, and posts directly to your Supabase deliveries table.
 */
interface DeliveryFormData {
  customerName: string;
  customerPhone: string;
  address: string;
  riderPhone: string;
}

// OVERWRITE THE OLD handleCreateDeliveryPlaceholder REACTION LOOP BLOCK (Around line 85) WITH THIS FUNCTION:
const handleCreateDelivery = async (formData: DeliveryFormData) => {
  try {
    // 1. Grab the currently authenticated administrator user profile ID context safely
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Authentication link mismatch.");

    // 2. Map form data properties directly into strict PostgreSQL column field matches [26-Jul-26 11:37 AM]
    const { data: insertedRow, error: insertError } = await supabase
      .from("deliveries")
      .insert([{
        business_id: user.id, // Links current account profile ownership parameters [26-Jul-26 11:37 AM]
        customer_name: formData.customerName,
        customer_phone: formData.customerPhone,
        delivery_address: formData.address,
        rider_phone: formData.riderPhone,
        status: "awaiting", // Explicit initial baseline deployment checkpoint state [26-Jul-26 11:37 AM]
        tracking_token: `tk-${Math.random().toString(36).substring(2, 12)}` // Creates secure identifier slug [26-Jul-26 11:37 AM]
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    // 3. Transform the freshly returned database record row back into frontend display metrics format
    if (insertedRow) {
      const liveFormattedRecord: DeliveryRecord = {
        id: insertedRow.id.substring(0, 8).toUpperCase(),
        customerName: insertedRow.customer_name,
        customerPhone: insertedRow.customer_phone,
        riderPhone: insertedRow.rider_phone,
        address: insertedRow.delivery_address,
        status: "Awaiting Pickup", // Maps back to uppercase tracking tags configuration
        lastUpdated: "Just now"
      };

      // 4. Inject the compiled object directly into the active client row state store matrix view
      setDeliveries([liveFormattedRecord, ...deliveries]);
    }
  }  catch (err) { // Omit the type declaration here
  const error = err as Error; // Typecast inside the block
  console.error("CRITICAL MANIFEST SUBMISSION DISPATCH LOOP FAIL:", error.message);
   alert(`Deployment Failed: ${error.message || "Invalid row constraints configuration."}`);

} 

};

  const filteredRecords = deliveries.filter(row => 
    row.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.id.includes(searchQuery) ||
    row.riderPhone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-black flex antialiased select-none">
      <AdminSidebar 
        isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} 
        activeTab={activeTab} setActiveTab={setActiveTab} 
      />

      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* 1. EXTRACTED GRANULAR HEAD CONSOLE COMPONENT */}
        <AdminHeader onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-8 space-y-6">
          {activeTab === "dashboard" && (
            <>
              <RealTimeAlertsPanel alerts={alerts} onDismiss={handleDismissAlert} />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-black pb-4">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tighter">Operational Monitor Workspace</h2>
                  <p className="text-xs font-medium text-neutral-500">Review running delivery updates streaming over fleet networks live.</p>
                </div>
                <button
                  onClick={() => setShowFormModal(true)}
                  className="bg-black text-white border border-black px-5 py-3 text-xs font-extrabold uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(115,115,115,1)] hover:bg-neutral-900 transition flex items-center justify-center gap-2 self-start sm:self-auto"
                >
                  <span>+</span> New Delivery Order
                </button>
              </div>

              <FleetSummaryGrid metrics={metrics} />

              <div className="w-full max-w-sm mb-4">
                <input 
                  type="text" placeholder="Search fleet by ID, client name profile, rider phone lines..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-black p-3 text-xs font-medium placeholder-neutral-400 bg-white"
                />
              </div>

              {/* 2. EXTRACTED SKELETON LAYER CONDITIONALS TIER */}
              {isLoading ? (
                <DashboardSkeleton />
              ) : (
                <DeliveriesTable records={filteredRecords} onSelectRow={(row) => setSelectedRowDetail(row)} />
              )}
            </>
          )}

          {/* 3. EXTRACTED SECONDARY TAB PANEL ROUTER MODULE */}
          {activeTab !== "dashboard" && <TabsController activeTab={activeTab} />}
        </main>
      </div>

<CreateDeliveryModal 
  isOpen={showFormModal} 
  onClose={() => setShowFormModal(false)} 
  onSubmit={handleCreateDelivery} // Wired directly to our live database connector function
/>

      <DeliveryDetailModal 
        record={selectedRowDetail} onClose={() => setSelectedRowDetail(null)} 
      />
    </div>
  );
}
