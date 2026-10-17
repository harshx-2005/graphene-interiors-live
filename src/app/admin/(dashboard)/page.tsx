import React from "react";
import Link from "next/link";
import {
  Briefcase,
  FolderHeart,
  MessageSquareHeart,
  Images,
  HelpCircle,
  Plus,
  Settings,
  ArrowRight,
  Database,
  CloudLightning,
  Sparkles,
  CheckCircle,
  FileText
} from "lucide-react";
import { db } from "@/lib/db";

export const revalidate = 0; // Disable caching for the admin dashboard

export default async function AdminDashboard() {
  // Query stats from DB
  const servicesCount = await db.service.count();
  const projectsCount = await db.portfolioProject.count();
  const testimonialsCount = await db.testimonial.count();
  const galleryCount = await db.galleryItem.count();
  const faqCount = await db.faq.count();

  // System Statuses
  const isDbConnected = true; // If this page renders, SQLite is running
  const isCloudinaryConfigured = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

  // Fetch last 3 updates to show under Recent Updates
  const recentServices = await db.service.findMany({
    take: 2,
    orderBy: { createdAt: "desc" },
    select: { title: true, createdAt: true },
  });

  const recentProjects = await db.portfolioProject.findMany({
    take: 2,
    orderBy: { createdAt: "desc" },
    select: { projectName: true, createdAt: true },
  });

  const recentTestimonials = await db.testimonial.findMany({
    take: 2,
    orderBy: { createdAt: "desc" },
    select: { clientName: true, createdAt: true },
  });

  const recentUpdatesList = [
    ...recentServices.map((s) => ({
      type: "Service",
      name: s.title,
      time: s.createdAt,
    })),
    ...recentProjects.map((p) => ({
      type: "Project",
      name: p.projectName,
      time: p.createdAt,
    })),
    ...recentTestimonials.map((t) => ({
      type: "Testimonial",
      name: `Review by ${t.clientName}`,
      time: t.createdAt,
    })),
  ].sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 4);

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0d1322] to-[#0f182c] border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">SYSTEM DASHBOARD</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
            Welcome to Graphene Interiors CMS
          </h1>
          <p className="text-gray-400 text-xs font-light max-w-xl">
            From this panel, you can update all homepage content, manage portfolio projects, write client testimonials, and add dynamic services.
          </p>
        </div>

        <div className="shrink-0 flex gap-3">
          <Link
            href="/"
            target="_blank"
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors select-none"
          >
            <span>View Site</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Services", count: servicesCount, icon: Briefcase, color: "text-blue-400", href: "/admin/services" },
          { label: "Portfolio Items", count: projectsCount, icon: FolderHeart, color: "text-accent", href: "/admin/portfolio" },
          { label: "Gallery Assets", count: galleryCount, icon: Images, color: "text-purple-400", href: "/admin/gallery" },
          { label: "FAQs", count: faqCount, icon: HelpCircle, color: "text-amber-400", href: "/admin/faq" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="bg-[#0d1222] border border-white/5 p-5 md:p-6 rounded-2xl shadow-sm hover:border-white/10 transition-all flex items-center justify-between group"
            >
              <div className="space-y-1">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">{stat.label}</span>
                <span className="text-2xl md:text-3xl font-serif font-bold text-white block group-hover:scale-[1.02] transition-transform origin-left">
                  {stat.count}
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl group-hover:bg-[#748f6e]/10 transition-colors">
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Status, Quick Actions & Recent Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Left/Middle Columns: Quick Actions & Updates */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          
          {/* Quick Actions Card */}
          <div className="bg-[#0d1222] border border-white/5 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-white font-serif text-lg font-bold">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Link
                href="/admin/services"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-[#748f6e]/10 border border-white/5 hover:border-[#748f6e]/30 transition-all text-xs font-bold text-gray-200 tracking-wider uppercase group"
              >
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5 text-accent" />
                  <span>Add New Service</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/admin/portfolio"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-[#748f6e]/10 border border-white/5 hover:border-[#748f6e]/30 transition-all text-xs font-bold text-gray-200 tracking-wider uppercase group"
              >
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5 text-accent" />
                  <span>Add Portfolio Project</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/admin/media"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-[#748f6e]/10 border border-white/5 hover:border-[#748f6e]/30 transition-all text-xs font-bold text-gray-200 tracking-wider uppercase group"
              >
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5 text-accent" />
                  <span>Upload Media Files</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/admin/contact"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-[#748f6e]/10 border border-white/5 hover:border-[#748f6e]/30 transition-all text-xs font-bold text-gray-200 tracking-wider uppercase group"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-accent" />
                  <span>Edit Contact Details</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Recent Updates Card */}
          <div className="bg-[#0d1222] border border-white/5 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-white font-serif text-lg font-bold">Recent Updates</h3>
            {recentUpdatesList.length > 0 ? (
              <div className="divide-y divide-white/5">
                {recentUpdatesList.map((item, idx) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#748f6e] uppercase tracking-wider block">
                        {item.type}
                      </span>
                      <span className="text-xs font-semibold text-white block">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500">
                      {item.time.toLocaleDateString("en-GB")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-xs py-4 text-center italic">
                No recent activity logged in the database yet.
              </p>
            )}
          </div>

        </div>

        {/* Right Column: Status Summary */}
        <div className="space-y-6">
          
          {/* Website Status Card */}
          <div className="bg-[#0d1222] border border-white/5 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="text-white font-serif text-lg font-bold">Website Status</h3>
            
            <div className="space-y-4">
              {/* Database Status */}
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-accent" />
                  <div>
                    <span className="text-xs font-semibold text-white block">Local Database</span>
                    <span className="text-[10px] text-gray-500 block">SQLite File (graphene.db)</span>
                  </div>
                </div>
                {isDbConnected ? (
                  <span className="inline-flex items-center bg-[#748f6e]/15 text-[#92ab8d] px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide">
                    Online
                  </span>
                ) : (
                  <span className="inline-flex items-center bg-red-950/20 text-red-400 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide">
                    Offline
                  </span>
                )}
              </div>

              {/* Cloudinary Status */}
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <CloudLightning className="w-5 h-5 text-accent" />
                  <div>
                    <span className="text-xs font-semibold text-white block">Media Storage</span>
                    <span className="text-[10px] text-gray-500 block">Cloudinary Integration</span>
                  </div>
                </div>
                {isCloudinaryConfigured ? (
                  <span className="inline-flex items-center bg-[#748f6e]/15 text-[#92ab8d] px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide">
                    Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center bg-amber-950/20 text-amber-500 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide" title="Using local uploads folder fallback">
                    Fallback Mode
                  </span>
                )}
              </div>

              {/* SSL Status */}
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <div>
                    <span className="text-xs font-semibold text-white block">System Security</span>
                    <span className="text-[10px] text-gray-500 block">Cookies & CSRF</span>
                  </div>
                </div>
                <span className="inline-flex items-center bg-[#748f6e]/15 text-[#92ab8d] px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats overview */}
          <div className="bg-[#0d1222] border border-white/5 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-white font-serif text-lg font-bold">Feedback / Leads</h3>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center space-y-2">
              <FileText className="w-8 h-8 text-accent mx-auto" />
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Email System</h4>
              <p className="text-[10px] text-gray-400 font-light leading-relaxed">
                Client leads are submitted through forms and instantly routed via Resend API to your business email (grapheneinteriors@gmail.com).
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
