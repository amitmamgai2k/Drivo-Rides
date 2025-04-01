// File: data/mockData.js
import { Car, DollarSign, Users, Clock } from "lucide-react";

export const metricsData = [
  {
    label: "Total Rides",
    value: "1,835",
    icon: Car,
    trend: "+15.2%",
    color: "bg-neon-green",
  },
  {
    label: "Total Earnings",
    value: "$65,420",
    icon: DollarSign,
    trend: "+20.5%",
    color: "bg-teal-400",
  },
  {
    label: "Active Captains",
    value: "147",
    icon: Users,
    trend: "+8.7%",
    color: "bg-blue-400",
  },
  {
    label: "Pending Requests",
    value: "28",
    icon: Clock,
    trend: "-3.1%",
    color: "bg-pink-500",
  },
];

export const monthlyData = [
  { month: "Jan", totalRides: 1200, completedRides: 1150, earnings: 38000 },
  { month: "Feb", totalRides: 1350, completedRides: 1285, earnings: 42000 },
  { month: "Mar", totalRides: 1550, completedRides: 1490, earnings: 47000 },
  { month: "Apr", totalRides: 1600, completedRides: 1532, earnings: 51000 },
  { month: "May", totalRides: 1750, completedRides: 1678, earnings: 56000 },
  { month: "Jun", totalRides: 1820, completedRides: 1750, earnings: 60000 },
  { month: "Jul", totalRides: 1900, completedRides: 1810, earnings: 65000 },
  { month: "Aug", totalRides: 1950, completedRides: 1860, earnings: 68000 },
];

export const rideStatusData = [
  { name: "Completed", value: 1456, color: "#00FF7F" },
  { name: "Ongoing", value: 234, color: "#00FFFF" },
  { name: "Canceled", value: 145, color: "#FF1493" },
];

export const weeklyRides = [
  { day: "Mon", rides: 186 },
  { day: "Tue", rides: 210 },
  { day: "Wed", rides: 245 },
  { day: "Thu", rides: 228 },
  { day: "Fri", rides: 305 },
  { day: "Sat", rides: 340 },
  { day: "Sun", rides: 275 },
];

export const recentRides = [
  { id: "R-7841", user: "John Smith", captain: "Mike Wilson", from: "Downtown", to: "Airport", amount: "$24.50", status: "Completed", time: "25 mins ago" },
  { id: "R-7842", user: "Sarah Johnson", captain: "Robert Brown", from: "Mall", to: "Residence", amount: "$12.75", status: "Completed", time: "43 mins ago" },
  { id: "R-7843", user: "Amy Davis", captain: "Carlos Gomez", from: "Office Park", to: "Restaurant", amount: "$8.25", status: "Ongoing", time: "12 mins ago" },
  { id: "R-7844", user: "David Wilson", captain: "Pending", from: "Stadium", to: "Hotel", amount: "$15.30", status: "Pending", time: "5 mins ago" },
  { id: "R-7845", user: "Emma White", captain: "Sam Brown", from: "University", to: "Library", amount: "$6.50", status: "Canceled", time: "1 hour ago" },
];

export const captainsData = [
  { id: "C-1241", name: "Mike Wilson", rating: 4.8, rides: 342, earnings: "$4,350", status: "Active", vehicle: "Toyota Camry" },
  { id: "C-1242", name: "Robert Brown", rating: 4.9, rides: 523, earnings: "$6,125", status: "Active", vehicle: "Honda Accord" },
  { id: "C-1243", name: "Carlos Gomez", rating: 4.7, rides: 211, earnings: "$2,780", status: "Active", vehicle: "Ford Fusion" },
  { id: "C-1244", name: "Sam Brown", rating: 4.6, rides: 178, earnings: "$2,150", status: "Pending Approval", vehicle: "Chevrolet Malibu" },
  { id: "C-1245", name: "James Lopez", rating: 4.5, rides: 98, earnings: "$1,245", status: "Banned", vehicle: "Nissan Altima" },
];

export const userData = [
  { id: "U-1001", name: "John Smith", rides: 12, joined: "2023-03-01", status: "Active" },
  { id: "U-1002", name: "Sarah Johnson", rides: 5, joined: "2023-04-12", status: "Active" },
  { id: "U-1003", name: "David Wilson", rides: 7, joined: "2023-01-20", status: "Banned" },
  { id: "U-1004", name: "Amy Davis", rides: 3, joined: "2023-05-05", status: "Pending" },
  { id: "U-1005", name: "Daniel Lee", rides: 9, joined: "2023-02-10", status: "Active" },
];

export const supportTickets = [
  { id: "T-3451", user: "John Smith", subject: "Refund Request", status: "Open", priority: "High", created: "2 hours ago" },
  { id: "T-3452", user: "Emma White", subject: "Captain Behavior", status: "Open", priority: "Medium", created: "5 hours ago" },
  { id: "T-3453", user: "David Wilson", subject: "App Error", status: "Closed", priority: "Low", created: "1 day ago" },
];
