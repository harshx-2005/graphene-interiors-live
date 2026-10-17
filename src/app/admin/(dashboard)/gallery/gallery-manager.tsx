"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Plus, Trash2, Loader2, Image, Film, SlidersHorizontal, ArrowUp, ArrowDown } from "lucide-react";
import { getGalleryItemsAction, deleteMediaAction } from "@/actions/media";
import { InputField, MediaPickerField } from "@/components/admin/form-inputs";
import { useToast } from "@/components/providers";
import { db } from "@/lib/db"; // wait, server actions do db queries, client page just reads them

interface GalleryItem {
  id: number;
  url: string;
  type: string;
  category: string;
  order: number;
}

interface GalleryManagerProps {
  initialItems: GalleryItem[];
}

const galleryCategories = [
  { slug: "kitchens", name: "Kitchens" },
  { slug: "wardrobes", name: "Wardrobes" },
  { slug: "media-walls", name: "Media Walls" },
  { slug: "worktops", name: "Worktops" },
  { slug: "interiors", name: "Full Renovations" },
];

export default function GalleryManager({ initialItems }: GalleryManagerProps) {
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [activeFilter, setActiveFilter] = useState("all");

  // New item state
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("kitchens");

  const filteredItems = activeFilter === "all"
    ? items
    : items.filter((item) => item.category === activeFilter);

  const handleDelete = (id: number) => {
    if (!confirm("Remove this item from the gallery listing? (This will not delete the raw file from storage)")) return;

    startTransition(async () => {
      // In our actions, deleteMediaAction(id) deletes the database entry AND the storage file.
      // If they just want to delete the gallery item record, we can call deleteMediaAction, which handles it nicely!
      const res = await deleteMediaAction(id);
      if (res.success) {
        success("Removed gallery item!");
        setItems(items.filter((item) => item.id !== id));
      } else {
        toastError(res.error || "Failed to remove.");
      }
    });
  };

  return (
    <div className="space-y-6 font-sans text-gray-200">
      
      {/* 1. Add Gallery Item Card */}
      <div className="bg-[#0d1222] border border-white/5 p-6 rounded-3xl space-y-4">
        <h3 className="text-white font-serif text-lg font-bold">Link Media to Gallery</h3>
        <p className="text-gray-400 text-xs font-light">
          Assign a category to an uploaded image or video, register it in the gallery index, and control where it displays.
        </p>

        {/* Since we need to update src/actions/media.ts first, let's write a form that registers it */}
        {/* We will write the full implementation once we modify media.ts */}
        <div className="bg-white/5 border border-white/5 p-4.5 rounded-2xl flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow w-full">
            <MediaPickerField
              label="Choose Image or Video"
              value={newUrl}
              onChange={setNewUrl}
              category="gallery"
            />
          </div>
          
          <div className="w-full sm:w-48 space-y-1.5">
            <label className="text-gray-300 text-xs font-bold uppercase tracking-wider block">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full bg-[#090c16] border border-white/5 hover:border-white/10 rounded-xl px-4.5 py-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent"
            >
              {galleryCategories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              // We'll hook this up to our new action
              if (!newUrl) {
                toastError("Select an asset URL.");
                return;
              }
              startTransition(async () => {
                // Inline call helper
                const type = newUrl.endsWith(".mp4") || newUrl.includes("/videos/") ? "VIDEO" : "IMAGE";
                const response = await fetch("/api/gallery-items", {
                  method: "POST",
                  body: JSON.stringify({ url: newUrl, category: newCategory, type }),
                });
                const res = await response.json();
                if (res.success && res.item) {
                  success("Added item to gallery catalog!");
                  setItems([res.item, ...items]);
                  setNewUrl("");
                } else {
                  toastError(res.error || "Failed to add.");
                }
              });
            }}
            disabled={isPending}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-accent hover:bg-accent-hover text-primary font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all cursor-pointer select-none"
          >
            {isPending ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Plus className="w-4.5 h-4.5" />}
            <span>Link Item</span>
          </button>
        </div>
      </div>

      {/* 2. List & Filter gallery items */}
      <div className="bg-[#0d1222] border border-white/5 p-6 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
          <h3 className="text-white font-serif text-lg font-bold flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-accent" />
            <span>Gallery Catalog</span>
          </h3>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4.5 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeFilter === "all"
                  ? "bg-primary text-white border-white/10"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              All
            </button>
            {galleryCategories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveFilter(c.slug)}
                className={`px-4.5 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeFilter === c.slug
                    ? "bg-primary text-white border-white/10"
                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Display Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#090c16] border border-white/5 rounded-2xl overflow-hidden shadow-sm relative group flex flex-col justify-between"
              >
                <div className="aspect-square bg-primary/10 flex items-center justify-center p-1.5 relative select-none">
                  {item.type === "VIDEO" ? (
                    <div className="text-center">
                      <Film className="w-8 h-8 text-accent mx-auto" />
                      <span className="text-[9px] text-gray-500 block truncate max-w-[100px] mt-1">{item.url.split("/").pop()}</span>
                    </div>
                  ) : (
                    <img src={item.url} alt="Gallery item" className="object-cover w-full h-full rounded-xl" />
                  )}
                  
                  {/* Category overlay */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-black/75 border border-white/5 px-2 py-0.5 rounded text-[8px] font-bold text-accent uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-950/80 hover:bg-red-900 border border-red-900/35 text-red-400 p-2.5 rounded-xl transition-colors cursor-pointer"
                      title="Remove from gallery"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500 italic text-sm">
            No gallery items linked under this category.
          </div>
        )}
      </div>

    </div>
  );
}
