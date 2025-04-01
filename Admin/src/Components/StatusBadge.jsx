import React from "react";

export default function StatusBadge({ status }) {
  let color = "";
  switch (status) {
    case "Completed":
    case "Active":
      color = "bg-neon-green text-black";
      break;
    case "Ongoing":
      color = "bg-cyan-500 text-black";
      break;
    case "Pending":
    case "Pending Approval":
      color = "bg-yellow-300 text-black";
      break;
    case "Canceled":
    case "Banned":
      color = "bg-pink-500 text-black";
      break;
    case "Open":
      color = "bg-orange-400 text-black";
      break;
    case "Closed":
      color = "bg-gray-500 text-white";
      break;
    default:
      color = "bg-gray-600 text-white";
      break;
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}
