// app/(admin)/components/FleetSummaryGrid.tsx
/**
 * LOGISTICS TELEMETRY COUNTER INTERFACE TILES
 * Automatically processes structural running summary math counts out onto uniform boxes.
 */
import React from "react";

// Strict type interfaces managing numerical state input properties fields
interface FleetSummaryGridProps {
  metrics: {
    total: number;
    awaiting: number;
    transit: number;
    done: number;
  };
}

export default function FleetSummaryGrid({ metrics }: FleetSummaryGridProps) {
  // Destructuring calculation variables fields for cleaner template calls map layouts
  const cards = [
    { 
      title: "Total Deliveries", 
      count: metrics.total, 
      icon: <i className="fa-solid fa-chart-simple big-icon"></i> 
    },
    { 
      title: "Awaiting Pickup", 
      count: metrics.awaiting, 
      icon: <i className="fa-solid fa-hourglass-half big-icon"></i> 
    },
    { 
      title: "In Transit", 
      count: metrics.transit, 
      icon: <i className="fa-solid fa-truck-fast big-icon"></i> 
    },
    { 
      title: "Delivered Today", 
      count: metrics.done, 
      icon: <i className="fa-solid fa-circle-check big-icon"></i> 
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="border border-black bg-white p-5 space-y-2">
          {/* Informational Subtext Headers and Symbol Elements Row Layout */}
          <div className="flex items-center justify-between text-neutral-400 text-sm">
            <span className="text-[10px] uppercase font-black tracking-widest text-neutral-500">
              {card.title}
            </span>
            <span className="text-black flex items-center">{card.icon}</span>
          </div>

          {/* Monospaced Zero-Padded Double Digit Telemetry Layout Count Label Numbers */}
          <div className="font-mono text-3xl font-black tracking-tight text-black">
            {card.count.toString().padStart(2, "0")}
          </div>
        </div>
      ))}
    </div>
  );
}
