// app/(marketing)/page.tsx
/**
 * Master Public Home Viewport Interface Assembly Module for Dropflow.
 * This file pulls together split static blocks and responsive form components.
 */

import React from "react";
import HeroAndForm from "./HeroAndForm";
import MarketingDetails from "./MarketingDetails";

export default function MarketingPage() {
  return (
    <div className="pb-20 space-y-16">
      {/* Dynamic interactive workflow component (Hero banner and single-dispatch form logic) */}
      <HeroAndForm />

      {/* Static information presentation panels (Feature matrices, Pricing metrics, and conversion CTAs) */}
      <MarketingDetails />
    </div>
  );
}
