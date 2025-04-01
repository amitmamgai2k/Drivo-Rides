import React from "react";
import { Bell, ChevronDown, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#1a1a1a] pb-[11px] shadow-sm flex items-center justify-end gap-16 px-4 py-4 border-b border-neon-green/20">


      <div className="flex items-center space-x-6">
        <div className="relative cursor-pointer text-neon-green">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            5
          </span>
        </div>
        <div className="flex items-center cursor-pointer">
          <img
            className="w-8 h-8 rounded-full mr-2 border border-neon-green/30"
            src="https://via.placeholder.com/40/00ff7f/000000?text=A"
            alt="Admin Avatar"
          />
          <span className="text-sm font-medium hidden md:block text-gray-100">Admin</span>
          <ChevronDown size={16} className="ml-1 hidden md:block text-neon-green" />
        </div>
      </div>
    </header>
  );
}