// app/(auth)/login/page.tsx
/**
 * SUPABASE SESSION HOOK LOGIN ORCHESTRATOR
 * Submits logging parameters to Supabase Auth to establish secure tracking sessions.
 */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./components/LoginForm";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const handleSystemLogin = async (email: string, pass: string) => {
    // Submit user credentials into the verification network loop
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: pass,
    });

    // Check for validation errors and throw upwards to trigger the form alert
    if (error) throw error;

    if (data?.session) {
      // Set localized tracking tokens to assist edge middleware navigation routing checks
      document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=${data.session.expires_in}`;
    }

    // Direct user straight onto the central dashboard monitor workspace
    router.push("/dashboard");
  };

  return (
    <LoginForm onLoginSubmit={handleSystemLogin} />
  );
}
