import React from "react";
import StatusBadge from "./StatusBadge";

export default function RidesTable({ recentRides }) {
  return (
    <div className="mt-4 text-gray-100">
      <h2 className="text-xl font-semibold mb-4">All Rides</h2>
      <div className="overflow-x-auto bg-[#1a1a1a] shadow-neon rounded-lg border border-neon-green/20">
        <table className="min-w-full table-auto">
          <thead className="border-b border-neon-green/20">
            <tr className="text-sm text-neon-green uppercase">
              <th className="px-6 py-3 text-left font-medium">Ride ID</th>
              <th className="px-6 py-3 text-left font-medium">User</th>
              <th className="px-6 py-3 text-left font-medium">Captain</th>
              <th className="px-6 py-3 text-left font-medium">Route</th>
              <th className="px-6 py-3 text-left font-medium">Amount</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neon-green/10 text-sm">
            {recentRides.map((ride) => (
              <tr key={ride.id} className="hover:bg-[#2a2a2a] transition">
                <td className="px-6 py-4 whitespace-nowrap">{ride.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ride.user}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ride.captain}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ride.from} → {ride.to}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{ride.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={ride.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
