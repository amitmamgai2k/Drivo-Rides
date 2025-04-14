import React, { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge";
import { fetchCaptainsData } from "../Redux/Slices/AdminDashBoardData";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Trash, UserRoundPen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CaptainsTable({ setSidebarOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { captainsData = [], isLoading, error } = useSelector((state) => state?.dashboard || {});
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    // Fetch data when component mounts
    dispatch(fetchCaptainsData())
      .then(() => setDataFetched(true))
      .catch((err) => console.error("Error fetching captains data:", err));

    // Close sidebar
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [dispatch, setSidebarOpen]);

  const handleViewDetails = (userId) => {
    navigate(`/admin-dashboard/captains/${userId}`, { state: { userId } });
  };

  const handleEditDetails = (userId) => {
    navigate(`/admin-dashboard/captains/${userId}`, {
      state: { userId, editMode: true },
    });

  };

  const handleDelete = (userId) => {
     navigate(`/admin-dashboard/captains/delete/${userId}`,
      { state: { userId } }
     )
  };
  // Prepare data for rendering
  const captainsDat = captainsData && captainsData.length > 0
    ? captainsData.map((cap, index) => ({
        _id: cap._id,
        serialNumber: index + 1,
        name: cap.fullname
          ? `${cap.fullname.firstname} ${cap.fullname.lastname}`
          : "Unknown",
        email: cap.email || "Unknown",
        rides: cap.RideDone !== undefined ? cap.RideDone : 0,
        earnings: cap.TotalEarnings !== undefined ? `₹${cap.TotalEarnings.toFixed(2)}` : "₹0.00",
        status: cap.status || "Unknown",
      }))
    : [];

  // Render loading state
  if (isLoading && !dataFetched) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-gray-100 text-xl">Loading captains data...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-red-400">Error loading data: {error}</div>
      </div>
    );
  }

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
              <th className="px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neon-green/10 text-sm">
            {captainsDat.length > 0 ? (
              captainsDat.map((cap) => (
                <tr key={cap._id || cap.serialNumber} className="hover:bg-[#2a2a2a] transition">
                  <td className="px-6 py-4 whitespace-nowrap">{cap.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cap.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cap.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cap.rides}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cap.earnings}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={cap.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(cap._id)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye size={30} className="text-gray-500 mr-2 bg-green-200 hover:bg-green-300 p-2 rounded-lg" />
                      </button>
                      <button
                        onClick={() => handleEditDetails(cap._id)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        title="Edit User"
                      >
                        <UserRoundPen size={30} className="text-gray-500 mr-2 bg-violet-200 hover:bg-violet-300 p-2 rounded-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(cap._id)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        title="Delete"
                      >
                        <Trash size={30} className="text-gray-500 mr-2 bg-yellow-200 hover:bg-yellow-300 p-2 rounded-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  {dataFetched ? "No captains found." : "Loading captain data..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}