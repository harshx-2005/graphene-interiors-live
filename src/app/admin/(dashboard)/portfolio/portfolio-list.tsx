"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Star, ArrowUp, ArrowDown, FolderHeart, MapPin, Calendar } from "lucide-react";
import { deletePortfolioAction, updatePortfolioAction, reorderPortfolioAction } from "@/actions/crud";
import { useToast } from "@/components/providers";

interface ProjectItem {
  id: number;
  projectName: string;
  categoryJson: string;
  location: string;
  description: string;
  beforeImagesJson: string;
  afterImagesJson: string;
  videosJson: string;
  completionDate: string;
  isFeatured: boolean;
  order: number;
  details: string;
}

interface PortfolioListProps {
  initialProjects: ProjectItem[];
}

export default function PortfolioList({ initialProjects }: PortfolioListProps) {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  // Parse categories for card display
  const getCategories = (json: string): string[] => {
    try {
      return JSON.parse(json) || [];
    } catch (e) {
      return [];
    }
  };

  // Parse primary thumbnail
  const getThumbnail = (p: ProjectItem): string => {
    try {
      const after = JSON.parse(p.afterImagesJson) || [];
      if (after.length > 0) return after[0];
      const before = JSON.parse(p.beforeImagesJson) || [];
      if (before.length > 0) return before[0];
    } catch (e) {}
    return "/images/projects/modern_kitchen_beige.jpg"; // fallback default
  };

  // Delete Action
  const handleDelete = (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    startTransition(async () => {
      const res = await deletePortfolioAction(id);
      if (res.success) {
        success(`Deleted "${title}"`);
        router.refresh();
      } else {
        toastError(res.error || "Failed to delete.");
      }
    });
  };

  // Toggle Featured status
  const handleToggleFeatured = (project: ProjectItem) => {
    startTransition(async () => {
      const res = await updatePortfolioAction(project.id, {
        projectName: project.projectName,
        categoryJson: project.categoryJson,
        location: project.location,
        description: project.description,
        beforeImagesJson: project.beforeImagesJson,
        afterImagesJson: project.afterImagesJson,
        videosJson: project.videosJson,
        completionDate: project.completionDate,
        isFeatured: !project.isFeatured,
        order: project.order,
        details: project.details,
      });

      if (res.success) {
        success(`${project.projectName} is ${!project.isFeatured ? "now featured" : "no longer featured"}`);
        router.refresh();
      } else {
        toastError(res.error || "Failed to update project.");
      }
    });
  };

  // Reorder Actions
  const handleMove = (idx: number, direction: "up" | "down") => {
    const nextIdx = direction === "up" ? idx - 1 : idx + 1;
    if (nextIdx < 0 || nextIdx >= initialProjects.length) return;

    const items = [...initialProjects];
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
      const res = await reorderPortfolioAction(payload);
      if (res.success) {
        success("Portfolio order updated!");
        router.refresh();
      } else {
        toastError(res.error || "Reorder failed.");
      }
    });
  };

  return (
    <div className="space-y-6 font-sans text-gray-200">
      
      {/* Header card */}
      <div className="flex justify-between items-center bg-[#0d1222] border border-white/5 p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="bg-[#748f6e]/15 p-2 rounded-xl text-accent">
            <FolderHeart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white font-serif text-lg font-bold">Portfolio Showcase ({initialProjects.length})</h2>
            <p className="text-gray-400 text-xs mt-0.5">Edit locations, before/after images, and project details shown in the portfolio grid.</p>
          </div>
        </div>

        <Link
          href="/admin/portfolio/new"
          className="flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-primary font-bold text-xs uppercase tracking-widest px-4.5 py-3 rounded-xl shadow-lg transition-colors select-none"
        >
          <Plus className="w-4.5 h-4.5 shrink-0" />
          <span>Add Project</span>
        </Link>
      </div>

      {/* Grid listing */}
      {initialProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialProjects.map((project, idx) => {
            const categories = getCategories(project.categoryJson);
            const thumb = getThumbnail(project);
            return (
              <div
                key={project.id}
                className="bg-[#0d1222] border border-white/5 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-white/10 transition-all"
              >
                <div>
                  {/* Photo Overlay */}
                  <div className="relative h-48 w-full bg-primary/20 flex items-center justify-center overflow-hidden">
                    <img src={thumb} alt={project.projectName} className="object-cover w-full h-full" />
                    
                    {/* Featured star */}
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(project)}
                      className={`absolute top-4 left-4 p-2 rounded-xl border backdrop-blur-md transition-colors cursor-pointer ${
                        project.isFeatured
                          ? "bg-accent/80 border-accent text-primary"
                          : "bg-black/60 border-white/10 text-gray-400 hover:text-white"
                      }`}
                      title={project.isFeatured ? "Unfeature Project" : "Feature Project"}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>

                    {/* Sorting controls */}
                    <div className="absolute top-4 right-4 flex bg-[#0c101d]/85 rounded-xl border border-white/10 overflow-hidden backdrop-blur-md">
                      <button
                        onClick={() => handleMove(idx, "up")}
                        disabled={idx === 0}
                        className="p-2 hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMove(idx, "down")}
                        disabled={idx === initialProjects.length - 1}
                        className="p-2 border-l border-white/5 hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Details metadata */}
                  <div className="p-6 space-y-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((c) => (
                        <span key={c} className="bg-white/5 text-gray-400 border border-white/5 px-2.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">
                          {c}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-white font-serif text-base font-bold leading-snug">{project.projectName}</h3>
                    
                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-light">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        <span>{project.location}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span>{project.completionDate}</span>
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2 pt-1 border-t border-white/5">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Card actions */}
                <div className="px-6 py-4.5 border-t border-white/5 bg-[#0a0e1a]/40 flex justify-end gap-2">
                  <Link
                    href={`/admin/portfolio/${project.id}`}
                    className="flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 transition-colors cursor-pointer"
                    title="Edit Project"
                  >
                    <Edit2 className="w-4 h-4 text-accent" />
                  </Link>

                  <button
                    onClick={() => handleDelete(project.id, project.projectName)}
                    disabled={isPending}
                    className="flex items-center gap-1 bg-red-950/20 hover:bg-red-950/30 border border-red-900/30 p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-400 transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#0d1222] border border-white/5 p-16 rounded-3xl text-center text-gray-500 italic">
          No projects configured yet. Click "Add Project" to showcase one.
        </div>
      )}

    </div>
  );
}
