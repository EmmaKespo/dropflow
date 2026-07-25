// lib/utils.ts
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Custom utility function to merge Tailwind CSS classes safely.
 * 'clsx' allows for conditional classes (e.g., status === 'active' && 'bg-black').
 * 'twMerge' ensures that conflicting Tailwind classes are resolved properly.
 * 
 * @param inputs - An array of class names, objects, or conditional statements.
 * @returns A single string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// structural configuration for applying specific base layouts.
export const STATUS_STYLES = {
  pickedUp: "bg-[#FBBF24] border-black text-black active:bg-[#D97706]", // Alert Amber Touch Target Spec
  arrived: "bg-[#F97316] border-black text-white active:bg-[#EA580C]",  // Process Blue-Orange Contrast Spec
  delivered: "bg-[#22C55E] border-black text-white active:bg-[#16A34A]" // Success Green Final Execution Spec
};
