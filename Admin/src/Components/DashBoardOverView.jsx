// File: components/DashboardOverview.js
import React from "react";
import { MapPin } from "lucide-react";
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

export default function DashboardOverview({ metricsData, monthlyData, rideStatusData, weeklyRides }) {
  return (
    <div className="mt-4 text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-neon-green">Dashboard Overview</h2>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metricsData.map((metric) => {
          const Icon = metric.icon;
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
                <Icon size={20} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1a1a1a] rounded-lg shadow-neon p-6 xl:col-span-2 border border-neon-green/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-neon-green">Monthly Rides & Earnings</h3>
            <select className="bg-[#2a2a2a] border border-neon-green/20 rounded px-2 py-1 text-sm text-neon-green">
              <option>Last 8 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <XAxis dataKey="month" stroke="#aaa" />
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

        <div className="bg-[#1a1a1a] rounded-lg shadow-neon p-6 border border-neon-green/20">
          <h3 className="text-lg font-semibold mb-4 text-neon-green">Ride Status Distribution</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rideStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {rideStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }} labelStyle={{ color: "#fff" }} />
                <Legend wrapperStyle={{ color: "#ddd" }} />
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
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyRides}>
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

        <div className="bg-[#1a1a1a] rounded-lg shadow-neon p-6 flex flex-col items-center justify-center border border-neon-green/20">
          <MapPin size={40} className="text-neon-green" />
          <p className="text-gray-400 mt-4">Live map view would appear here</p>
          <p className="text-sm text-gray-500">24 captains currently active</p>
        </div>
      </div>
    </div>
  );
}