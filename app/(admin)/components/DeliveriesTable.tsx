// app/(admin)/components/DeliveriesTable.tsx
/**
 * NO TOMORROW HEADIN COMMENT: CENTRAL OPERATIONAL TABULAR MONITOR GRID
 * Standardizes logistics records formatting across structured desktop spreadsheets 
 * and responsive vertical touch-friendly mobile layout cards.
 */

import React from "react";

// Secure typing interfaces tracking core logistics tabular variables 
export interface DeliveryRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  riderPhone: string;
  address: string;
  status: "Awaiting Pickup" | "Picked Up" | "Arrived" | "Delivered";
  lastUpdated: string;
}

interface DeliveriesTableProps {
  records: DeliveryRecord[];
  onSelectRow: (record: DeliveryRecord) => void;
}

export default function DeliveriesTable({ 
  records, 
  onSelectRow 
}: { 
  records: DeliveryRecord[]; 
  onSelectRow: (record: DeliveryRecord) => void; 
}) {
  return (
    <div className="border border-black bg-white">
      {/* Table Section Metadata Summary Header Block Layout */}
      <div className="p-4 border-b border-black bg-neutral-50 flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest">Active Fleet Dispatch Operations Data Logs</h3>
        <span className="text-[9px] font-mono font-bold bg-neutral-200 text-neutral-600 px-2 py-0.5">Real-time Verified</span>
      </div>

      {/* DESKTOP MATRIX: Traditional horizontal row data matrix structures layout layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black text-[10px] font-black uppercase tracking-wider text-neutral-500 bg-white">
              <th className="p-4">Customer Name</th>
              <th className="p-4">Rider Phone</th>
              <th className="p-4">Current Status</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 text-xs font-medium">
            {records.map((row) => (
              <tr key={row.id} className="hover:bg-neutral-50/50 transition">
                <td className="p-4 font-bold text-black uppercase">{row.customerName}</td>
                <td className="p-4 font-mono text-neutral-600">{row.riderPhone}</td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 text-[9px] font-black uppercase border tracking-wider ${
                    row.status === "Delivered" ? "bg-emerald-50 text-emerald-700 border-emerald-300" :
                    row.status === "Arrived" ? "bg-amber-50 text-amber-700 border-amber-300" :
                    row.status === "Picked Up" ? "bg-blue-50 text-blue-700 border-blue-300" :
                    "bg-neutral-50 text-neutral-600 border-neutral-300"
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-4 text-neutral-400 font-mono">{row.lastUpdated}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => onSelectRow(row)}
                    className="border border-black bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE MATRIX: Responsive card stack layer optimized for single hand tracking operations */}
      <div className="md:hidden divide-y divide-neutral-200">
        {records.map((row) => (
          <div key={row.id} className="p-4 space-y-3 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-black text-black uppercase">{row.customerName}</h4>
                <span className="text-[10px] font-mono text-neutral-500">ID: #{row.id}</span>
              </div>
              <span className={`px-2 py-0.5 text-[9px] font-black uppercase border ${
                row.status === "Delivered" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-neutral-50 border-neutral-300 text-neutral-600"
              }`}>
                {row.status}
              </span>
            </div>
            <div className="text-[11px] font-medium space-y-1 text-neutral-600">
              <div><span className="font-bold text-black">Rider:</span> {row.riderPhone}</div>
              <div><span className="font-bold text-black">Updated:</span> {row.lastUpdated}</div>
            </div>
            <button 
              onClick={() => onSelectRow(row)}
              className="w-full text-center border border-black bg-white py-2 text-xs font-black uppercase tracking-widest"
            >
              View Complete Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
