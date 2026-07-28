// app/(auth)/reset-password/components/ResetForm.tsx
/**
 * PASSWORD RESET DISPATCH VIEWPORTS TERMINAL
 * Captures new credentials, checks double-entry matching parameters on the fly, 
 * and controls submission pipelines cleanly during system security overrides.
 */

import React, { useState } from "react";
import Link from "next/link";

interface ResetFormProps {
  onResetSubmit: (newPass: string) => Promise<void>;
}

export default function ResetForm({ onResetSubmit }: ResetFormProps) {
  // Input fields hook tracking state parameters definitions
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // System validation processing state flag monitors
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorHint, setErrorHint] = useState<string | null>(null);

  // Form submission execution intercept handler loop
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword || isProcessing) return;

    setErrorHint(null);
    setSuccessMessage(null);

    // Strict front-end boundary check: Enforce double-entry parity
    if (password !== confirmPassword) {
      setErrorHint("Password matching check failed. Please verify both entries are identical.");
      return;
    }

    // Strict front-end boundary check: Enforce minimum string length volume parameters
    if (password.length < 6) {
      setErrorHint("Security criteria failed. Passwords must contain at least 6 characters.");
      return;
    }

    setIsProcessing(true);

    try {
      // Forward input variables straight up to the master orchestration layer page
      await onResetSubmit(password);
      setSuccessMessage("Password updated successfully.");
    } catch (err: unknown) {
      setErrorHint("Session expired or token invalid. Please request a new recovery link.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Structural Card Identification Header Layout */}
      <div className="space-y-1">
        <h2 className="text-xl font-black uppercase tracking-tight text-black">Create New Password</h2>
        <p className="text-xs font-medium text-neutral-500">Update your account credentials database record profile parameters.</p>
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
              Log In
            </Link>
          </div>
        </div>
      ) : (
        /* Main Ingestion Field Parameter Form Grid */
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold uppercase tracking-wider text-left">
          {/* Target Element Input Field 1 */}
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">New Password</label>
            <input 
              type="password" required disabled={isProcessing}
              placeholder="••••••••••••" 
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black p-3 text-xs font-medium bg-white disabled:bg-neutral-50 normal-case"
            />
          </div>

          {/* Target Element Input Field 2 */}
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Confirm New Password</label>
            <input 
              type="password" required disabled={isProcessing}
              placeholder="••••••••••••" 
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isProcessing ? "Updating password..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
}
