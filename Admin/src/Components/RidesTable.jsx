import React from "react";
import { fetchRecentRides } from "../Redux/Slices/AdminDashBoardData";
import { fetchRideDataWithID } from "../Redux/Slices/AdminDashBoardData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

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

  // Handle various actions
  const handleViewDetails = (rideId) => {
    dispatch(fetchRideDataWithID(rideId));
     navigate(`/admin-dashboard/rides/${rideId}`, { state: { rideId  } });

  };

  const handleEditRide = (rideId) => {
    console.log("Edit ride:", rideId);
    // Implement edit functionality
  };

  const handleShowOnMap = (rideId) => {
    console.log("Show ride on map:", rideId);
    // Implement map view functionality
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
                <th className="px-6 py-4 text-left">Actions</th>
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
                      <StatusBadge status={ride.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {/* View details button */}
                        <button
                          onClick={() => handleViewDetails(ride.id)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title="View Details"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>

                        {/* Edit button */}
                        <button
                          onClick={() => handleEditRide(ride.id)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title="Edit Ride"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* Map view button */}
                        <button
                          onClick={() => handleShowOnMap(ride.id)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title="View on Map"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </button>

                        {/* Context menu (options) button */}
                        <button
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title="More Options"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
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