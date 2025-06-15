import React from "react";
import { fetchRecentRides } from "../Redux/Slices/AdminDashBoardData";
import { fetchRideDataWithID } from "../Redux/Slices/AdminDashBoardData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Eye, MapPin, MoreHorizontal, Pencil } from "lucide-react";

export default function RidesTable({ setSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Add default empty array to prevent undefined error
  const { recentRides = [], loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchRecentRides());
    setSidebarOpen(false);
  }, [dispatch]);

  // StatusBadge component defined inline
  const StatusBadge = ({ status }) => {
    const getStatusStyles = (status) => {
      switch (status.toLowerCase()) {
        case "pending":
          return "bg-yellow-900/20 text-yellow-400 border-yellow-400/30";
        case "accepted":
          return "bg-blue-900/20 text-blue-400 border-blue-400/30";
        case "ongoing":
          return "bg-purple-900/20 text-purple-400 border-purple-400/30";
        case "completed":
          return "bg-green-900/20 text-green-400 border-green-400/30";
        case "cancelled":
          return "bg-red-900/20 text-red-400 border-red-400/30";
        default:
          return "bg-gray-900/20 text-gray-400 border-gray-400/30";
      }
    };

    return (
      <span
        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyles(status)}`}
      >
        {status}
      </span>
    );
  };


  const handleViewDetails = (rideId) => {
    dispatch(fetchRideDataWithID(rideId));
     navigate(`/admin-dashboard/rides/${rideId}`, { state: { rideId  } });

  };


  // Show loading state with a subtle animation
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-300 flex items-center">
          <svg className="animate-spin mr-2 h-5 w-5 text-neon-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading ride data...
        </div>
      </div>
    );
  }

  // Show error state with retry option
  if (error) {
    return (
      <div className="text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-500/30 flex flex-col items-center justify-center h-64">
        <svg className="h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg font-medium">Error loading ride data</p>
        <p className="text-sm mb-4">{error}</p>
        <button
          onClick={() => dispatch(fetchRecentRides())}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">All Rides</h2>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-[#242424] rounded-md text-sm">
            Total: {recentRides ? recentRides.length : 0}
          </span>
          <button
            onClick={() => dispatch(fetchRecentRides())}
            className="px-3 py-1 bg-neon-green/20 hover:bg-neon-green/30 text-neon-green rounded-md text-sm flex items-center transition-all"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-[#1a1a1a] shadow-lg rounded-lg border border-neon-green/20">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-[#222222]">
              <tr className="text-xs font-medium text-neon-green uppercase tracking-wider">
                <th className="px-6 py-4 text-left">S.No</th>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Captain</th>
                <th className="px-6 py-4 text-left">Route</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">View </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {recentRides && recentRides.length > 0 ? (
                recentRides.map((ride, index) => (
                  <tr
                    key={ride.id}
                    className="hover:bg-[#2a2a2a] transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{ride.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{ride.captain}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="truncate max-w-xs">{ride.from}</span>
                        <svg className="mx-2 w-4 h-4 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span className="truncate max-w-xs">{ride.to}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">₹{ride.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={ride.status}  />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {/* View details button */}
                        <button
                          onClick={() => handleViewDetails(ride.id)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title="View Details"
                        >
                         <Eye size={30} className=" text-gray-500 mr-2 bg-green-200 hover:bg-green-300 p-2 rounded-lg"/>
                        </button>



                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan="7" className="px-6 py-12 text-gray-400">
                    No rides found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}