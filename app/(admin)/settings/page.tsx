"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminHeader from "../components/AdminHeader";

// Define the interface based on your Supabase profiles table schema
interface Profile {
  id: string;
  business_name: string | null;
  full_name: string | null;
  phone: string | null;
  subscription_plan?: string;
}

export default function AccountSettingsPage() {
  // Replace <any> with <Profile | null>
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    }
    loadSettings();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return; // Type guard check

    setSaving(true);
    await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        business_name: profile.business_name,
        phone: profile.phone,
      })
      .eq("id", profile.id);

    setSaving(false);
    alert("System profile database configuration parameters saved successfully.");
  };

  if (!profile) {
    return (
      <div className="p-8 font-mono text-xs text-neutral-400">
        Loading Configuration Matrices...
      </div>
    );
  }

  return (
    <>
      <AdminHeader onMenuToggle={() => {}} />
      <main className="p-4 lg:p-8 space-y-6 max-w-md text-left">
        <div className="border-b border-black pb-4">
          <h2 className="text-xl font-black uppercase tracking-tight">System Account Settings</h2>
          <p className="text-xs font-medium text-neutral-500">
            Modify workspace configurations, owner metadata fields, and channel switches.
          </p>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs font-bold uppercase tracking-wider">
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-black text-neutral-700">Business Fleet Name</label>
            <input
              type="text"
              value={profile.business_name || ""}
              onChange={(e) => setProfile({ ...profile, business_name: e.target.value })}
              className="w-full border border-black p-3 bg-white"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-black text-neutral-700">Owner Full Name</label>
            <input
              type="text"
              value={profile.full_name || ""}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full border border-black p-3 bg-white"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-black text-neutral-700">Corporate Phone Line</label>
            <input
              type="text"
              value={profile.phone || ""}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full border border-black p-3 bg-white"
            />
          </div>
          <div className="p-3 border border-neutral-300 bg-neutral-100 font-mono text-[10px] text-neutral-500">
            Subscription Tier: <span className="font-bold text-black">{profile.subscription_plan || "N/A"}</span>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-black text-white p-3 font-extrabold uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(115,115,115,1)]"
          >
            {saving ? "Saving Changes..." : "Save Configuration parameters"}
          </button>
        </form>
      </main>
    </>
  );
}