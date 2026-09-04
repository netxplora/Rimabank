import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { StaffSidebar } from './StaffSidebar';
import { StaffHeader } from './StaffHeader';

export const StaffLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a1e3f] flex flex-col font-sans antialiased">
      {/* Sidebar for Desktop & Mobile */}
      <StaffSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Wrap */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <StaffHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in-50 duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
