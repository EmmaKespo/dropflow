"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminHeader from "../components/AdminHeader";
import DashboardSkeleton from "../components/DashboardSkeleton";

export default function PerformanceAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pickedUp: 0, arrived: 0, delivered: 0 });

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: rows } = await supabase.from("deliveries").select("status").eq("business_id", user?.id);
        if (rows) {
          setStats({
            total: rows.length,
            pickedUp: rows.filter(r => r.status === "picked_up").length,
            arrived: rows.filter(r => r.status === "arrived").length,
            delivered: rows.filter(r => r.status === "delivered").length
          });
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    loadAnalytics();
  }, []);

  return (
    <>
      <AdminHeader onMenuToggle={() => {}} />
      <main className="p-4 lg:p-8 space-y-6 max-w-2xl text-left">
        <div className="border-b border-black pb-4">
          <h2 className="text-xl font-black uppercase tracking-tight">Fleet Analytics</h2>
          <p className="text-xs font-medium text-neutral-500">Live fleet performance summaries gathered from driver status signals.</p>
        </div>
        {loading ? <DashboardSkeleton /> : (
          <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider font-mono">
            <div className="border border-black bg-white p-4">Total Manifests <span className="block text-2xl font-black mt-2">{stats.total}</span></div>
            <div className="border border-black bg-white p-4">In Transit <span className="block text-2xl font-black mt-2">{stats.pickedUp}</span></div>
            <div className="border border-black bg-white p-4">Near Target <span className="block text-2xl font-black mt-2">{stats.arrived}</span></div>
            <div className="border border-black bg-white p-4">Success Rate <span className="block text-2xl font-black mt-2">{stats.total ? Math.round((stats.delivered / stats.total) * 100) : 0}%</span></div>
          </div>
        )}
      </main>
    </>
  );
}
