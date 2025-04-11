import React from "react";
import { Bell, ChevronDown, Search,User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#1a1a1a] pb-[11px] shadow-sm flex items-center justify-end gap-16 px-4 py-4 border-b border-neon-green/20">




        <div className="flex items-center cursor-pointer">
         <User size ={36} className="text-white "/>
          <span className="text-sm font-medium hidden md:block text-gray-100">Admin</span>


      </div>
    </header>
  );
}