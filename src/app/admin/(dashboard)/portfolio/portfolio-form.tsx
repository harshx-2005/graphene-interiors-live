"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { createPortfolioAction, updatePortfolioAction } from "@/actions/crud";
import { InputField, TextareaField, SwitchField, MediaPickerField } from "@/components/admin/form-inputs";
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

interface PortfolioFormProps {
  initialData?: ProjectItem;
}

const availableCategories = [
  { slug: "kitchens", name: "Kitchens" },
  { slug: "wardrobes", name: "Wardrobes" },
  { slug: "media-walls", name: "Media Walls" },
  { slug: "worktops", name: "Worktops" },
  { slug: "interiors", name: "Full Renovations" },
];

export default function PortfolioForm({ initialData }: PortfolioFormProps) {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  const isEdit = !!initialData;

  // Basic States
  const [projectName, setProjectName] = useState(initialData?.projectName || "");
  const [location, setLocation] = useState(initialData?.location || "Leicester");
  const [description, setDescription] = useState(initialData?.description || "");
  const [completionDate, setCompletionDate] = useState(initialData?.completionDate || "");
  const [isFeatured, setIsFeatured] = useState(initialData ? initialData.isFeatured : false);
  const [order, setOrder] = useState(initialData ? initialData.order : 0);
  const [details, setDetails] = useState(initialData?.details || "");

  // Categories checklist state
  const parseCategories = () => {
    try {
      return JSON.parse(initialData?.categoryJson || "[]") || [];
    } catch (e) {
      return [];
    }
  };
  const [categories, setCategories] = useState<string[]>(parseCategories());

  const handleCategoryToggle = (slug: string) => {
    if (categories.includes(slug)) {
      setCategories(categories.filter((c) => c !== slug));
    } else {
      setCategories([...categories, slug]);
    }
  };

  // Simple Single Image & Video State
  const getInitialImage = () => {
    try {
      const arr = JSON.parse(initialData?.afterImagesJson || "[]");
      return arr[0] || "";
    } catch(e) {
      return "";
    }
  };

  const getInitialVideo = () => {
    try {
      const arr = JSON.parse(initialData?.videosJson || "[]");
      return arr[0] || "";
    } catch(e) {
      return "";
    }
  };

  // Parse initial media type from videosJson string
  const parseMediaType = () => {
    try {
      const arr = JSON.parse(initialData?.videosJson || "[]");
      if (Array.isArray(arr) && arr[1]) {
        return arr[1]; // "image" or "video"
      }
    } catch (e) {}
    return initialData?.videosJson && initialData.videosJson !== "[]" ? "video" : "image";
  };

  const [mediaType, setMediaType] = useState<string>(parseMediaType());
  const [projectImage, setProjectImage] = useState<string>(getInitialImage());
  const [projectVideo, setProjectVideo] = useState<string>(getInitialVideo());

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (categories.length === 0) {
      toastError("Please select at least one category.");
      return;
    }

    const payload = {
      projectName,
      categoryJson: JSON.stringify(categories),
      location,
      description,
      beforeImagesJson: JSON.stringify([]),
      afterImagesJson: JSON.stringify(projectImage ? [projectImage] : ["/images/projects/modern_kitchen_beige.jpg"]),
      videosJson: JSON.stringify(projectVideo ? [projectVideo, mediaType] : []),
      completionDate,
      isFeatured,
      order: Number(order),
      details,
    };

    startTransition(async () => {
      let res;
      if (isEdit && initialData) {
        res = await updatePortfolioAction(initialData.id, payload);
      } else {
        res = await createPortfolioAction(payload);
      }

      if (res.success) {
        success(isEdit ? "Project saved successfully!" : "Project created successfully!");
        router.push("/admin/portfolio");
        router.refresh();
      } else {
        toastError(res.error || "Failed to save project.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans max-w-4xl text-gray-200">
      
      {/* Top Action bar */}
      <div className="flex items-center justify-between bg-[#0d1222] border border-white/5 p-4 rounded-2xl">
        <button
          type="button"
          onClick={() => router.push("/admin/portfolio")}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>
        
        <h2 className="text-white font-serif text-base font-bold">
          {isEdit ? `Edit: ${initialData.projectName}` : "Add New Installation"}
        </h2>
      </div>

      {/* Core Project values */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Project Details</h3>

        <InputField
          label="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
          placeholder="e.g. Premium Gloss Beige Kitchen"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Location (City / Area)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="e.g. Leicester"
          />
          <InputField
            label="Completion Date (YYYY-MM or Text)"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
            required
            placeholder="e.g. 2024-05"
          />
        </div>

        <TextareaField
          label="Description Text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Leicester high-gloss kitchen with a massive waterfall quartz island..."
        />

        <InputField
          label="Material Details (Comma-separated specifications)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
          placeholder="e.g. Quartz cladding, integrated Gas stove, ambient LED lighting"
        />

        {/* Categories Selector checkboxes */}
        <div className="space-y-3 pt-2">
          <label className="text-gray-300 text-xs font-bold uppercase tracking-wider block">
            Project Categories (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2.5">
            {availableCategories.map((cat) => {
              const selected = categories.includes(cat.slug);
              return (
                <button
                  type="button"
                  key={cat.slug}
                  onClick={() => handleCategoryToggle(cat.slug)}
                  className={`px-4.5 py-2.5 rounded-xl border text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
                    selected
                      ? "bg-accent/15 border-accent text-accent"
                      : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Media Selection */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Project Media</h3>
        
        <div className="space-y-4">
          <label className="text-gray-300 text-xs font-bold uppercase tracking-wider block">
            Showcase Media Source Type
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setMediaType("image")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                mediaType === "image"
                  ? "bg-accent/15 border-accent text-accent"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <i className="fa-regular fa-image text-sm"></i>
              <span>Showcase Image</span>
            </button>
            <button
              type="button"
              onClick={() => setMediaType("video")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                mediaType === "video"
                  ? "bg-accent/15 border-accent text-accent"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <i className="fa-regular fa-circle-play text-sm"></i>
              <span>Showcase Video</span>
            </button>
          </div>

          <div className="pt-2">
            {mediaType === "image" ? (
              <MediaPickerField
                label="Project Showcase Image"
                value={projectImage}
                onChange={setProjectImage}
                fileType="IMAGE"
                category="portfolio"
              />
            ) : (
              <MediaPickerField
                label="Project Showcase Video (Optional)"
                value={projectVideo}
                onChange={setProjectVideo}
                fileType="VIDEO"
                category="portfolio"
              />
            )}
          </div>
        </div>
      </div>

      {/* Visibility, SEO and Order Settings */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Display Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SwitchField
            label="Feature on Homepage slider"
            checked={isFeatured}
            onChange={setIsFeatured}
          />
          <InputField
            label="Sorting Weight Order"
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            required
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl transition-all disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Project...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEdit ? "Save Project Changes" : "Create Project"}</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}
