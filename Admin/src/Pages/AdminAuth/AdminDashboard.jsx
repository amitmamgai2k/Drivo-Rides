import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  Users, Car, DollarSign, Activity, LifeBuoy, Settings,
  HelpCircle, LogOut, Bell, Search, Menu, X, ChevronDown, Grid, List,
  AlertTriangle, FileText, Clock, CheckCircle, XCircle, MapPin, CreditCard
} from 'lucide-react';

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Static data for Drivo project
  const rideStatusData = [
    { name: 'Completed', value: 1456, color: '#4CAF50' },
    { name: 'Ongoing', value: 234, color: '#2196F3' },
    { name: 'Canceled', value: 145, color: '#F44336' },
  ];

  const monthlyEarnings = [
    { name: 'Jan', earnings: 42000, captainEarnings: 33600, platformFee: 8400 },
    { name: 'Feb', earnings: 38000, captainEarnings: 30400, platformFee: 7600 },
    { name: 'Mar', earnings: 45000, captainEarnings: 36000, platformFee: 9000 },
    { name: 'Apr', earnings: 52000, captainEarnings: 41600, platformFee: 10400 },
    { name: 'May', earnings: 48000, captainEarnings: 38400, platformFee: 9600 },
    { name: 'Jun', earnings: 58000, captainEarnings: 46400, platformFee: 11600 },
    { name: 'Jul', earnings: 65000, captainEarnings: 52000, platformFee: 13000 },
  ];

  const weeklyRides = [
    { day: 'Mon', rides: 186 },
    { day: 'Tue', rides: 210 },
    { day: 'Wed', rides: 245 },
    { day: 'Thu', rides: 228 },
    { day: 'Fri', rides: 305 },
    { day: 'Sat', rides: 340 },
    { day: 'Sun', rides: 275 }
  ];

  const recentRides = [
    { id: 'R-7841', user: 'John Smith', captain: 'Mike Wilson', from: 'Downtown', to: 'Airport', amount: '$24.50', status: 'Completed', time: '25 mins ago' },
    { id: 'R-7842', user: 'Sarah Johnson', captain: 'Robert Brown', from: 'Mall', to: 'Residence', amount: '$12.75', status: 'Completed', time: '43 mins ago' },
    { id: 'R-7843', user: 'Amy Davis', captain: 'Carlos Gomez', from: 'Office Park', to: 'Restaurant', amount: '$8.25', status: 'Ongoing', time: '12 mins ago' },
    { id: 'R-7844', user: 'David Wilson', captain: 'Pending', from: 'Stadium', to: 'Hotel', amount: '$15.30', status: 'Pending', time: '5 mins ago' },
    { id: 'R-7845', user: 'Emma White', captain: 'Sam Brown', from: 'University', to: 'Library', amount: '$6.50', status: 'Canceled', time: '1 hour ago' },
  ];

  const captains = [
    { id: 'C-1241', name: 'Mike Wilson', rating: 4.8, rides: 342, earnings: '$4,350', status: 'Active', vehicle: 'Toyota Camry' },
    { id: 'C-1242', name: 'Robert Brown', rating: 4.9, rides: 523, earnings: '$6,125', status: 'Active', vehicle: 'Honda Accord' },
    { id: 'C-1243', name: 'Carlos Gomez', rating: 4.7, rides: 211, earnings: '$2,780', status: 'Active', vehicle: 'Ford Fusion' },
    { id: 'C-1244', name: 'Sam Brown', rating: 4.6, rides: 178, earnings: '$2,150', status: 'Pending Approval', vehicle: 'Chevrolet Malibu' },
    { id: 'C-1245', name: 'James Lopez', rating: 4.5, rides: 98, earnings: '$1,245', status: 'Banned', vehicle: 'Nissan Altima' },
  ];

  const pendingPayouts = [
    { id: 'P-2341', captain: 'Mike Wilson', amount: '$350', requestDate: '2023-07-15', status: 'Pending' },
    { id: 'P-2342', captain: 'Robert Brown', amount: '$425', requestDate: '2023-07-14', status: 'Pending' },
    { id: 'P-2343', captain: 'Carlos Gomez', amount: '$280', requestDate: '2023-07-14', status: 'Pending' },
  ];

  const supportTickets = [
    { id: 'T-3451', user: 'John Smith', subject: 'Refund Request', status: 'Open', priority: 'High', created: '2 hours ago' },
    { id: 'T-3452', user: 'Emma White', subject: 'Captain Behavior', status: 'Open', priority: 'Medium', created: '5 hours ago' },
    { id: 'T-3453', user: 'David Wilson', subject: 'App Error', status: 'Closed', priority: 'Low', created: '1 day ago' },
  ];

  const metrics = [
    { name: 'Total Rides', value: '1,835', icon: <Car size={24} />, change: '+15.2%', color: 'bg-blue-500' },
    { name: 'Total Earnings', value: '$65,420', icon: <DollarSign size={24} />, change: '+20.5%', color: 'bg-green-500' },
    { name: 'Active Captains', value: '147', icon: <Users size={24} />, change: '+8.7%', color: 'bg-purple-500' },
    { name: 'Pending Requests', value: '28', icon: <Clock size={24} />, change: '-3.1%', color: 'bg-yellow-500' },
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    let color = '';

    switch (status) {
      case 'Completed':
        color = 'bg-green-100 text-green-800';
        break;
      case 'Ongoing':
        color = 'bg-blue-100 text-blue-800';
        break;
      case 'Pending':
        color = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Canceled':
        color = 'bg-red-100 text-red-800';
        break;
      case 'Active':
        color = 'bg-green-100 text-green-800';
        break;
      case 'Pending Approval':
        color = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Banned':
        color = 'bg-red-100 text-red-800';
        break;
      case 'Open':
        color = 'bg-orange-100 text-orange-800';
        break;
      case 'Closed':
        color = 'bg-gray-100 text-gray-800';
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
    }

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex justify-between items-center">
          {sidebarOpen && <h1 className="text-xl font-bold">Drivo Admin</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded hover:bg-gray-800">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-6">
          <div
            className={`flex items-center p-4 ${activeTab === 'dashboard' ? 'bg-gray-800' : ''} hover:bg-gray-800 cursor-pointer`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Grid size={20} />
            {sidebarOpen && <span className="ml-4">Dashboard</span>}
          </div>
          <div
            className={`flex items-center p-4 ${activeTab === 'rides' ? 'bg-gray-800' : ''} hover:bg-gray-800 cursor-pointer`}
            onClick={() => setActiveTab('rides')}
          >
            <Car size={20} />
            {sidebarOpen && <span className="ml-4">Rides</span>}
          </div>
          <div
            className={`flex items-center p-4 ${activeTab === 'captains' ? 'bg-gray-800' : ''} hover:bg-gray-800 cursor-pointer`}
            onClick={() => setActiveTab('captains')}
          >
            <Users size={20} />
            {sidebarOpen && <span className="ml-4">Captains</span>}
          </div>
          <div
            className={`flex items-center p-4 ${activeTab === 'users' ? 'bg-gray-800' : ''} hover:bg-gray-800 cursor-pointer`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} />
            {sidebarOpen && <span className="ml-4">Users</span>}
          </div>
          <div
            className={`flex items-center p-4 ${activeTab === 'payments' ? 'bg-gray-800' : ''} hover:bg-gray-800 cursor-pointer`}
            onClick={() => setActiveTab('payments')}
          >
            <DollarSign size={20} />
            {sidebarOpen && <span className="ml-4">Payments</span>}
          </div>
          <div
            className={`flex items-center p-4 ${activeTab === 'reports' ? 'bg-gray-800' : ''} hover:bg-gray-800 cursor-pointer`}
            onClick={() => setActiveTab('reports')}
          >
            <FileText size={20} />
            {sidebarOpen && <span className="ml-4">Reports</span>}
          </div>
          <div
            className={`flex items-center p-4 ${activeTab === 'support' ? 'bg-gray-800' : ''} hover:bg-gray-800 cursor-pointer`}
            onClick={() => setActiveTab('support')}
          >
            <LifeBuoy size={20} />
            {sidebarOpen && <span className="ml-4">Support</span>}
          </div>
          <div
            className={`flex items-center p-4 ${activeTab === 'settings' ? 'bg-gray-800' : ''} hover:bg-gray-800 cursor-pointer`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            {sidebarOpen && <span className="ml-4">Settings</span>}
          </div>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center text-red-400 hover:bg-gray-800 cursor-pointer p-4 rounded">
            <LogOut size={20} />
            {sidebarOpen && <span className="ml-4">Logout</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 flex-1 max-w-md">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search rides, users, captains..."
                className="bg-transparent border-none focus:outline-none ml-2 w-full"
              />
            </div>
            <div className="flex items-center">
              <div className="relative mr-6">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">5</span>
              </div>
              <div className="flex items-center">
                <img
                  src="/api/placeholder/40/40"
                  alt="Admin"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex items-center cursor-pointer">
                  <span className="text-sm font-medium mr-1">Admin</span>
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white border rounded-md shadow-sm text-sm font-medium hover:bg-gray-50">
                Export Reports
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700">
                Live Tracking
              </button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  </div>
                  <div className={`${metric.color} p-3 rounded-full text-white`}>
                    {metric.icon}
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className={`${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'} text-sm font-medium`}>
                    {metric.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">from last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Monthly Earnings</h2>
                <select className="border rounded-md px-2 py-1 text-sm">
                  <option>Last 7 months</option>
                  <option>Last 12 months</option>
                  <option>This year</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="earnings" name="Total Earnings" fill="#4CAF50" />
                  <Bar dataKey="captainEarnings" name="Captain Earnings" fill="#2196F3" />
                  <Bar dataKey="platformFee" name="Platform Fee" fill="#FFC107" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Ride Statistics</h2>
                <div className="flex space-x-2">
                  <button className="p-1 rounded border"><Grid size={16} /></button>
                  <button className="p-1 rounded border bg-gray-100"><List size={16} /></button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={rideStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {rideStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Rides and Maps Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Weekly Ride Trends</h2>
                <select className="border rounded-md px-2 py-1 text-sm">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>Two Weeks Ago</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyRides}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="rides" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Active Locations</h2>
                <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">View Full Map</button>
              </div>
              <div className="flex items-center justify-center" style={{ height: '300px' }}>
                <div className="text-center p-8">
                  <MapPin size={40} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 mb-4">Live map view would appear here</p>
                  <p className="text-gray-400 text-sm">24 captains currently active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Rides Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recent Rides</h2>
                <button className="text-blue-600 text-sm hover:underline">View All Rides</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ride ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Captain
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentRides.map((ride) => (
                    <tr key={ride.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ride.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{ride.user}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ride.captain}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ride.from} → {ride.to}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ride.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={ride.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                        {ride.status === 'Pending' && (
                          <a href="#" className="text-green-600 hover:text-green-900 mr-3">Assign</a>
                        )}
                        {(ride.status === 'Pending' || ride.status === 'Ongoing') && (
                          <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">5</span> of <span className="font-medium">1,835</span> rides
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 rounded border text-sm">Previous</button>
                  <button className="px-3 py-1 rounded border bg-blue-50 text-blue-600 text-sm">Next</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Sections: Captain List, Pending Payouts, Support */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Top Captains */}
            <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-1">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Top Captains</h2>
              </div>
              <div className="p-6">
                {captains.slice(0, 3).map((captain, index) => (
                  <div key={captain.id} className={`flex items-center justify-between ${index !== 2 ? 'mb-4 pb-4 border-b border-gray-200' : ''}`}>
                    <div className="flex items-center">
                      <img
                        src={`/api/placeholder/40/40`}
                        alt={captain.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{captain.name}</div>
                        <div className="text-sm text-gray-500">{captain.rides} rides</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{captain.earnings}</div>
                      <div className="flex items-center text-yellow-500">
                        <span className="text-sm">★ {captain.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                  View All Captains
                </button>
              </div>
            </div>

            {/* Pending Payouts */}
            <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-1">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Pending Payouts</h2>
              </div>
              <div className="p-6">
                {pendingPayouts.map((payout, index) => (
                  <div key={payout.id} className={`flex items-center justify-between ${index !== pendingPayouts.length - 1 ? 'mb-4 pb-4 border-b border-gray-200' : ''}`}>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payout.captain}</div>
                      <div className="text-sm text-gray-500">Requested: {payout.requestDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{payout.amount}</div>
                      <div>
                        <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                  View All Payouts
                </button>
              </div>
            </div>

            {/* Support Tickets */}
            <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-1">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Support Tickets</h2>
              </div>
              <div className="p-6">
                {supportTickets.map((ticket, index) => (
                  <div key={ticket.id} className={`${index !== supportTickets.length - 1 ? 'mb-4 pb-4 border-b border-gray-200' : ''}`}>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                      <StatusBadge status={ticket.status} />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <div>{ticket.user}</div>
                      <div>{ticket.created}</div>
                    </div>
                    {ticket.priority === 'High' && (
                      <div className="mt-2 flex items-center text-xs text-red-600">
                        <AlertTriangle size={12} className="mr-1" />
                        High Priority
                      </div>
                    )}
                  </div>
                ))}
                <button className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                  View All Tickets
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
