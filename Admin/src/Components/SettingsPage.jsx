import React from "react";
export default function SettingsPage() {
  return (
    <div className="mt-4 text-gray-100">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="bg-[#1a1a1a] shadow-neon rounded-lg p-6 border border-neon-green/20 text-sm text-gray-400">
        <p>
          <strong className="text-neon-green">General Settings:</strong> Manage basic application settings, branding, and configuration.
        </p>
        <p className="mt-4">
          <strong className="text-neon-green">Security Settings:</strong> Configure authentication, roles, and permissions. This is a placeholder for demonstration.
        </p>
      </div>
    </div>
  );
}
