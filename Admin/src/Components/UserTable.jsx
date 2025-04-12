import React, { useEffect } from "react";
import StatusBadge from "./StatusBadge";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../Redux/Slices/AdminDashBoardData";
import { Eye, Trash, UserRoundPen } from "lucide-react";

export default function UsersTable({ setSidebarOpen }) {
  const dispatch = useDispatch();
  const { usersData = [] } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchUsersData());
    setSidebarOpen(false);
  }, [dispatch, setSidebarOpen]);
  console.log("usersData", usersData);


  // Map usersData to table format
  const usersDat = usersData.map((user, index) => ({
    _id: user._id,
    serialNumber: index + 1,
    name: user.fullname
      ? `${user.fullname.firstname} ${user.fullname.lastname}`
      : "Unknown",
    rides: user.RideDone !== undefined ? user.RideDone : 0,
    joined: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Unknown",
   totalExpense: user.TotalExepense !== undefined ? `₹${user.TotalExepense.toFixed(2)}` : "₹0.00",
    email: user.email || "Unknown",
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
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <div className="overflow-x-auto bg-[#1a1a1a] shadow-neon rounded-lg border border-neon-green/20">
        <table className="min-w-full table-auto">
          <thead className="border-b border-neon-green/20">
            <tr className="text-sm text-neon-green uppercase">
              <th className="px-6 py-3 text-left font-medium">S.No</th>
              <th className="px-6 py-3 text-left font-medium">Name</th>
              <th className="px-6 py-3 text-left font-medium">Rides</th>
              <th className="px-6 py-3 text-left font-medium">Total Expense</th>
              <th className="px-6 py-3 text-left font-medium">Joined</th>
              <th className="px-6 py-3 text-left font-medium">Email</th>
              <th className="px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neon-green/10 text-sm">
            {usersDat.length > 0 ? (
              usersDat.map((user) => (
                <tr key={user.serialNumber} className="hover:bg-[#2a2a2a] transition">
                  <td className="px-6 py-4 whitespace-nowrap">{user.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.rides}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.totalExpense}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email} </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {/* View details button */}
                        <button
                          onClick={() => handleViewDetails(user._id)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye size={30} className=" text-gray-500 mr-2 bg-green-200 hover:bg-green-300 p-2 rounded-lg"/>
                        </button>

                        {/* Edit button */}
                        <button
                          onClick={() => handleEditDetails(user._id)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title="Edit User"
                        >
                   <UserRoundPen size={30} className=" text-gray-500 mr-2 bg-violet-200 hover:bg-violet-300 p-2 rounded-lg" />
                        </button>

                        {/* Map view button */}
                        <button
                          onClick={() => handleDelete(user._id)}
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
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No users data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}