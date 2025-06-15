import React, { useEffect, useMemo } from "react";
import StatusBadge from "./StatusBadge";
import { AlertTriangle, Clock, User, Mail, MessageSquare, Check } from "lucide-react";
import { fetchSupportTickets, resolveTicket } from "../Redux/Slices/AdminDashBoardData";
import { useDispatch, useSelector } from "react-redux";

export default function SupportTickets({ setSidebarOpen }) {
  const { supportTicketsData: supportTickets = [], loading, error } = useSelector(
    (state) => state.dashboard
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSupportTickets());
    setSidebarOpen(false);
  }, [dispatch, setSidebarOpen]);

  const handleResolveTicket = (ticketId) => {

     dispatch(resolveTicket(ticketId));
    console.log(`Resolving ticket ${ticketId}`);
  };

  // Memoized statistics
  const ticketStats = useMemo(() => {
    const total = supportTickets.length;
    const resolved = supportTickets.filter(ticket => ticket.resolved).length;
    const pending = total - resolved;

    return { total, resolved, pending };
  }, [supportTickets]);

  // Loading state
  if (loading) {
    return (
      <div className="mt-4 text-gray-100">
        <h2 className="text-xl font-semibold mb-4">Support Tickets</h2>
        <div className="bg-[#1a1a1a] shadow-neon rounded-lg p-8 border border-neon-green/20 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-green mx-auto mb-4"></div>
          <p className="text-gray-400">Loading support tickets...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-4 text-gray-100">
        <h2 className="text-xl font-semibold mb-4">Support Tickets</h2>
        <div className="bg-[#1a1a1a] shadow-neon rounded-lg p-6 border border-red-500/20">
          <div className="flex items-center text-red-400 mb-2">
            <AlertTriangle size={20} className="mr-2" />
            <span className="font-medium">Error Loading Tickets</span>
          </div>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (supportTickets.length === 0) {
    return (
      <div className="mt-4 text-gray-100">
        <h2 className="text-xl font-semibold mb-4">Support Tickets</h2>
        <div className="bg-[#1a1a1a] shadow-neon rounded-lg p-8 border border-neon-green/20 text-center">
          <MessageSquare size={48} className="mx-auto mb-4 text-gray-500" />
          <p className="text-gray-400">No support tickets found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 text-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Support Tickets</h2>
        <div className="flex gap-2 text-xs">
          <span className="bg-neon-green/10 text-neon-green px-2 py-1 rounded">
            Total: {ticketStats.total}
          </span>
          <span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded">
            Pending: {ticketStats.pending}
          </span>
          <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded">
            Resolved: {ticketStats.resolved}
          </span>
        </div>
      </div>

      <div className="bg-[#1a1a1a] shadow-neon rounded-lg border border-neon-green/20 max-h-96 overflow-y-auto">
        {supportTickets.map((ticket, idx) => (
          <div
            key={ticket.id}
            className={`p-4 border-b border-neon-green/20 hover:bg-gray-800/30 transition-colors ${
              idx === supportTickets.length - 1 ? "border-b-0" : ""
            }`}
          >
            {/* Header with user info and status */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <User size={16} className="text-neon-green" />
                <span className="font-medium text-sm text-neon-green">
                  {ticket.name}
                </span>
                <Mail size={14} className="text-gray-500" />
                <span className="text-xs text-gray-400">{ticket.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={ticket.resolved ? "Resolved" : "Pending"} />
                {!ticket.resolved && (
                  <button
                    onClick={() => handleResolveTicket(ticket.id)}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded flex items-center gap-1 transition-colors"
                    title="Mark as resolved"
                  >
                    <Check size={12} />
                    Resolve
                  </button>
                )}
              </div>
            </div>

            {/* Timestamp */}
            <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
              <Clock size={12} />
              <span>
                Submitted on {ticket.createdAt} at {ticket.createdTime}
              </span>
            </div>

            {/* Message */}
            <div className="text-sm text-white mb-2 bg-gray-800/50 p-2 rounded border-l-2 border-neon-green/30">
              {ticket.message}
            </div>

            {/* Unresolved indicator */}
            {!ticket.resolved && (
              <div className="flex items-center gap-1 text-pink-500 text-xs">
                <AlertTriangle size={12} />
                <span>Requires attention</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}