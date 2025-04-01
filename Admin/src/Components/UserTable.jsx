import React from "react";
import StatusBadge from "./StatusBadge";

export default function UsersTable({ userData }) {
  return (
    <div className="mt-4 text-gray-100">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <div className="overflow-x-auto bg-[#1a1a1a] shadow-neon rounded-lg border border-neon-green/20">
        <table className="min-w-full table-auto">
          <thead className="border-b border-neon-green/20">
            <tr className="text-sm text-neon-green uppercase">
              <th className="px-6 py-3 text-left font-medium">User ID</th>
              <th className="px-6 py-3 text-left font-medium">Name</th>
              <th className="px-6 py-3 text-left font-medium">Rides</th>
              <th className="px-6 py-3 text-left font-medium">Joined</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neon-green/10 text-sm">
            {userData.map((user) => (
              <tr key={user.id} className="hover:bg-[#2a2a2a] transition">
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.rides}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.joined}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={user.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
