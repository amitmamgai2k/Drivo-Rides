import React, { useEffect } from "react";
import StatusBadge from "./StatusBadge";
import { fetchCaptainsData } from "../Redux/Slices/AdminDashBoardData";
import { useDispatch, useSelector } from "react-redux";

export default function CaptainsTable({ setSidebarOpen }) {
  const dispatch = useDispatch();
  const { captainsData = [] } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchCaptainsData());
    setSidebarOpen(false);
  }, [dispatch, setSidebarOpen]);

  // Map the API data to the table format
  const captainsDat = captainsData.map((cap, index) => ({
    serialNumber: index + 1,
    name: cap.fullname
      ? `${cap.fullname.firstname} ${cap.fullname.lastname}`
      : "Unknown",
    email: cap.email || "Unknown",
    rides: cap.RideDone !== undefined ? cap.RideDone : 0,
    earnings: cap.TotalEarnings !== undefined ? `₹${cap.TotalEarnings.toFixed(2)}` : "₹0.00",
    status: cap.status || "Unknown",
  }));

  return (
    <div className="mt-4 text-gray-100">
      <h2 className="text-xl font-semibold mb-4">All Captains</h2>
      <div className="overflow-x-auto bg-[#1a1a1a] shadow-neon rounded-lg border border-neon-green/20">
        <table className="min-w-full table-auto">
          <thead className="border-b border-neon-green/20">
            <tr className="text-sm text-neon-green uppercase">
              <th className="px-6 py-3 text-left font-medium">S.No</th>
              <th className="px-6 py-3 text-left font-medium">Name</th>
              <th className="px-6 py-3 text-left font-medium">Email</th>
              <th className="px-6 py-3 text-left font-medium">Rides</th>
              <th className="px-6 py-3 text-left font-medium">Earnings</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neon-green/10 text-sm">
            {captainsDat.length > 0 ? (
              captainsDat.map((cap) => (
                <tr key={cap.serialNumber} className="hover:bg-[#2a2a2a] transition">
                  <td className="px-6 py-4 whitespace-nowrap">{cap.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cap.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cap.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cap.rides}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cap.earnings}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={cap.status}

                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No captains found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}