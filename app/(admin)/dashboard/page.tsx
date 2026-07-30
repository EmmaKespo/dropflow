// app/(admin)/dashboard/page.tsx
/**
 * RECONCILED CENTRAL DISPATCH MASTER CONTROL ORCHESTRATOR
 * Fixes layout spacing, re-stabilizes responsive sidebar state triggers, and 
 * ensures proper conditional view rendering across all administration dashboard frames.
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

import FleetSummaryGrid from "../components/FleetSummaryGrid";
import RealTimeAlertsPanel, { AlertItem } from "../components/RealTimeAlertsPanel";
import DeliveriesTable, { DeliveryRecord } from "../components/DeliveriesTable";
import CreateDeliveryModal from "../components/CreateDeliveryModal";
import DeliveryDetailModal from "../components/DeliveryDetailModal";

import AdminHeader from "../components/AdminHeader";
import DashboardSkeleton from "../components/DashboardSkeleton";
import AdminSidebar from "../components/AdminSidebar"; // Re-added to provide responsive rendering fallback context

interface DeliveryFormData {
  customerName: string;
  customerPhone: string;
  address: string;
  riderPhone: string;
}

export default function PremiumAdminDashboardPage() {
  // FIXED: Re-stabilised structural sidebar tracking parameters layout flags
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Core array datasets states containers
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [deliveries, setDeliveries] = useState<DeliveryRecord[]>([]);

  // Filtering tracking states and modal flags
  const [searchQuery, setSearchQuery] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedRowDetail, setSelectedRowDetail] = useState<DeliveryRecord | null>(null);

  // Dynamic Case-Insensitive Counters Layout Check
  const metrics = {
    total: deliveries.length,
    awaiting: deliveries.filter(d => 
      (d.status as string) === "Awaiting Pickup" || (d.status as string) === "awaiting"
    ).length,
    transit: deliveries.filter(d => 
      (d.status as string) === "Picked Up" || (d.status as string) === "picked_up" || 
      (d.status as string) === "Arrived" || (d.status as string) === "arrived"
    ).length,
    done: deliveries.filter(d => 
      (d.status as string) === "Delivered" || (d.status as string) === "delivered"
    ).length
  };

  // CORE MANIFEST QUERIES INITIALIZATION LIFECYCLE
  const loadWorkspaceOperationalData = useCallback(async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("No active session.");

      const { data: databaseRows, error: deliveriesError } = await supabase
        .from("deliveries")
        .select("id, customer_name, customer_phone, rider_phone, delivery_address, status, created_at, tracking_token")
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
            rawId: row.id,
            tokenSlug: row.tracking_token,
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
    } catch (err) {
      const error = err as Error;
      console.error("DASHBOARD DATA ENGINE CRASH:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Real-Time Postgres Channel Stream Subscriptions
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (isMounted) {
        await loadWorkspaceOperationalData();
      }
    };
    fetchData();

    const deliveriesRealtimeChannel = supabase
      .channel("dashboard-deliveries-live-stream")
      .on("postgres_changes", { event: "*", schema: "public", table: "deliveries" }, 
        () => { loadWorkspaceOperationalData(); }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(deliveriesRealtimeChannel);
    };
  }, [loadWorkspaceOperationalData]);

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter(item => item.id !== id));
  };

  const handleCreateDelivery = async (formData: DeliveryFormData) => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Authentication link mismatch.");

      const { error: insertError } = await supabase
        .from("deliveries")
        .insert([{
          business_id: user.id,
          customer_name: formData.customerName,
          customer_phone: formData.customerPhone,
          delivery_address: formData.address,
          rider_phone: formData.riderPhone,
          status: "awaiting",
          tracking_token: `tk-${Math.random().toString(36).substring(2, 12)}`
        }]);

      if (insertError) throw insertError;
      await loadWorkspaceOperationalData();
      setShowFormModal(false);
    } catch (err) {
      const error = err as Error;
      console.error("CRITICAL MANIFEST SUBMISSION DISPATCH LOOP FAIL:", error.message);
      alert(`Deployment Failed: ${error.message || "Invalid row constraints configuration."}`);
    }
  };

  const filteredRecords = deliveries.filter(row => 
    row.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    row.id.includes(searchQuery.toUpperCase()) || 
    row.riderPhone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-black flex antialiased select-none">
      {/* PERSISTENT SIDEBAR DRAWERS COLUMNS FRAME */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Workspace Frame Panel Housing Box */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        
        {/* Core Administrative Top Header Bar */}
        <AdminHeader onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-8 space-y-6">
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
              type="text" 
              placeholder="Search fleet by ID, client name profile, rider phone lines..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full border border-black p-3 text-xs font-medium placeholder-neutral-400 bg-white" 
            />
          </div>

          {/* Renders loading skeleton or actual spreadsheet grid data cleanly */}
          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <DeliveriesTable records={filteredRecords} onSelectRow={(row) => setSelectedRowDetail(row)} />
          )}
        </main>
      </div>

      <CreateDeliveryModal 
        isOpen={showFormModal} 
        onClose={() => setShowFormModal(false)} 
        onSubmit={handleCreateDelivery} 
      />

      <DeliveryDetailModal 
        record={selectedRowDetail} 
        onClose={() => setSelectedRowDetail(null)} 
        onRowMutation={loadWorkspaceOperationalData} 
      />
    </div>
  );
}
