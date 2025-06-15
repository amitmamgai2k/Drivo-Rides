import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "../Redux/Slices/AdminDashBoardData";
import { Eye, CreditCard, MoreHorizontal, RefreshCw } from "lucide-react";

export default function PaymentsPage({ setSidebarOpen }) {
  const dispatch = useDispatch();


  const { payments = [], loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchPayments());
    setSidebarOpen(false);
  }, [dispatch]);

  console.log("Payments data:", payments);


  const PaymentStatusBadge = ({ status }) => {
    const getStatusStyles = (status) => {
      switch (status.toUpperCase()) {
        case "SUCCESS":
          return "bg-green-900/20 text-green-400 border-green-400/30";
        case "FAILED":
          return "bg-red-900/20 text-red-400 border-red-400/30";
        case "PENDING":
          return "bg-yellow-900/20 text-yellow-400 border-yellow-400/30";
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


  const PaymentMethodBadge = ({ method }) => {
    const getMethodIcon = (method) => {
      switch (method.toLowerCase()) {
        case "upi":
          return "📱";
        case "card":
          return "💳";
        case "netbanking":
          return "🏦";
        case "wallet":
          return "👛";
        default:
          return "💰";
      }
    };

    return (
      <span className="flex items-center text-xs bg-blue-900/20 text-blue-400 px-2 py-1 rounded-md">
        <span className="mr-1">{getMethodIcon(method)}</span>
        {method}
      </span>
    );
  };



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-300 flex items-center">
          <svg className="animate-spin mr-2 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading payment data...
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
        <p className="text-lg font-medium">Error loading payment data</p>
        <p className="text-sm mb-4">{error}</p>
        <button
          onClick={() => dispatch(fetchPayments())}
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
        <h2 className="text-2xl font-bold text-white">Payments & Payouts</h2>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-gray-800 rounded-md text-sm">
            Total: {payments ? payments.length : 0}
          </span>
          <button
            onClick={() => dispatch(fetchPayments())}
            className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-md text-sm flex items-center transition-all"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 p-4 rounded-lg border border-green-500/20">
          <div className="flex items-center">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Successful</p>
              <p className="text-xl font-semibold text-white">
                {payments.filter(p => p.status === 'SUCCESS').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-red-500/20">
          <div className="flex items-center">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <CreditCard className="w-6 h-6 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Failed</p>
              <p className="text-xl font-semibold text-white">
                {payments.filter(p => p.status === 'FAILED').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-yellow-500/20">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <CreditCard className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-xl font-semibold text-white">
                {payments.filter(p => p.status === 'PENDING').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-green-400/20">
          <div className="flex items-center">
            <div className="p-2 bg-green-400/20 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Total Amount</p>
              <p className="text-xl font-semibold text-white">
                ₹{payments.reduce((sum, p) => sum + (p.amount || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 shadow-lg rounded-lg border border-green-400/20">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full table-fixed" style={{minWidth: '1400px'}}>
            <thead className="bg-gray-800 sticky top-0 z-10">
              <tr className="text-xs font-medium text-green-400 uppercase tracking-wider">
                <th className="px-4 py-4 text-left w-16">S.No</th>
                <th className="px-4 py-4 text-left w-32">Order ID</th>
                <th className="px-4 py-4 text-left w-32">Payment ID</th>
                <th className="px-4 py-4 text-left w-64">Ride</th>
                <th className="px-4 py-4 text-left w-32">User</th>
                <th className="px-4 py-4 text-left w-32">Captain</th>
                <th className="px-4 py-4 text-left w-24">Amount</th>
                <th className="px-4 py-4 text-left w-24">Method</th>
                <th className="px-4 py-4 text-left w-32">UPI ID</th>
                <th className="px-4 py-4 text-left w-24">Status</th>
                <th className="px-4 py-4 text-left w-40">Payment Time</th>
                <th className="px-4 py-4 text-left w-28">Gateway</th>

              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {payments && payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr
                    key={payment.paymentId || index}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-4 font-medium">{index + 1}</td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-mono bg-gray-700 px-2 py-1 rounded block truncate">
                        {payment.orderId}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-mono bg-gray-700 px-2 py-1 rounded block truncate">
                        {payment.paymentId}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className=" text-sm" title={payment.ride}>
                        {payment.ride || 'N/A'}
                      </div>
                    </td>
                    <td className="px-4 py-4 truncate">{payment.user || 'N/A'}</td>
                    <td className="px-4 py-4 truncate">{payment.captain || 'N/A'}</td>
                    <td className="px-4 py-4 font-medium text-green-400">
                      ₹{payment.amount?.toLocaleString() || '0'}
                    </td>
                    <td className="px-4 py-4">
                      <PaymentMethodBadge method={payment.paymentMethod} />
                    </td>
                    <td className="px-4 py-4">
                      {payment.upiId && payment.upiId !== 'N/A' ? (
                        <span className="text-xs bg-purple-900/20 text-purple-400 px-2 py-1 rounded block truncate">
                          {payment.upiId}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <PaymentStatusBadge status={payment.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm">{formatDate(payment.paymentTime)}</div>
                        {payment.completionTime && payment.completionTime !== 'Pending' && (
                          <div className="text-xs text-gray-400">
                            Completed: {formatDate(payment.completionTime)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {payment.gatewayName && payment.gatewayName !== 'N/A' ? (
                        <span className="text-xs bg-blue-900/20 text-blue-400 px-2 py-1 rounded block truncate">
                          {payment.gatewayName}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan="13" className="px-6 py-12 text-gray-400">
                    <div className="flex flex-col items-center">
                      <CreditCard className="w-12 h-12 mb-2 text-gray-600" />
                      <p>No payment records found</p>
                    </div>
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