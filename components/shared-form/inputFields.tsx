// components/shared-form/InputFields.tsx
/**
 *  REAL-TIME SECURED API PRESENTATION LABELS
 * Displays international hint markers, guarding system fields against bad data inputs.
 */

import React from "react";

interface InputFieldsProps {
  customerName: string;
  setCustomerName: (v: string) => void;
  customerPhone: string;
  setCustomerPhone: (v: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (v: string) => void;
  riderPhone: string;
  setRiderPhone: (v: string) => void;
  isProcessing: boolean;
  // Shared type definitions containing evaluation criteria flags
  validation: {
    isNameValid: boolean;
    isCustomerPhoneValid: boolean;
    isAddressValid: boolean;
    isRiderPhoneValid: boolean;
  };
}

export default function InputFields({
  customerName, setCustomerName,
  customerPhone, setCustomerPhone,
  deliveryAddress, setDeliveryAddress,
  riderPhone, setRiderPhone,
  isProcessing,
  validation
}: InputFieldsProps) {
  return (
    <div className="space-y-4">
      {/* 1. Recipient Profile Input Box Group */}
      <div className="space-y-1">
        <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Customer Name</label>
        <input 
          type="text" required disabled={isProcessing}
          placeholder="Enter recipient full name" 
          value={customerName} onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border border-black p-3 text-xs font-medium bg-white disabled:bg-neutral-50"
        />
        {!validation.isNameValid && customerName.trim().length > 0 && (
          <span className="block text-[9px] font-bold text-red-500 uppercase tracking-wide">Name field requires at least 3 characters.</span>
        )}
      </div>

      {/* 2. Customer Phone Number Input Box Group (Protects Twilio) */}
      <div className="space-y-1">
        <div className="flex justify-between items-baseline">
          <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Customer Phone</label>
          <span className="text-[9px] font-mono font-bold text-neutral-400">Requires contry code format eg +234</span>
        </div>
        <input 
          type="tel" required disabled={isProcessing}
          placeholder="E.g., +2348012345678" 
          value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)}
          className="w-full border border-black p-3 text-xs font-mono font-medium bg-white disabled:bg-neutral-50"
        />
        {!validation.isCustomerPhoneValid && customerPhone.trim().length > 0 && (
          <span className="block text-[9px] font-bold text-red-500 uppercase tracking-wide">Must include international + sign and country code identifier.</span>
        )}
      </div>

      {/* 3. Droppoint Address Input Box Group (Protects Maps) */}
      <div className="space-y-1">
        <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Delivery Address</label>
        <textarea 
          required rows={2} disabled={isProcessing}
          placeholder="Provide complete target house number, street layout name, and city terminal" 
          value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)}
          className="w-full border border-black p-3 text-xs font-medium bg-white disabled:bg-neutral-50 resize-none"
        />
        {!validation.isAddressValid && deliveryAddress.trim().length > 0 && (
          <span className="block text-[9px] font-bold text-red-500 uppercase tracking-wide">Provide descriptive address text volume (minimum 12 characters).</span>
        )}
      </div>

      {/* 4. Assigned Courier Phone Number Input Box Group (Protects Twilio) */}
      <div className="space-y-1">
        <div className="flex justify-between items-baseline">
          <label className="block text-[10px] uppercase font-black tracking-widest text-neutral-700">Rider Phone</label>
          <span className="text-[9px] font-mono font-bold text-neutral-400">Requires E.164 Prefix</span>
        </div>
        <input 
          type="tel" required disabled={isProcessing}
          placeholder="E.g., +2348122223333" 
          value={riderPhone} onChange={(e) => setRiderPhone(e.target.value)}
          className="w-full border border-black p-3 text-xs font-mono font-medium bg-white disabled:bg-neutral-50"
        />
        {!validation.isRiderPhoneValid && riderPhone.trim().length > 0 && (
          <span className="block text-[9px] font-bold text-red-500 uppercase tracking-wide">Must include international + sign and country code identifier.</span>
        )}
      </div>
    </div>
  );
}
