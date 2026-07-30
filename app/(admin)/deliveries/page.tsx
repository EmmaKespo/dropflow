// app/(admin)/deliveries/page.tsx
/**
 * EXPLICIT ENTERPRISE MASTER LEDGER ARCHIVE
 * Queries your main deliveries table to pull long-form running logs. Enforces strict
 * RLS ownership lookups, rendering a searchable data spreadsheet matrix panel.
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

// Reusing pre-built back-office view modules and skeletons safely
import DeliveriesTable, { DeliveryRecord } from "../components/DeliveriesTable";
import DeliveryDetailModal from "../components/DeliveryDetailModal";
import DashboardSkeleton from "../components/DashboardSkeleton";

interface RawDeliveryRow {
  id: string;
  customer_name: string;
  customer_phone: string;
  rider_phone: string;
  delivery_address: string;
  status: string;
  tracking_token: string;
  created_at: string;
}

export default function CorporateDeliveriesLedgerPage() {
  const [deliveries, setDeliveries] = useState<DeliveryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search parameters filter keywords text hooks
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowDetail, setSelectedRowDetail] = useState<DeliveryRecord | null>(null);

  // 1. ISOLATED LEDGER ARRAY DATABASE DATA RECOVERY STACK
  const loadCompleteCorporateLedger = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Operator login session required.");

      // Fetch long-form fields directly from your main deliveries spreadsheet table
      const { data: rows, error: fetchError } = await supabase
        .from("deliveries")
        .select("id, customer_name, customer_phone, rider_phone, delivery_address, status, tracking_token, created_at")
        .eq("business_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      if (rows) {
        const formattedLedger: DeliveryRecord[] = (rows as unknown as RawDeliveryRow[]).map((row) => {
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
            lastUpdated: new Date(row.created_at).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })
          } as DeliveryRecord;
        });
        setDeliveries(formattedLedger);
      }
    } catch (err) {
      const error = err as Error;
      console.error("LEDGER LOGS EXTRACTION RUNTIME FAULT:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync initial page mount mounts loop
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) {
        await loadCompleteCorporateLedger();
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [loadCompleteCorporateLedger]);

  // Multi-field text query scanning logic execution matrix
  const filteredRecords = deliveries.filter(row => 
    row.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.id.includes(searchQuery.toUpperCase()) ||
    row.riderPhone.includes(searchQuery) ||
    row.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in select-none">
      {/* Structural Header Context Lines Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-black pb-4">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight">Master Deliveries Ledger</h2>
          <p className="text-xs font-medium text-neutral-500">Review, scan, search, and perform audit operations across your entire fleet history.</p>
        </div>
        
        {/* Dynamic Count Badge Indicator Tag */}
        <span className="font-mono text-xs font-black uppercase border border-black bg-neutral-100 px-3 py-1.5 self-start sm:self-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Total Records: {deliveries.length.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Advanced Interactive Input Query Filtering Control Box */}
      <div className="w-full max-w-md">
        <input 
          type="text" 
          placeholder="Filter ledger by hash ID, client name, status tags, drops address lines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-black p-3 text-xs font-medium placeholder-neutral-400 bg-white"
        />
      </div>

      {/* RENDER ACTIVE DATA SPREADSHEETS TIER CONDITIONALS */}
      {isLoading ? (
        <DashboardSkeleton />
      ) : filteredRecords.length === 0 ? (
        <div className="border border-dashed border-neutral-300 bg-white p-12 text-center text-xs font-medium text-neutral-400 uppercase tracking-wider">
          🔍 No database rows match your active search terms criteria keys.
        </div>
      ) : (
        <DeliveriesTable 
          records={filteredRecords} 
          onSelectRow={(row) => setSelectedRowDetail(row)} 
        />
      )}

      {/* COMPREHENSIVE DETAIL CONTROL OVERLAY POPUP */}
      <DeliveryDetailModal 
        record={selectedRowDetail}
        onClose={() => setSelectedRowDetail(null)}
        onRowMutation={loadCompleteCorporateLedger} // Re-syncs full rows table list on deletion or update
      />
    </div>
  );
}