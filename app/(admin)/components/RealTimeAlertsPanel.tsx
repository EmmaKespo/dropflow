// app/(admin)/components/RealTimeAlertsPanel.tsx
/**
 * REAL-TIME STREAMING TELEMETRY ALERT ROWS
 * Intercepts active state transformations broadcasting live via database pipelines,
 * presenting contextual high-alert flashes with dismiss handles.
 */
import React from "react";

// Structure definition schema safeguarding incoming stream updates
export interface AlertItem {
  id: string;
  orderId: string;
  type: "picked_up" | "arrived" | "completed";
  message: string;
}

interface RealTimeAlertsPanelProps {
  alerts: AlertItem[];
  onDismiss: (id: string) => void;
}

export default function RealTimeAlertsPanel({ alerts, onDismiss }: RealTimeAlertsPanelProps) {
  // Gracefully suppress interface layout elements if notification array parameters are empty
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-6">
      <span className="flex items-center gap-1 text-[9px] uppercase font-black tracking-widest text-neutral-400">
        <i className="fa-solid fa-bolt small-icon"></i>
        Live Telemetry Dispatch Updates (Supabase Streaming)
      </span>

      {alerts.map((alert) => {
        // Enforce color scheme logic match criteria explicitly matching user requirements rules
        const indicatorColor =
          alert.type === "picked_up"
            ? "text-[#EF4444]" // Red Alert flashing parameter tag
            : alert.type === "arrived"
            ? "text-[#F59E0B]" // Amber Alert warning marker tag
            : "text-[#10B981]"; // Green Alert final confirmation tag

        // Map telemetry event mutations to appropriate visual representations
        const statusIcon =
          alert.type === "picked_up" ? (
            <i className={`fa-solid fa-box-open big-icon ${indicatorColor}`}></i>
          ) : alert.type === "arrived" ? (
            <i className={`fa-solid fa-location-dot big-icon ${indicatorColor}`}></i>
          ) : (
            <i className={`fa-solid fa-circle-check big-icon ${indicatorColor}`}></i>
          );

        return (
          <div
            key={alert.id}
            className="flex items-center justify-between border border-black bg-white p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-fade-in"
          >
            <div className="flex items-center gap-3">
              {/* Telemetry Indicator Status Beacon Element */}
              <div className="flex items-center justify-center">
                {statusIcon}
              </div>
              <p className="text-xs font-bold text-black uppercase tracking-tight">
                {alert.message}
              </p>
            </div>

            {/* Click Tracker Interceptor Dismiss Action Key */}
            <button
              onClick={() => onDismiss(alert.id)}
              className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition pl-4"
            >
              Dismiss ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
