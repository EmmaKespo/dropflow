// // app/supabase-test/page.tsx
// /**
// * LOGISTICS CONSOLE PLATFORM DIAGNOSTIC GATEWAY
//  * Runs a simple, lightweight network request to probe database connectivity
//  * directly inside the running browser canvas environment.
//  */

// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase"; // Maps cleanly to your root gateway engine

// export default function SupabaseConnectionTestPage() {
//   const [networkStatus, setNetworkStatus] = useState<"testing" | "ONLINE" | "OFFLINE">("testing");
//   const [diagnosticsLog, setDiagnosticsLog] = useState<string>("Initializing telemetry ping...");

//   useEffect(() => {
//     async function executePingTest() {
//       try {
//         // Query the schema directory instead of static data columns to isolate pure connection stability
//         const { data, error } = await supabase
//           .from("profiles")
//           .select("id")
//           .limit(1);

//         if (error) {
//           // If the table is empty but reachable, it is technically ONLINE (Postgres code PGRST116 or empty array is valid)
//           if (error.code === "PGRST116" || error.message.includes("not found")) {
//             setNetworkStatus("ONLINE");
//             setDiagnosticsLog("Success: Connected to Supabase Engine. Base data pool is empty but readable.");
//             return;
//           }
//           throw error;
//         }

//         setNetworkStatus("ONLINE");
//         setDiagnosticsLog("Success: Connection verified. Table telemetry reading rows flawlessly.");
//       } catch (err: any) {
//         setNetworkStatus("OFFLINE");
//         setDiagnosticsLog(`Failure Node: ${err.message || JSON.stringify(err)}`);
//       }
//     }

//     executePingTest();
//   }, []);

//   return (
//     <div className="min-h-screen bg-white text-black flex items-center justify-center p-6 font-mono selection:bg-black selection:text-white">
//       <div className="border border-black p-8 max-w-md w-full space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//         <div className="flex justify-between items-center border-b border-black pb-3">
//           <span className="text-xs font-black uppercase tracking-widest text-neutral-400"> Diagnostic Node</span>
//           <span className={`px-2 py-0.5 text-[10px] font-black uppercase border ${
//             networkStatus === "ONLINE" ? "bg-emerald-50 border-emerald-400 text-emerald-700" :
//             networkStatus === "OFFLINE" ? "bg-red-50 border-red-400 text-red-700" : "bg-neutral-50 border-neutral-300 text-neutral-500"
//           }`}>
//             {networkStatus}
//           </span>
//         </div>
//         <p className="text-xs font-bold leading-relaxed bg-neutral-50 border border-neutral-200 p-4 break-words">
//           {diagnosticsLog}
//         </p>
//         <div className="text-[10px] text-neutral-400 text-center font-bold uppercase">
//           DropFlow Gateway Diagnostic Panel
//         </div>
//       </div>
//     </div>
//   );
// }
