// app/(auth)/signup/page.tsx
/**
 * SUPABASE PROFILE ACQUISITION SIGNUP ORCHESTRATOR
 * Registers business user credentials directly onto Supabase Auth, then injects 
 * corporate metadata logs into the public.profiles database table.
 */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SignupForm from "./components/SignupForm";
import { supabase } from "@/lib/supabase"; // Central client gateway engine

export default function SignupPage() {
  const router = useRouter();

  const handleSystemSignup = async (
    businessName: string, 
    ownerName: string, 
    email: string, 
    pass: string,
    businessPhone: string
  ) => {
    // 1. Trigger Supabase Auth account creation sequence
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password: pass,
    });

    // Capture and throw server credential execution rejections cleanly
    if (authError) throw authError;

    // Verify a valid user identity record object was initialized by the core engine
    if (authData?.user) {
      // 2. Build the corresponding application record row for public.profiles
      // Note: We use the exact authenticated user UUID as the target row primary key.
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{
          id: authData.user.id, // Primary Key matches auth.users.id exactly
          full_name: ownerName.trim(),
          email: email.trim(),
          phone: businessPhone.trim(),
          business_name: businessName.trim(), // Injected based on your table logic 
          subscription_plan: "free", // Defaults baseline sandbox operations
          twilio_enabled: false // Explicit default security lock
        }]);

            //  COOKIE SESSION INJECTION FOR MIDDLEWARE PASSAGE
    // Pull the active background auth session token generated during registration
    if (authData?.session) {
      document.cookie = `sb-access-token=${authData.session.access_token}; path=/; max-age=${authData.session.expires_in}`;
    }

      if (profileError) throw profileError;
    }

    // Forward the authenticated operator into the secure platform command cockpit
    router.push("/dashboard");
  };

  return (
    <SignupForm onSignupSubmit={handleSystemSignup} />
  );
}
