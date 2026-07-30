// app/(auth)/forgot-password/page.tsx
/**
 *RECOVERY PAGE CORE SCHEDULER ENGINE
 * Coordinates outbound reset email trigger requests to Supabase Auth.
 */

"use client";
import React from "react";
import RecoveryForm from "./components/RecoveryForm";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const handleSystemRecovery = async (email: string) => {
    // Fire outbound account reset trigger request straight through Supabase Auth
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  return <RecoveryForm onRecoverySubmit={handleSystemRecovery} />;
}


// import React from "react";
// import RecoveryForm from "./components/RecoveryForm";

// export default function ForgotPasswordPage() {
  
//   // Handshake route firing credentials password reset loops
//   const handleSystemRecovery = async (email: string) => {
//     console.log(`Supabase Auth Reset Trigger pipeline fired for email log destination index: [${email}]`);

//     // Simulate API pipeline network processing delay parameters safely
//     await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (email.includes("crash")) {
//           return reject(new Error("Database connection fault."));
//         }
//         resolve(true);
//       }, 1000);
//     });
//   };

//   return (
//     // Mount presentation layer form straight into the pre-made auth skin wrapper card shell
//     <RecoveryForm onRecoverySubmit={handleSystemRecovery} />
//   );
// }
