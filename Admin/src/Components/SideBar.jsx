import React from "react";
import { LogOut, Menu } from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab, navItems }) {
  return (
    <>
      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed top-0 left-0 h-full w-64 bg-[#1a1a1a] text-gray-100 flex flex-col border-r  z-20 transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center justify-between px-4 py-3 ">
            <h1 className="text-xl font-bold text-neon-green">Neon Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-[#2a2a2a] p-1 rounded text-neon-green"
            >
              <Menu size={24} />
            </button>
          </div>
          <nav className="flex-1 mt-2">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`${
                  activeTab === item.name
                    ? "bg-[#2a2a2a] border-l-4 border-neon-green"
                    : ""
                } flex items-center px-4 py-3 hover:bg-[#2a2a2a] cursor-pointer transition`}
              >
                <div className="mr-2 text-neon-green">{item.icon}</div>
                <span className="text-sm text-gray-100">{item.name}</span>
              </div>
            ))}
          </nav>
          <div className="px-4 py-3 border-t border-neon-green/20">
            <button className="flex items-center w-full hover:bg-[#2a2a2a] px-3 py-2 rounded text-sm text-neon-green transition">
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Toggle button - always visible when sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-3 left-3 p-2 hover:bg-[#2a2a2a] bg-[#1a1a1a] text-white rounded text-neon-green z-20"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
}