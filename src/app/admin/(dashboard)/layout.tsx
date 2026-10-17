import React from "react";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import AdminSidebarWrapper from "./admin-sidebar-wrapper";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await verifyAuth();

  // Route protection - if DB session check fails, force redirect to login
  if (!user) {
    redirect("/admin/login");
  }

  return <AdminSidebarWrapper>{children}</AdminSidebarWrapper>;
}
