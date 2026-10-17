"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  UserRound,
  Briefcase,
  FolderHeart,
  Image,
  MessageSquareHeart,
  HelpCircle,
  Contact,
  Search,
  Images,
  Settings,
  UserCog,
  ArrowLeft,
  Menu,
  X
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Homepage", href: "/admin/homepage", icon: Home },
  { name: "About Us", href: "/admin/about", icon: UserRound },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Portfolio", href: "/admin/portfolio", icon: FolderHeart },
  { name: "Gallery Items", href: "/admin/gallery", icon: Image },
  { name: "Media Library", href: "/admin/media", icon: Images },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareHeart },
  { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { name: "Contact Info", href: "/admin/contact", icon: Contact },
  { name: "SEO Config", href: "/admin/seo", icon: Search },
  { name: "Theme Settings", href: "/admin/settings", icon: Settings },
  { name: "Admin Profile", href: "/admin/profile", icon: UserCog },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function AdminSidebar({ mobileOpen, setMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden cursor-pointer"
        />
      )}

      {/* Sidebar Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-[#0b0f19] border-r border-white/5 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/5 bg-[#080b12]">
          <Link href="/admin" className="flex items-center space-x-2.5 select-none" onClick={() => setMobileOpen(false)}>
            <div className="h-8 w-8 bg-white rounded flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
              <img src="/images/logo.png" alt="Admin Logo" className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold tracking-wider text-white">GRAPHENE</span>
              <span className="text-[8px] font-sans tracking-[0.25em] text-accent font-semibold uppercase -mt-0.5">ADMIN PANEL</span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 text-gray-400 hover:text-white rounded lg:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 no-scrollbar">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3.5 px-4.5 py-3.5 rounded-xl font-sans text-xs tracking-wider uppercase font-bold transition-all ${
                  isActive
                    ? "bg-[#748f6e]/15 border border-[#748f6e]/20 text-[#92ab8d]"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & public link */}
        <div className="p-4 border-t border-white/5 bg-[#080b12]/50">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go To Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
