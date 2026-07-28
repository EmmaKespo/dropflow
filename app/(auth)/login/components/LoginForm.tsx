// app/(auth)/login/components/LoginForm.tsx
/**
 * NO TOMORROW HEADIN COMMENT: BUSINESS LOGIN PRESENTATION TERMINAL
 * Captures email strings and password strings. Enforces loading states 
 * during execution pipelines and presents short human-readable error banners.
 */

import React, { useState } from "react";
import Link from "next/link";

interface LoginFormProps {
  onLoginSubmit: (email: string, pass: string) => Promise<void>;
}

export default function LoginForm({ onLoginSubmit }: LoginFormProps) {
  // Input fields hook trackers states setup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Processing state flag monitors
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorHint, setErrorHint] = useState<string | null>(null);

  // Form submission intercept handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || isLoggingIn) return;

    setIsLoggingIn(true);
    setErrorHint(null); // Wipe away previous error matrices on new run

    try {
      // Forward input parameters directly to the master orchestration page
      await onLoginSubmit(email, password);
    } catch (err: unknown) {
      // Map error types down into short non-technical human labels
      setErrorHint("Invalid profile credentials. Please verify your email or password entry.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Structural Card Identification Header Layout */}
      <div className="space-y-1">
        <h2 className="text-xl font-black uppercase tracking-tight text-black">Business Sign In</h2>
        <p className="text-xs font-medium text-neutral-500">Access your live real-time fleet telemetry control dashboard.</p>
      </div>

      {/* Real-time Short Non-Technical Human Error Alert Box */}
      {errorHint && (
        <div className="border border-black bg-neutral-50 p-3 text-[11px] font-bold text-black uppercase tracking-wide animate-fade-in">
          ⚠️ {errorHint}
        </div>
      )}

      {/* Main Form Fields Parameter Ingestion Grid */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold uppercase tracking-wider text-left">
        {/* Email Address Intake Field */}
        <div className="space-y-1">
          <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Corporate Email</label>
          <input 
            type="email" required disabled={isLoggingIn}
            placeholder="operator@company.com" 
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black p-3 text-xs font-medium bg-white disabled:bg-neutral-50 normal-case"
          />
        </div>

        {/* Security Password Intake Field */}
        <div className="space-y-1">
          <div className="flex justify-between items-baseline">
            <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Password</label>
            <Link href="/forgot-password" className="text-[9px] font-black underline tracking-wide text-neutral-400 hover:text-black">
              Forgot?
            </Link>
          </div>
          <input 
            type="password" required disabled={isLoggingIn}
            placeholder="••••••••••••" 
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-black p-3 text-xs font-medium bg-white disabled:bg-neutral-50 normal-case"
          />
        </div>

        {/* Primary Action Sign In Operational Controller Hook */}
        <button 
          type="submit" disabled={isLoggingIn}
          className={`w-full py-3.5 text-xs font-extrabold uppercase tracking-widest border transition duration-150 ${
            !isLoggingIn 
              ? "bg-black text-white border-black hover:bg-neutral-900 cursor-pointer shadow-[3px_3px_0px_0px_rgba(115,115,115,1)]"
              : "bg-neutral-100 text-neutral-400 border-neutral-300 cursor-not-allowed"
          }`}
        >
          {isLoggingIn ? "Logging in..." : "Secure Sign In"}
        </button>
      </form>

      {/* Secondary Dynamic Routing Link Context */}
      <div className="pt-2 text-center border-t border-neutral-100">
        <p className="text-[11px] font-medium text-neutral-500">
          New fleet operation?{" "}
          <Link href="/signup" className="font-bold uppercase text-black underline underline-offset-2">
            Create Profile
          </Link>
        </p>
      </div>
    </div>
  );
}
