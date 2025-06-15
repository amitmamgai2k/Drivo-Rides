import {useEffect} from "react";
import { Award, CalendarDays, CheckCircle, Clock1, MapPin, Star, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { fetchMetricsData, fetchRidesStatusData } from "../Redux/Slices/AdminDashBoardData";
import { useDispatch, useSelector } from "react-redux";

import { fetchmonthlyData,fetchWeeklyRides } from "../Redux/Slices/AdminDashBoardData";

import { Car, DollarSign, Users, Clock } from "lucide-react";

export default function DashboardOverview({ setSidebarOpen }) {
  const dispatch = useDispatch();
  const { metricsData, loading, error } = useSelector((state) => state.dashboard);
  const { ridesStatusDatas = [] } = useSelector((state) => state?.dashboard || {});
  const { monthlyData = [] } = useSelector((state) => state?.dashboard || {});
  const { weeklyData = []  } = useSelector((state) => state?.dashboard || {});


  useEffect(() => {
    dispatch(fetchMetricsData());
    setSidebarOpen(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRidesStatusData());
    dispatch(fetchmonthlyData());
    dispatch(fetchWeeklyRides());
  }, [dispatch]);
console.log('weeklyRides', weeklyData);


  if (loading) {
    return <div className="text-gray-100">Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const transformedRideStatusData = ridesStatusDatas.map(item => {
    // Define colors for each status
    const statusColors = {
      completed: "#00FF7F",  // Green
      pending: "#FFA500",    // Orange
      ongoing: "#00FFFF",    // Cyan
      cancelled: "#FF1493",  // Pink
      accepted: "#4169E1"    // Royal Blue
    };

    return {
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      value: item.count,
      color: statusColors[item._id] || "#CCCCCC"
    };
  });

  const iconComponents = {
    Car: Car,
    DollarSign: DollarSign,
    Users: Users,
    Clock: Clock
  };

  const cards = [
    {
      label: "Total Rides",
      value: metricsData?.totalRides || 0,
      trend: "+15.2%",
      color: "bg-purple-500",
      icon: 'Car',
    },
    {
      label: "Total Earnings",
      value: `₹${metricsData?.totalEarnings?.toLocaleString() || 0}`,
      trend: "+20.5%",
      color: "bg-teal-400",
      icon: 'DollarSign',
    },
    {
      label: "Total Active Captains",
      value: metricsData?.activeCaptains || 0,
      trend: "+8.7%",
      color: "bg-blue-400",
      icon: 'Users',
    },
    {
      label: "Total Active Riders",
      value: metricsData?.activeRiders || 0,
      trend: "-3.1%",
      color: "bg-pink-500",
      icon: 'Clock',
    },
  ];

  return (
    <div className="mt-4 text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-neon-green">Admin Dashboard</h2>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {cards.map((metric) => {
          // Get the correct component based on the icon string
          const IconComponent = iconComponents[metric.icon] || null;

          return (
            <motion.div
              key={metric.label}
              className="bg-[#1a1a1a] rounded-lg shadow-neon p-5 flex justify-between items-center border border-neon-green/20"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <p className="text-sm text-gray-400 uppercase font-semibold tracking-wide">
                  {metric.label}
                </p>
                <p className="text-2xl font-bold text-neon-green">{metric.value}</p>
                <p
                  className={`text-sm ${
                    metric.trend.startsWith("+") ? "text-green-400" : "text-pink-400"
                  }`}
                >
                  {metric.trend} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${metric.color} text-black`}>
                {IconComponent && <IconComponent size={20} />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart - Now takes up less space */}
        <div className="bg-[#1a1a1a] rounded-lg shadow-neon p-6 xl:col-span-1 border border-neon-green/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-neon-green">Monthly Rides & Earnings</h3>

          </div>
          <div className="w-full" style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <XAxis dataKey="month" stroke="#aaa" angle={-45} textAnchor="end" height={50} />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }} labelStyle={{ color: "#fff" }} />
                <Legend wrapperStyle={{ color: "#ddd" }} />
                <Bar dataKey="totalRides" name="Total Rides" fill="#00FF7F" />
                <Bar dataKey="completedRides" name="Completed Rides" fill="#00FFFF" />
                <Bar dataKey="earnings" name="Earnings" fill="#FF1493" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Now takes up more space */}
        <div className="bg-[#1a1a1a] rounded-lg shadow-neon p-6 xl:col-span-1 border border-neon-green/20">
          <h3 className="text-lg font-semibold mb-4 text-neon-green self-center">Ride Status Distribution</h3>
          <div className="w-full" style={{ height: "400px" }}>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Pie
                  data={transformedRideStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={150}
                  innerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {transformedRideStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "white", color: "red", border: "2px solid text-black" }}
                />
                <Legend
                  wrapperStyle={{ color: "#ddd", paddingTop: "20px" }}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weekly Rides & Live Map Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] rounded-lg shadow-neon p-6 border border-neon-green/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-neon-green">Weekly Ride Trends</h3>
            <select className="bg-[#2a2a2a] border border-neon-green/20 rounded px-2 py-1 text-sm text-neon-green">
              <option>This Week</option>
              <option>Last Week</option>
              <option>2 Weeks Ago</option>
            </select>
          </div>
          <div className="w-full" style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={weeklyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorRides" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <XAxis dataKey="day" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }} labelStyle={{ color: "#fff" }} />
                <Area type="monotone" dataKey="rides" stroke="#00FFFF" fillOpacity={1} fill="url(#colorRides)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

   <div className="bg-[#1a1a1a] rounded-lg shadow-neon p-6 border border-neon-green/20">
  <h3 className="text-lg font-semibold text-neon-green mb-4">Quick Stats</h3>

  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
    {/* Total Distance */}
    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-violet-500/10 hover:border-violet-500/30 transition-colors">
      <div className="p-2 bg-violet-500/10 rounded">
        <MapPin className="text-violet-400" size={20} />
      </div>
      <div>
        <p className="text-gray-300 font-medium">Total Distance</p>
        <p className="text-lg font-semibold text-violet-400">{metricsData.totalDistance} km</p>
      </div>
    </div>

    {/* Total Time */}
    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-pink-500/10 hover:border-neon-green/30 transition-colors">
      <div className="p-2 bg-red-500/10 rounded">
        <Clock1 className="text-pink-400" size={20} />
      </div>
      <div>
        <p className="text-gray-300 font-medium">Total Time</p>
        <p className="text-lg font-semibold text-pink-400">{metricsData.totalTime} hrs</p>
      </div>
    </div>

    {/* Ongoing Rides */}
    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-blue-500/10 hover:border-blue-500/30 transition-colors">
      <div className="p-2 bg-blue-500/10 rounded">
        <Car className="text-blue-400" size={20} />
      </div>
      <div>
        <p className="text-gray-300 font-medium">Ongoing Rides</p>
        <p className="text-lg font-semibold text-blue-400">{metricsData.ongoingRides || 0}</p>
      </div>
    </div>

    {/* Accepted Rides */}
    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-green-500/10 hover:border-green-500/30 transition-colors">
      <div className="p-2 bg-green-500/10 rounded">
        <CheckCircle className="text-green-400" size={20} />
      </div>
      <div>
        <p className="text-gray-300 font-medium">Accepted Rides</p>
        <p className="text-lg font-semibold text-green-400">{metricsData.acceptedRides || 0}</p>
      </div>
    </div>

    {/* Pending Rides */}
    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors">
      <div className="p-2 bg-yellow-500/10 rounded">
        <Clock className="text-yellow-400" size={20} />
      </div>
      <div>
        <p className="text-gray-300 font-medium">Pending Rides</p>
        <p className="text-lg font-semibold text-yellow-400">{metricsData.pendingRides || 0}</p>
      </div>
    </div>

    {/* Cancelled Rides */}
    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-red-500/10 hover:border-red-500/30 transition-colors">
      <div className="p-2 bg-red-500/10 rounded">
        <XCircle className="text-red-400" size={20} />
      </div>
      <div>
        <p className="text-gray-300 font-medium">Cancelled Rides</p>
        <p className="text-lg font-semibold text-red-400">{metricsData.cancelledRides || 0}</p>
      </div>
    </div>
  </div>
</div>


      </div>
    </div>
  );
}