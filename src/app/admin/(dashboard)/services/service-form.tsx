"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft, Plus, Trash2, HelpCircle } from "lucide-react";
import { createServiceAction, updateServiceAction } from "@/actions/crud";
import { InputField, TextareaField, SwitchField, MediaPickerField } from "@/components/admin/form-inputs";
import { useToast } from "@/components/providers";

interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  headline: string;
  description: string;
  shortDescription: string;
  image: string;
  galleryJson: string;
  video: string | null;
  bulletsJson: string;
  benefitsJson: string;
  seoTitle: string;
  seoDescription: string;
  isVisible: boolean;
  order: number;
}

interface ServiceFormProps {
  initialData?: ServiceItem;
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  const isEdit = !!initialData;

  // Basic States
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [headline, setHeadline] = useState(initialData?.headline || "");
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [image, setImage] = useState(initialData?.image || "");
  
  // Parse initial media type from video string
  const parseMediaType = () => {
    try {
      if (initialData?.video && initialData.video.startsWith("[")) {
        const arr = JSON.parse(initialData.video);
        return arr[1] || "video";
      }
    } catch (e) {}
    return initialData?.video ? "video" : "image";
  };

  const parseCleanVideo = () => {
    try {
      if (initialData?.video && initialData.video.startsWith("[")) {
        const arr = JSON.parse(initialData.video);
        return arr[0] || "";
      }
    } catch (e) {}
    return initialData?.video || "";
  };

  const [mediaType, setMediaType] = useState<string>(parseMediaType());
  const [video, setVideo] = useState(parseCleanVideo());
  
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");
  const [isVisible, setIsVisible] = useState(initialData ? initialData.isVisible : true);
  const [order, setOrder] = useState(initialData ? initialData.order : 0);

  // Auto-generate slug from title (only if not editing)
  useEffect(() => {
    if (!isEdit && title) {
      const clean = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setSlug(clean);
    }
  }, [title, isEdit]);

  // Bullets State
  const parseBullets = () => {
    try {
      return JSON.parse(initialData?.bulletsJson || "[]") || [];
    } catch (e) {
      return [];
    }
  };
  const [bullets, setBullets] = useState<string[]>(parseBullets());

  // Benefits State
  const parseBenefits = () => {
    try {
      return JSON.parse(initialData?.benefitsJson || "[]") || [];
    } catch (e) {
      return [];
    }
  };
  const [benefits, setBenefits] = useState<string[]>(parseBenefits());

  // Gallery State (JSON array of strings)
  const parseGallery = () => {
    try {
      return JSON.parse(initialData?.galleryJson || "[]") || [];
    } catch (e) {
      return [];
    }
  };
  const [gallery, setGallery] = useState<string[]>(parseGallery());

  // Handlers for Bullets
  const handleAddBullet = () => setBullets([...bullets, ""]);
  const handleUpdateBullet = (idx: number, val: string) => {
    const next = [...bullets];
    next[idx] = val;
    setBullets(next);
  };
  const handleRemoveBullet = (idx: number) => setBullets(bullets.filter((_, i) => i !== idx));

  // Handlers for Benefits
  const handleAddBenefit = () => setBenefits([...benefits, ""]);
  const handleUpdateBenefit = (idx: number, val: string) => {
    const next = [...benefits];
    next[idx] = val;
    setBenefits(next);
  };
  const handleRemoveBenefit = (idx: number) => setBenefits(benefits.filter((_, i) => i !== idx));

  // Handlers for Gallery Images
  const handleAddGalleryImage = () => setGallery([...gallery, ""]);
  const handleUpdateGalleryImage = (idx: number, val: string) => {
    const next = [...gallery];
    next[idx] = val;
    setGallery(next);
  };
  const handleRemoveGalleryImage = (idx: number) => setGallery(gallery.filter((_, i) => i !== idx));

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!slug) {
      toastError("Slug is required.");
      return;
    }

    const payload = {
      title,
      slug,
      headline,
      shortDescription,
      description,
      image: image || "/images/projects/modern_kitchen_beige.jpg",
      galleryJson: JSON.stringify(gallery.filter(Boolean)),
      video: video ? JSON.stringify([video, mediaType]) : null,
      bulletsJson: JSON.stringify(bullets.filter(Boolean)),
      benefitsJson: JSON.stringify(benefits.filter(Boolean)),
      seoTitle,
      seoDescription,
      isVisible,
      order: Number(order),
    };

    startTransition(async () => {
      let res;
      if (isEdit && initialData) {
        res = await updateServiceAction(initialData.id, payload);
      } else {
        res = await createServiceAction(payload);
      }

      if (res.success) {
        success(isEdit ? "Service updated successfully!" : "Service created successfully!");
        router.push("/admin/services");
        router.refresh();
      } else {
        toastError(res.error || "Failed to save service.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans max-w-4xl text-gray-200">
      
      {/* Top action bar */}
      <div className="flex items-center justify-between bg-[#0d1222] border border-white/5 p-4 rounded-2xl">
        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Services</span>
        </button>
        
        <h2 className="text-white font-serif text-base font-bold">
          {isEdit ? `Edit: ${initialData.title}` : "Add New Service"}
        </h2>
      </div>

      {/* Basic configurations */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Core Service Properties</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Bespoke Wardrobes"
          />
          <InputField
            label="URL Slug (Customizable)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="e.g. bespoke-wardrobes"
          />
        </div>

        <InputField
          label="Headline Banner Text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          required
          placeholder="e.g. Custom Shaker, Modern Hinged & Silent Sliding Wardrobe Closets"
        />

        <TextareaField
          label="Short Description (Shown on grids)"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
          placeholder="Bespoke shaker wardrobes, modern hinged closets..."
        />

        <TextareaField
          label="Full Service Details (Markdown/HTML supported)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Maximize every square inch of your bedroom storage..."
        />
      </div>

      {/* Media Configuration */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Service Media Assets</h3>

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
                label="Featured Image (Grid & Showcase)"
                value={image}
                onChange={setImage}
                fileType="IMAGE"
                category="services"
              />
            ) : (
              <MediaPickerField
                label="Showcase Video (Auto-looping play)"
                value={video || ""}
                onChange={setVideo}
                fileType="VIDEO"
                category="services"
              />
            )}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-serif text-lg font-bold">Image Gallery</h3>
          <button
            type="button"
            onClick={handleAddGalleryImage}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-accent"
          >
            <Plus className="w-4 h-4" />
            <span>Add Gallery Image</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {gallery.map((imgUrl, idx) => (
            <div key={idx} className="bg-[#090c16] border border-white/5 p-4 rounded-2xl relative space-y-3">
              <button
                type="button"
                onClick={() => handleRemoveGalleryImage(idx)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-400 p-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <MediaPickerField
                label={`Gallery Image #${idx + 1}`}
                value={imgUrl}
                onChange={(val) => handleUpdateGalleryImage(idx, val)}
                fileType="IMAGE"
                category="services"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bullets & Benefits Grid lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Service Inclusions */}
        <div className="bg-[#0d1222] border border-white/5 p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-serif text-base font-bold">Inclusions Checklist</h3>
            <button
              type="button"
              onClick={handleAddBullet}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-accent"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Inclusion</span>
            </button>
          </div>

          <div className="space-y-3">
            {bullets.map((bullet, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-[#090c16] border border-white/5 px-3 py-2 rounded-xl">
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => handleUpdateBullet(idx, e.target.value)}
                  className="flex-grow bg-transparent text-xs text-white focus:outline-none border-b border-transparent focus:border-accent"
                  placeholder="e.g. City & Guilds level precision"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBullet(idx)}
                  className="text-gray-500 hover:text-red-400 p-1 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits checklists */}
        <div className="bg-[#0d1222] border border-white/5 p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-serif text-base font-bold">Key Benefits List</h3>
            <button
              type="button"
              onClick={handleAddBenefit}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-accent"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Benefit</span>
            </button>
          </div>

          <div className="space-y-3">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-[#090c16] border border-white/5 px-3 py-2 rounded-xl">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleUpdateBenefit(idx, e.target.value)}
                  className="flex-grow bg-transparent text-xs text-white focus:outline-none border-b border-transparent focus:border-accent"
                  placeholder="e.g. 5-Year installation warranty"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBenefit(idx)}
                  className="text-gray-500 hover:text-red-400 p-1 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Visibility, SEO and Order Settings */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Visibility & Search Optimization</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SwitchField
            label="Service Visibility Status"
            checked={isVisible}
            onChange={setIsVisible}
          />
          <InputField
            label="Sort Position Weight"
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
          <InputField
            label="Meta Title (SEO)"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="Search engine title tag"
          />
          <InputField
            label="Meta Description (SEO)"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="Search engine meta description snippet"
          />
        </div>
      </div>

      {/* Action Submit */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl transition-all disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Service...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEdit ? "Save Service Changes" : "Create Service"}</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}
