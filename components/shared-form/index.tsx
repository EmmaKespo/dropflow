// components/shared-form/index.tsx
/**
 *THIRD-PARTY GATEWAY API REGEX PROTECTION MATRIX
 * Validates data integrity before allowing submissions to hit external API pipelines.
 */

"use client";

import React, { useState } from "react";
import InputFields from "./inputFields";
import SuccessScreen from "./suceessScreen";

export interface FormSubmittedRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  riderPhone: string;
  address: string;
  status: "Awaiting Pickup" | "Picked Up" | "Arrived" | "Delivered";
  lastUpdated: string;
}

interface SharedDeliveryFormProps {
  userType: "free" | "premium";
  onSuccessAction?: (mockRecord: FormSubmittedRecord) => void;
}

// Strict International E.164 phone format expression (Requires '+' followed by 10-14 digits)
// Prevents Twilio API crashes from bad character entries
const PHONE_REGEX = /^\+[1-9]\d{10,14}$/;

export default function SharedDeliveryForm({ userType, onSuccessAction }: SharedDeliveryFormProps) {
  // Input fields hook trackers states definitions
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [riderPhone, setRiderPhone] = useState("");

  // Processing state flag monitors
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  // Individual boolean tracking operations for precise field debugging
  const isNameValid = customerName.trim().length >= 3;
  const isCustomerPhoneValid = PHONE_REGEX.test(customerPhone.trim());
  const isAddressValid = deliveryAddress.trim().length >= 12;
  const isRiderPhoneValid = PHONE_REGEX.test(riderPhone.trim());

  // Combined master validation boolean flag controls the submit button state
  const isFormValid = isNameValid && isCustomerPhoneValid && isAddressValid && isRiderPhoneValid;

  // Handle active file pipeline form generation submissions
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isProcessing) return;

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockToken = Math.random().toString(36).substring(2, 12);
    const mockTrackingUrl = `${window.location.origin}/track/${mockToken}`;

    if (userType === "premium" && onSuccessAction) {
      onSuccessAction({
        id: Math.floor(1000 + Math.random() * 9000).toString(),
        customerName,
        customerPhone,
        riderPhone,
        address: deliveryAddress,
        status: "Awaiting Pickup",
        lastUpdated: "Just now"
      });
    }

    setGeneratedLink(mockTrackingUrl);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setGeneratedLink(null);
    setCustomerName(""); setCustomerPhone(""); setDeliveryAddress(""); setRiderPhone("");
  };

  return (
    <div className="w-full">
      {!generatedLink ? (
        <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
          {/* Forward status parameters directly down to presentation layers */}
          <InputFields 
            customerName={customerName} setCustomerName={setCustomerName}
            customerPhone={customerPhone} setCustomerPhone={setCustomerPhone}
            deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress}
            riderPhone={riderPhone} setRiderPhone={setRiderPhone}
            isProcessing={isProcessing}
            validation={{
              isNameValid,
              isCustomerPhoneValid,
              isAddressValid,
              isRiderPhoneValid
            }}
          />
          <button 
            type="submit" 
            disabled={!isFormValid || isProcessing}
            className={`w-full py-3.5 text-xs font-extrabold uppercase tracking-widest border transition duration-150 ${
              isFormValid && !isProcessing
                ? "bg-black text-white border-black hover:bg-neutral-900 cursor-pointer shadow-[3px_3px_0px_0px_rgba(115,115,115,1)]"
                : "bg-neutral-100 text-neutral-400 border-neutral-300 cursor-not-allowed"
            }`}
          >
            {isProcessing ? "Processing Pipelines..." : userType === "premium" ? "Create Delivery" : "Generate Tracking Link"}
          </button>
        </form>
      ) : (
        <SuccessScreen 
          userType={userType} generatedLink={generatedLink}
          customerPhone={customerPhone} riderPhone={riderPhone}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
