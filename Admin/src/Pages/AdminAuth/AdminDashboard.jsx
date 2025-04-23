
import React, { useState } from "react";
import Sidebar from "../../Components/SideBar";
import Header from "../../Components/Header";
import DashboardOverview from "../../Components/DashBoardOverView";
import RidesTable from "../../Components/RidesTable";
import CaptainsTable from "../../Components/CaptainsTable";
import UsersTable from "../../Components/UserTable";
import SupportTickets from "../../Components/SupportTicket";
import PaymentsPage from "../../Components/PaymentPage";
import ReportsPage from "../../Components/ReportPages";
import SettingsPage from "../../Components/SettingsPage";
import {
  Grid,
  Car,
  Users,
  DollarSign,
  FileText,
  LifeBuoy,
  Settings,
} from "lucide-react";
import {
  metricsData,
  monthlyData,
  rideStatusData,
  weeklyRides,
  captainsData,
  userData,
  supportTickets,
} from "../../Helpers/mockData";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", icon: <Grid size={18} /> },
    { name: "Rides", icon: <Car size={18} /> },
    { name: "Captains", icon: <Users size={18} /> },
    { name: "Users", icon: <Users size={18} /> },
    { name: "Payments", icon: <DollarSign size={18} /> },
    { name: "Reports", icon: <FileText size={18} /> },
    { name: "Support", icon: <LifeBuoy size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <DashboardOverview
            setSidebarOpen={setSidebarOpen}
            metricsData={metricsData}
            monthlyData={monthlyData}
            rideStatusData={rideStatusData}
            weeklyRides={weeklyRides}
          />
        );
      case "Rides":
        return <RidesTable setSidebarOpen={setSidebarOpen} />;
      case "Captains":
        return <CaptainsTable setSidebarOpen={setSidebarOpen} />;
      case "Users":
        return <UsersTable userData={userData} setSidebarOpen={setSidebarOpen} />;
      case "Support":
        return <SupportTickets supportTickets={supportTickets} />;
      case "Payments":
        return <PaymentsPage  setSidebarOpen={setSidebarOpen}/>;
      case "Reports":
        return <ReportsPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0d0d0d] overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navItems={navItems}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
