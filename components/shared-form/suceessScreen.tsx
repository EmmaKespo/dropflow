// components/shared-form/SuccessScreen.tsx
/**
 * NO TOMORROW HEADIN COMMENT: CONTEXT SENSITIVE LIFECYCLE SUCCESS GRID
 * Orchestrates clipboard copying mechanisms and native wa.me deep links.
 */
import React, { useState } from "react";

interface SuccessScreenProps {
  userType: "free" | "premium";
  generatedLink: string;
  customerPhone: string;
  riderPhone: string;
  onReset: () => void;
}

export default function SuccessScreen({
  userType,
  generatedLink,
  customerPhone,
  riderPhone,
  onReset
}: SuccessScreenProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Buffer text copying routine
  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-center py-2 animate-fade-in">
      <div className="space-y-1.5">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-black">
          <i className="fa-solid fa-circle-check big-icon"></i>
        </div>
        <h3 className="text-lg font-black uppercase tracking-tight">Delivery Created Successfully</h3>
        {userType === "premium" && (
          <p className="text-[11px] font-bold text-emerald-700 border border-emerald-200 bg-emerald-50 py-1 px-2 inline-block">
            ✓ Rider notified automatically via system Twilio trigger.
          </p>
        )}
      </div>

      {/* Target Token String Hash Visualization Shield */}
      <div className="border border-dashed border-neutral-400 bg-neutral-50 p-3 font-mono text-[10px] break-all select-all text-neutral-700">
        {generatedLink}
      </div>

      {/* Dynamic Action Trigger List Matrix */}
      <div className="space-y-2.5 text-left">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 w-full border border-black bg-white text-black py-2.5 text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-50 transition"
        >
          {isCopied ? (
            "Copied Path Output!"
          ) : (
            <>
              <i className="fa-solid fa-clipboard small-icon"></i>
              <span>Copy Tracking Link</span>
            </>
          )}
        </button>

        {/* Free Sandbox manual WhatsApp message links */}
        {userType === "free" && (
          <a
            href={`https://wa.me{riderPhone.replace(/\+/g, "")}?text=${encodeURIComponent(
              `Hello, you've been assigned a delivery. Please use this tracking link to update the delivery status: ${generatedLink}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full border border-black bg-black text-white py-2.5 text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-900 transition text-center"
          >
            <i className="fa-brands fa-whatsapp small-icon"></i>
            <span>Send Tracking to Rider</span>
          </a>
        )}

        {/* Optional customer link sharing module */}
        <a
          href={`https://wa.me{customerPhone.replace(/\+/g, "")}?text=${encodeURIComponent(
            `Hello, your delivery has been created. You can track its progress here: ${generatedLink}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full border border-neutral-300 bg-white text-neutral-500 py-2.5 text-xs font-extrabold uppercase tracking-widest hover:text-black hover:border-black transition text-center"
        >
          <i className="fa-solid fa-user small-icon"></i>
          <span>Send Tracking to Customer (Optional)</span>
        </a>

        {/* Premium-specific view handler */}
        {userType === "premium" && (
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 w-full border border-black bg-black text-white py-2.5 text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-900 transition text-center"
          >
            <i className="fa-solid fa-eye small-icon"></i>
            <span>View Delivery Log Metrics</span>
          </button>
        )}
      </div>

      <button
        onClick={onReset}
        className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-black underline transition mt-2"
      >
        Clear and Re-deploy Panel
      </button>
    </div>
  );
}
