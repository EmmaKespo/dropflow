"use client";
import React from "react";
import ResetForm from "./components/ResetForm";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const handleSystemPasswordOverride = async (newPass: string) => {
    // Patch credentials rows inside internal auth maps securely
    const { error } = await supabase.auth.updateUser({ password: newPass });
    if (error) throw error;
  };

  return <ResetForm onResetSubmit={handleSystemPasswordOverride} />;
}
