import React, { useEffect } from "react";
import StatusBadge from "./StatusBadge";
import { fetchCaptainsData } from "../Redux/Slices/AdminDashBoardData";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Trash, UserRoundPen } from "lucide-react";

export default function CaptainsTable({ setSidebarOpen }) {
  const dispatch = useDispatch();
  const { captainsData = [] } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchCaptainsData());
    setSidebarOpen(false);
  }, [dispatch, setSidebarOpen]);

  // Map the API data to the table format
  const captainsDat = captainsData.map((cap, index) => ({
    _id: cap._id,
    serialNumber: index + 1,
    name: cap.fullname
      ? `${cap.fullname.firstname} ${cap.fullname.lastname}`
      : "Unknown",
    email: cap.email || "Unknown",
    rides: cap.RideDone !== undefined ? cap.RideDone : 0,
    earnings: cap.TotalEarnings !== undefined ? `₹${cap.TotalEarnings.toFixed(2)}` : "₹0.00",
    status: cap.status || "Unknown",
  }));
  const handleViewDetails = (userId) => {

    console.log("View details for user ID:", userId);
  }
  const handleEditDetails = (userId) => {

    console.log("Edit user ID:", userId);
  };
  const handleDelete = (userId) => {

    console.log("Delete user ID:", userId);
  };

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
                    <td className="px-6 py-4 whitespace-nowrap">
                                       <div className="flex space-x-2">
                                         {/* View details button */}
                                         <button
                                           onClick={() => handleViewDetails(cap._id)}
                                           className="p-1 text-gray-400 hover:text-white transition-colors"
                                           title="View Details"
                                         >
                                           <Eye size={30} className=" text-gray-500 mr-2 bg-green-200 hover:bg-green-300 p-2 rounded-lg"/>
                                         </button>

                                         {/* Edit button */}
                                         <button
                                           onClick={() => handleEditDetails(cap._id)}
                                           className="p-1 text-gray-400 hover:text-white transition-colors"
                                           title="Edit User"
                                         >
                                    <UserRoundPen size={30} className=" text-gray-500 mr-2 bg-violet-200 hover:bg-violet-300 p-2 rounded-lg" />
                                         </button>

                                         {/* Map view button */}
                                         <button
                                           onClick={() => handleDelete(cap._id)}
                                           className="p-1 text-gray-400 hover:text-white transition-colors"
                                           title="Delete"
                                         >
                                           <Trash size={30} className=" text-gray-500 mr-2 bg-yellow-200 hover:bg-yellow-300 p-2 rounded-lg" />
                                         </button>


                                       </div>
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