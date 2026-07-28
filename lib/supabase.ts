// lib/supabase.ts
/**
 * EXPLICIT SUPABASE CENTRAL CONNECTION ENGINE
 * Instantiates the system client gateway while throwing loud, non-silent 
 * errors if localized environment configuration blocks are unassigned.
 */

import { createClient } from "@supabase/supabase-js";

// Safe extraction of network parameters keys from server process boundaries
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Fail explicitly fast during compilation if keys are blank or unmapped
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "CRITICAL CONNECTION ERROR: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing from .env.local"
  );
}

// Instantiate the single-source connection gateway channel for the application
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
