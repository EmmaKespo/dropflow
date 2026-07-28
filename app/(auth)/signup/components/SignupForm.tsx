// app/(auth)/signup/components/SignupForm.tsx
/**
 * BUSINESS REGISTRATION WORKSPACE PANEL
 * Gathers profile metadata metrics (Business Name, Owner Name) alongside credentials.
 * Tracks loading state switches and isolates error rendering boundaries.
 */

import React, { useState } from "react";
import Link from "next/link";

interface SignupFormProps {
  onSignupSubmit: (businessName: string, ownerName: string, email: string, pass: string, businessphone: string) => Promise<void>;
}

export default function SignupForm({ onSignupSubmit }: SignupFormProps) {
  // Input tracking state variables metrics definitions
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessPhone, setBusinessPhone] = useState(""); 


  // System validation processing state monitors
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorHint, setErrorHint] = useState<string | null>(null);

  // Form submission intercept handler matrix loop
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !ownerName || !email || !password || isProcessing || !businessPhone) return;


    setIsProcessing(true);
    setErrorHint(null); // Wipe previous error contexts clear

    try {
      // Forward ingestion strings parameters directly up to the router manager page
      await onSignupSubmit(businessName, ownerName, email, password, businessPhone);
    } catch (err: unknown) {
      console.error("RAW SUPABASE LOGS REGISTRATION REJECTION:", err);
      setErrorHint("Account creation rejected. Please ensure the email format is valid and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Structural Card Identification Header Layout */}
      <div className="space-y-1">
        <h2 className="text-xl font-black uppercase tracking-tight text-black">Register Fleet Workspace</h2>
        <p className="text-xs font-medium text-neutral-500">Deploy your premium corporate operations profile node.</p>
      </div>

      {/* Real-time Short Non-Technical Human Error Alert Box */}
      {errorHint && (
        <div className="border border-black bg-neutral-50 p-3 text-[11px] font-bold text-black uppercase tracking-wide animate-fade-in">
          ⚠️ {errorHint}
        </div>
      )}

      {/* Main Ingestion Field Parameter Form Grid */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold uppercase tracking-wider text-left">
        {/* Business Name Field */}
        <div className="space-y-1">
          <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Business / Fleet Name</label>
          <input 
            type="text" required disabled={isProcessing}
            placeholder="E.g., Tesla Logistics Corp" 
            value={businessName} onChange={(e) => setBusinessName(e.target.value)}
            className="w-full border border-black p-3 text-xs font-medium bg-white disabled:bg-neutral-50 normal-case"
          />
        </div>

        {/* Owner Operator Full Name Field */}
        <div className="space-y-1">
          <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Owner / Administrator Name</label>
          <input 
            type="text" required disabled={isProcessing}
            placeholder="E.g., Elon Musk" 
            value={ownerName} onChange={(e) => setOwnerName(e.target.value)}
            className="w-full border border-black p-3 text-xs font-medium bg-white disabled:bg-neutral-50 normal-case"
          />
        </div>

         {/* PHONE NUMBER INPUT FIELD */}
        <div className="space-y-1">
          <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Business Phone Number</label>
          <input 
            type="tel" required disabled={isProcessing}
            placeholder="E.g., +2348012345678" 
            value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)}
            className="w-full border border-black p-3 text-xs font-mono font-medium bg-white disabled:bg-neutral-50 normal-case"
          />
        </div>

        {/* Corporate Email Address Entry Field */}
        <div className="space-y-1">
          <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Corporate Email Address</label>
          <input 
            type="email" required disabled={isProcessing}
            placeholder="operator@company.com" 
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black p-3 text-xs font-medium bg-white disabled:bg-neutral-50 normal-case"
          />
        </div>

        {/* Security Password Parameter Field */}
        <div className="space-y-1">
          <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Create Access Password</label>
          <input 
            type="password" required disabled={isProcessing}
            placeholder="Minimum 6 characters required" 
            value={password} onChange={(e) => setPassword(e.target.value)}
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
          {isProcessing ? "Creating account..." : "Initialize Workspace"}
        </button>
      </form>

      {/* Secondary Dynamic Routing Link Context Options */}
      <div className="pt-2 text-center border-t border-neutral-100">
        <p className="text-[11px] font-medium text-neutral-500">
          Already managing a fleet?{" "}
          <Link href="/login" className="font-bold uppercase text-black underline underline-offset-2">
            Secure Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
