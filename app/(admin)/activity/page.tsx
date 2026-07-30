// app/(admin)/activity/page.tsx
/**
 * COMPREHENSIVE ACTIVITY TIMELINE DRILLDOWN MONITOR
 * Reuses your production dashboard detail modal component to allow immediate 
 * backoffice inspections straight from the chronological activity card rows.
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

// Reusing your verified dashboard tabular display interfaces and drawers cleanly
import { DeliveryRecord } from "../components/DeliveriesTable";
import DeliveryDetailModal from "../components/DeliveryDetailModal";

interface ActivityLogItem {
  id: string;
  eventType: string;
  createdAt: string;
  fullRecord: DeliveryRecord; // Embedded typed record payload for immediate modal injection
}

interface RawDeliveryJoin {
  id: string;
  customer_name: string;
  customer_phone: string;
  rider_phone: string;
  delivery_address: string;
  status: string;
  tracking_token: string;
  business_id: string;
}

interface ActivityLogRow {
  id: string;
  event_type: string;
  created_at: string;
  deliveries: RawDeliveryJoin | RawDeliveryJoin[] | null;
}

export default function BackofficeActivityLogPage() {
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal tracking states parameters
  const [selectedRecordDetail, setSelectedRecordDetail] = useState<DeliveryRecord | null>(null);

  // 1. COMPREHENSIVE DATA SYNC LOOP FETCHING ALL FIELDS
  const loadFleetActivityTimeline = useCallback(async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Unauthenticated manager session.");

      // Fetch all core delivery properties through the relational inner join [26-Jul-26 11:37 AM]
      const { data: records, error: logError } = await supabase
        .from("activity_logs")
        .select(`
          id,
          event_type,
          created_at,
          deliveries!inner (
            id,
            customer_name,
            customer_phone,
            rider_phone,
            delivery_address,
            status,
            tracking_token,
            business_id
          )
        `)
        .eq("deliveries.business_id", user.id)
        .order("created_at", { ascending: false });

      if (logError) throw logError;

      if (records) {
       const mappedLogs: ActivityLogItem[] = (records as unknown as ActivityLogRow[])
  .map((row): ActivityLogItem | null => {
    const d = Array.isArray(row.deliveries) ? row.deliveries[0] : row.deliveries;

    if (!d) return null;

    let displayStatus: DeliveryRecord["status"] = "Awaiting Pickup";
    if (d.status === "picked_up") displayStatus = "Picked Up";
    if (d.status === "arrived") displayStatus = "Arrived";
    if (d.status === "delivered") displayStatus = "Delivered";

    return {
      id: row.id,
      eventType: row.event_type,
      createdAt: new Date(row.created_at).toLocaleTimeString("en-NG", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      fullRecord: {
        id: d.id.substring(0, 8).toUpperCase(),
        rawId: d.id,
        tokenSlug: d.tracking_token,
        customerName: d.customer_name,
        customerPhone: d.customer_phone,
        riderPhone: d.rider_phone,
        address: d.delivery_address,
        status: displayStatus,
        lastUpdated: "Active Feed Log"
      } as DeliveryRecord
    };
  })
  .filter((item): item is ActivityLogItem => item !== null);

setLogs(mappedLogs);
      }
    } catch (err) {
      const error = err as Error;
      console.error("TIMELINE TELEMENTRY CONSOLE READ ERROR:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Initial page paint data pull routine
    const fetchData = async () => {
      if (isMounted) {
        await loadFleetActivityTimeline();
      }
    };

    fetchData();

    const activityRealtimeStreamChannel = supabase
      .channel("live-backoffice-activity-feed-drilldown")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "activity_logs" },
        () => {
          if (isMounted) {
            loadFleetActivityTimeline();
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(activityRealtimeStreamChannel);
    };
  }, [loadFleetActivityTimeline]);

  const renderStatusBadge = (type: string) => {
    switch (type) {
      case "picked_up": return <span className="bg-amber-50 text-amber-700 border border-amber-300 px-2 py-0.5 font-bold uppercase text-[9px]">Picked Up</span>;
      case "arrived": return <span className="bg-orange-50 text-orange-700 border border-orange-300 px-2 py-0.5 font-bold uppercase text-[9px]">Arrived</span>;
      case "delivered": return <span className="bg-emerald-50 text-emerald-700 border border-emerald-300 px-2 py-0.5 font-bold uppercase text-[9px]">Delivered</span>;
      default: return <span className="bg-neutral-50 text-neutral-700 border border-neutral-300 px-2 py-0.5 font-bold uppercase text-[9px]">{type}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-xl animate-fade-in select-none relative">
      <div className="border-b border-black pb-4">
        <h2 className="text-xl font-black uppercase tracking-tight">Real-Time Activity Timeline</h2>
        <p className="text-xs font-medium text-neutral-500">Chronological history stream tracking active driver interactions live. Click any card to drill down into metrics.</p>
      </div>

      {isLoading ? (
        <div className="border border-black p-8 text-center bg-white font-mono text-xs text-neutral-400 uppercase tracking-widest animate-pulse">
          Querying live activity ledger...
        </div>
      ) : logs.length === 0 ? (
        <div className="border border-dashed border-neutral-300 bg-white p-12 text-center text-xs font-medium text-neutral-400 uppercase tracking-wider">
          📭 No operational events recorded across your fleet yet.
        </div>
      ) : (
        <div className="relative border-l-2 border-black pl-6 ml-2 space-y-6 py-2">
          {logs.map((item) => (
            <div key={item.id} className="relative group">
              <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-white border-2 border-black group-hover:bg-black transition-all" />
              
              {/* INTERACTIVE TAP SELECTION TRIGGER LINKED TO MODAL LAYOUT */}
              <div 
                onClick={() => setSelectedRecordDetail(item.fullRecord)}
                className="bg-white border border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-black text-neutral-400">#{item.fullRecord.id}</span>
                    {renderStatusBadge(item.eventType)}
                  </div>
                  <p className="text-xs font-extrabold uppercase text-black">
                    Rider executed milestone update for client: <span className="underline">{item.fullRecord.customerName}</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-[10px] font-black bg-neutral-100 text-neutral-500 border border-neutral-200 px-1.5 py-0.5">
                    ⏱️ {item.createdAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* REUSED PRODUCTION DRILLDOWN WINDOW MODAL PANEL */}
      <DeliveryDetailModal 
        record={selectedRecordDetail}
        onClose={() => setSelectedRecordDetail(null)}
        onRowMutation={loadFleetActivityTimeline} // Auto-refreshes our activity feeds list dynamically on change
      />
    </div>
  );
}