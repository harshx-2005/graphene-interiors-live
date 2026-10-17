"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";

export default function AdminSidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-gray-100 font-sans">
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <AdminHeader setMobileOpen={setMobileOpen} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-8 bg-[#090d16]">
          {children}
        </main>
      </div>
    </div>
  );
}
