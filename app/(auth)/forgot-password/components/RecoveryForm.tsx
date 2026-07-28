// app/(auth)/forgot-password/components/RecoveryForm.tsx
/**
 *FORGOT PASSWORD PRESENTATION BLOCK TERMINAL
 * Captures corporate email variables, manages local loading execution state, 
 * and shows confirmation alerts without confirming if an account exists.
 */

import React, { useState } from "react";
import Link from "next/link";

interface RecoveryFormProps {
  onRecoverySubmit: (email: string) => Promise<void>;
}

export default function RecoveryForm({ onRecoverySubmit }: RecoveryFormProps) {
  // Input tracking state variables metrics definitions
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorHint, setErrorHint] = useState<string | null>(null);

  // Form submission intercept handler matrix loop
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isProcessing) return;

    setIsProcessing(true);
    setErrorHint(null);
    setSuccessMessage(null);

    try {
      // Forward ingestion strings parameters directly up to the router manager page
      await onRecoverySubmit(email);
      // Strict security rule: Never reveal if an account explicitly exists in databases
      setSuccessMessage("If an account exists for this email, you'll receive a password reset link shortly.");
    } catch (err: unknown) {
      setErrorHint("System execution timeout. Please verify network access settings and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Structural Card Identification Header Layout */}
      <div className="space-y-1">
        <h2 className="text-xl font-black uppercase tracking-tight text-black">Recover Password</h2>
        <p className="text-xs font-medium text-neutral-500">Initiate a secure password override request sequence.</p>
      </div>

      {/* Real-time Short Non-Technical Human Error Alert Box */}
      {errorHint && (
        <div className="border border-black bg-neutral-50 p-3 text-[11px] font-bold text-black uppercase tracking-wide animate-fade-in">
          ⚠️ {errorHint}
        </div>
      )}

      {/* Security Compliance Success Notification Frame */}
      {successMessage ? (
        <div className="space-y-4">
          <div className="border-2 border-black bg-neutral-50 p-4 text-xs font-bold text-black uppercase tracking-wide leading-relaxed">
            ✅ {successMessage}
          </div>
          <div className="pt-2 text-center">
            <Link href="/login" className="w-full block text-center border border-black bg-black text-white py-3 text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-900 transition shadow-[3px_3px_0px_0px_rgba(115,115,115,1)]">
              Return To Log In
            </Link>
          </div>
        </div>
      ) : (
        /* Main Ingestion Field Parameter Form Grid */
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold uppercase tracking-wider text-left">
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Corporate Email Address</label>
            <input 
              type="email" required disabled={isProcessing}
              placeholder="operator@company.com" 
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-black p-3 text-xs font-medium bg-white disabled:bg-neutral-50 normal-case"
            />
          </div>

          {/* Primary Action Button Command Switch Target */}
          <button 
            type="submit" disabled={isProcessing}
            className={`w-full py-3.5 text-xs font-extrabold uppercase tracking-widest border transition duration-150 ${
              !isProcessing 
                ? "bg-black text-white border-black hover:bg-neutral-900 cursor-pointer shadow-[3px_3px_0px_0px_rgba(115,115,115,1)]"
                : "bg-neutral-100 text-neutral-400 border-neutral-300 cursor-not-allowed"
          }`}
          >
            {isProcessing ? "Sending reset link..." : "Send Reset Link"}
          </button>

          {/* Secondary Dynamic Routing Link Context Options */}
          <div className="pt-4 text-center border-t border-neutral-100 mt-2">
            <Link href="/login" className="text-[11px] font-bold uppercase text-neutral-400 hover:text-black transition underline underline-offset-2">
              Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
