"use client";

import React, { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, LogOut, User, Globe, AlertCircle } from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { useToast } from "@/components/providers";

interface AdminHeaderProps {
  setMobileOpen: (open: boolean) => void;
}

export default function AdminHeader({ setMobileOpen }: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { success, error } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const res = await logoutAction();
      if (res.success) {
        success("Logged out successfully");
        router.push("/admin/login");
        router.refresh();
      } else {
        error("Logout failed.");
      }
    });
  };

  // Get segment title for header display
  const getSegmentTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname.includes("/admin/homepage")) return "Edit Homepage";
    if (pathname.includes("/admin/about")) return "Edit About Details";
    if (pathname.includes("/admin/services")) return "Manage Services";
    if (pathname.includes("/admin/portfolio")) return "Manage Portfolio";
    if (pathname.includes("/admin/gallery")) return "Gallery Management";
    if (pathname.includes("/admin/media")) return "Media Library (Cloudinary)";
    if (pathname.includes("/admin/testimonials")) return "Manage Testimonials";
    if (pathname.includes("/admin/faq")) return "Manage FAQs";
    if (pathname.includes("/admin/contact")) return "Contact Information";
    if (pathname.includes("/admin/seo")) return "SEO & Metatags";
    if (pathname.includes("/admin/settings")) return "Theme & Logo Settings";
    if (pathname.includes("/admin/profile")) return "Admin Credentials";
    return "Admin System";
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-[#0e1322] border-b border-white/5 sticky top-0 z-30">
      {/* Left side info */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 text-gray-400 hover:text-white rounded lg:hidden cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-white font-serif text-lg font-bold tracking-wide">
          {getSegmentTitle()}
        </h2>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-4">
        {/* Admin Badge */}
        <div className="hidden sm:flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-300 text-xs font-semibold select-none">
          <User className="w-3.5 h-3.5 text-accent" />
          <span>Admin</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center space-x-2 bg-red-950/40 hover:bg-red-900/30 text-red-400 border border-red-900/35 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
