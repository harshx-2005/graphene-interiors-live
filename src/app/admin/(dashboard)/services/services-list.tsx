"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Copy, Eye, EyeOff, ArrowUp, ArrowDown, ChevronRight, Briefcase } from "lucide-react";
import { deleteServiceAction, duplicateServiceAction, updateServiceAction, reorderServicesAction } from "@/actions/crud";
import { useToast } from "@/components/providers";

interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  image: string;
  isVisible: boolean;
  order: number;
  bulletsJson: string;
  benefitsJson: string;
  headline: string;
  description: string;
  galleryJson: string;
  video: string | null;
  seoTitle: string;
  seoDescription: string;
}

interface ServicesListProps {
  initialServices: ServiceItem[];
}

export default function ServicesList({ initialServices }: ServicesListProps) {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  // Delete Action
  const handleDelete = (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    startTransition(async () => {
      const res = await deleteServiceAction(id);
      if (res.success) {
        success(`Deleted "${title}"`);
        router.refresh();
      } else {
        toastError(res.error || "Failed to delete.");
      }
    });
  };

  // Duplicate Action
  const handleDuplicate = (id: number, title: string) => {
    startTransition(async () => {
      const res = await duplicateServiceAction(id);
      if (res.success) {
        success(`Duplicated "${title}"!`);
        router.refresh();
      } else {
        toastError(res.error || "Failed to duplicate.");
      }
    });
  };

  // Toggle Visibility Action
  const handleToggleVisibility = (service: ServiceItem) => {
    startTransition(async () => {
      const res = await updateServiceAction(service.id, {
        title: service.title,
        slug: service.slug,
        headline: service.headline,
        description: service.description,
        shortDescription: service.shortDescription,
        image: service.image,
        galleryJson: service.galleryJson,
        video: service.video,
        bulletsJson: service.bulletsJson,
        benefitsJson: service.benefitsJson,
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
        isVisible: !service.isVisible,
        order: service.order,
      });

      if (res.success) {
        success(`${service.title} is now ${!service.isVisible ? "visible" : "hidden"}`);
        router.refresh();
      } else {
        toastError(res.error || "Failed to update status.");
      }
    });
  };

  // Reorder Actions
  const handleMove = (idx: number, direction: "up" | "down") => {
    const nextIdx = direction === "up" ? idx - 1 : idx + 1;
    if (nextIdx < 0 || nextIdx >= initialServices.length) return;

    const items = [...initialServices];
    // Swap items in the array
    const temp = items[idx];
    items[idx] = items[nextIdx];
    items[nextIdx] = temp;

    // Map to payload with new clean ordering weights
    const payload = items.map((item, index) => ({
      id: item.id,
      order: index,
    }));

    startTransition(async () => {
      const res = await reorderServicesAction(payload);
      if (res.success) {
        success("Service order updated!");
        router.refresh();
      } else {
        toastError(res.error || "Reorder failed.");
      }
    });
  };

  return (
    <div className="space-y-6 font-sans text-gray-200">
      
      {/* Header and trigger */}
      <div className="flex justify-between items-center bg-[#0d1222] border border-white/5 p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="bg-[#748f6e]/15 p-2 rounded-xl text-accent">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white font-serif text-lg font-bold">Services Library ({initialServices.length})</h2>
            <p className="text-gray-400 text-xs mt-0.5">Control the custom offerings shown on the services listing and home page.</p>
          </div>
        </div>

        <Link
          href="/admin/services/new"
          className="flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-primary font-bold text-xs uppercase tracking-widest px-4.5 py-3 rounded-xl shadow-lg transition-colors select-none"
        >
          <Plus className="w-4.5 h-4.5 shrink-0" />
          <span>Add Service</span>
        </Link>
      </div>

      {/* Grid listing */}
      {initialServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialServices.map((service, idx) => (
            <div
              key={service.id}
              className={`bg-[#0d1222] border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-all ${
                service.isVisible ? "border-white/5 hover:border-white/10" : "border-red-950/20 opacity-75"
              }`}
            >
              {/* Card visual */}
              <div>
                <div className="relative h-44 w-full bg-primary/20 flex items-center justify-center overflow-hidden">
                  <img src={service.image} alt={service.title} className="object-cover w-full h-full" />
                  
                  {/* Status labels */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                      service.isVisible ? "bg-[#748f6e]/90 text-primary" : "bg-red-950/90 text-red-400 border border-red-900/30"
                    }`}>
                      {service.isVisible ? "Visible" : "Hidden"}
                    </span>
                  </div>

                  {/* Ordering arrows */}
                  <div className="absolute top-4 right-4 flex bg-[#0c101d]/85 rounded-xl border border-white/10 overflow-hidden backdrop-blur-md">
                    <button
                      onClick={() => handleMove(idx, "up")}
                      disabled={idx === 0}
                      className="p-2 hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, "down")}
                      disabled={idx === initialServices.length - 1}
                      className="p-2 border-l border-white/5 hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold text-accent tracking-wider uppercase">
                    slug: /{service.slug}
                  </span>
                  <h3 className="text-white font-serif text-lg font-bold">{service.title}</h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-6 py-4.5 border-t border-white/5 bg-[#0a0e1a]/40 flex justify-between items-center">
                <button
                  onClick={() => handleToggleVisibility(service)}
                  disabled={isPending}
                  className="p-2 rounded-xl text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  title={service.isVisible ? "Hide Service" : "Show Service"}
                >
                  {service.isVisible ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5 text-accent" />}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDuplicate(service.id, service.title)}
                    disabled={isPending}
                    className="flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 transition-colors cursor-pointer"
                    title="Duplicate Service"
                  >
                    <Copy className="w-4 h-4 text-accent" />
                  </button>

                  <Link
                    href={`/admin/services/${service.id}`}
                    className="flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit2 className="w-4 h-4 text-accent" />
                  </Link>

                  <button
                    onClick={() => handleDelete(service.id, service.title)}
                    disabled={isPending}
                    className="flex items-center gap-1 bg-red-950/20 hover:bg-red-950/30 border border-red-900/30 p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-400 transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0d1222] border border-white/5 p-16 rounded-3xl text-center text-gray-500 italic">
          No services defined yet. Click "Add Service" to create one.
        </div>
      )}

    </div>
  );
}
