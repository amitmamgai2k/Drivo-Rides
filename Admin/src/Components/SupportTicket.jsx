import React from "react";
import StatusBadge from "./StatusBadge";
import { AlertTriangle } from "lucide-react";

export default function SupportTickets({ supportTickets }) {
  return (
    <div className="mt-4 text-gray-100">
      <h2 className="text-xl font-semibold mb-4">Support Tickets</h2>
      <div className="bg-[#1a1a1a] shadow-neon rounded-lg p-4 border border-neon-green/20">
        {supportTickets.map((ticket, idx) => (
          <div
            key={ticket.id}
            className={`p-3 border-b border-neon-green/20 ${
              idx === supportTickets.length - 1 ? "border-b-0" : ""
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-sm text-neon-green">{ticket.subject}</span>
              <StatusBadge status={ticket.status} />
            </div>
            <div className="text-gray-400 text-xs mb-1">
              Submitted by {ticket.user} • {ticket.created}
            </div>
            {ticket.priority === "High" && (
              <div className="text-pink-500 text-xs flex items-center">
                <AlertTriangle size={14} className="mr-1" /> High Priority
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
