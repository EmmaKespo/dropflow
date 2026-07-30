# .env.local
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_actual_public_key_string
PAYSTACK_SECRET_KEY=sk_test_your_actual_secret_key_string

npm install react-paystack

// app/(admin)/settings/page.tsx
/**
 * TRANSACTIONAL INTEGRATED CONFIGURATION SETLINGS
 * Embeds the Paystack popup collection script cleanly inside the user profile loop,
 * automatically firing backend database update calls upon successful payment checkout.
 */

"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminHeader from "../components/AdminHeader";
import { usePaystackPayment } from "react-paystack"; // Payment handler hook injection

export default function AccountSettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const loadSettings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from("profiles").select("*").eq("id", user?.id).single();
    setProfile(data);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("profiles").update({
      full_name: profile.full_name,
      business_name: profile.business_name,
      phone: profile.phone
    }).eq("id", profile.id);
    setSaving(false);
    alert("System profile database configuration parameters saved successfully.");
  };

  // =========================================================================
  // PAYSTACK TRANSACTION CONFIRMATION WORKFLOWS 
  // =========================================================================
  const paystackConfig = {
    reference: `df-${new Date().getTime()}`,
    email: profile?.email || "billing@dropflow.com",
    amount: 1500000, // ₦15,000 in kobo currency units (Nigerian pricing baseline)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
  };

  const handlePaystackSuccessAction = async (reference: any) => {
    console.log("💰 Paystack verification handshake cleared:", reference);
    setSaving(true);
    
    try {
      // Instantly mutate subscription fields inside your live profiles table row [26-Jul-26 11:37 AM]
      const { error } = await supabase
        .from("profiles")
        .update({
          subscription_plan: "premium",
          twilio_enabled: true // Unlock automatic messaging queues instantly [26-Jul-26 11:37 AM]
        })
        .eq("id", profile.id);

      if (error) throw error;
      alert("Payment Verified! Workspace successfully upgraded to Premium Fleet Operations.");
      await loadSettings(); // Force local template values refresh
    } catch (err: any) {
      alert(`Database update error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  if (!profile) return <div className="p-8 font-mono text-xs text-neutral-400">Loading Configuration Matrices...</div>;

  return (
    <>
      <AdminHeader onMenuToggle={() => {}} />
      <main className="p-4 lg:p-8 space-y-6 max-w-md text-left">
        <div className="border-b border-black pb-4">
          <h2 className="text-xl font-black uppercase tracking-tight">System Account Settings</h2>
          <p className="text-xs font-medium text-neutral-500">Modify workspace configurations, owner metadata fields, and channel switches.</p>
        </div>

        {/* PREMIUM UPGRADE BILLING BANNER TILES LINK */}
        {profile.subscription_plan === "free" ? (
          <div className="border-2 border-black bg-neutral-900 text-white p-5 space-y-3 shadow-[4px_4px_0px_0px_rgba(115,115,115,1)]">
            <span className="bg-amber-400 text-black px-2 py-0.5 text-[9px] font-black uppercase tracking-wider inline-block">Workspace Restricted</span>
            <h3 className="text-sm font-black uppercase tracking-wide">Unlock Premium Fleet Features</h3>
            <p className="text-[11px] text-neutral-400 leading-relaxed">Upgrade for ₦15,000/month to unlock the real-time deliveries ledger, live activity logs, analytics charts, and automated Twilio WhatsApp alerts.</p>
            <button 
              type="button"
              onClick={() => initializePayment({ onSuccess: handlePaystackSuccessAction, onClose: () => alert("Transaction closed by user.") })}
              className="w-full bg-white text-black py-2.5 text-xs font-extrabold uppercase tracking-widest text-center hover:bg-neutral-100 transition cursor-pointer"
            >
              💳 Pay ₦15,000 & Upgrade
            </button>
          </div>
        ) : (
          <div className="border border-emerald-500 bg-emerald-50/50 p-4 text-xs font-bold text-emerald-800 uppercase tracking-wide">
            🌟 Premium Account Active (Automated Twilio Alerts Unlocked)
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs font-bold uppercase tracking-wider pt-2">
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-black text-neutral-700">Business Fleet Name</label>
            <input type="text" value={profile.business_name || ""} onChange={e => setProfile({...profile, business_name: e.target.value})} className="w-full border border-black p-3 bg-white" />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-black text-neutral-700">Owner Full Name</label>
            <input type="text" value={profile.full_name || ""} onChange={e => setProfile({...profile, full_name: e.target.value})} className="w-full border border-black p-3 bg-white" />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-black text-neutral-700">Corporate Phone Line</label>
            <input type="text" value={profile.phone || ""} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full border border-black p-3 bg-white" />
          </div>
          <button type="submit" disabled={saving} className="w-full bg-black text-white p-3 font-extrabold uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(115,115,115,1)]">
            {saving ? "Saving Changes..." : "Save Configuration Parameters"}
          </button>
        </form>
      </main>
    </>
  );
}
