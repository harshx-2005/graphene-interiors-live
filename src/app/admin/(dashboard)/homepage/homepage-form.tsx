"use client";

import React, { useState, useTransition } from "react";
import { Plus, Trash2, Save, Loader2, Play, Image } from "lucide-react";
import { updateHomepageAction } from "@/actions/content";
import { InputField, TextareaField, MediaPickerField } from "@/components/admin/form-inputs";
import { useToast } from "@/components/providers";

interface HomepageFormProps {
  initialData: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroBackgroundType: string;
    heroBackgroundImage: string;
    heroBackgroundVideo: string;
    statsJson: string;
    featuresJson: string;
    ctaTitle: string;
    ctaDescription: string;
  };
}

export default function HomepageForm({ initialData }: HomepageFormProps) {
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  // Basic hero fields
  const [heroTitle, setHeroTitle] = useState(initialData.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(initialData.heroSubtitle);
  const [heroDescription, setHeroDescription] = useState(initialData.heroDescription);
  const [heroBackgroundType, setHeroBackgroundType] = useState(initialData.heroBackgroundType);
  const parseSlides = () => {
    try {
      if (initialData.heroBackgroundImage && initialData.heroBackgroundImage.startsWith("[")) {
        const arr = JSON.parse(initialData.heroBackgroundImage);
        if (Array.isArray(arr)) return arr;
      }
    } catch (e) {}
    return [initialData.heroBackgroundImage || "", "", "", "", ""];
  };
  const initialSlides = parseSlides();
  const [slide1, setSlide1] = useState(initialSlides[0] || "");
  const [slide2, setSlide2] = useState(initialSlides[1] || "");
  const [slide3, setSlide3] = useState(initialSlides[2] || "");
  const [slide4, setSlide4] = useState(initialSlides[3] || "");
  const [slide5, setSlide5] = useState(initialSlides[4] || "");
  const [heroBackgroundVideo, setHeroBackgroundVideo] = useState(initialData.heroBackgroundVideo);
  
  // CTA fields
  const [ctaTitle, setCtaTitle] = useState(initialData.ctaTitle);
  const [ctaDescription, setCtaDescription] = useState(initialData.ctaDescription);

  // Stats JSON parser and editor state
  const parseStats = () => {
    try {
      return JSON.parse(initialData.statsJson) || [];
    } catch (e) {
      return [];
    }
  };
  const [stats, setStats] = useState<any[]>(parseStats());

  // Features JSON parser and editor state
  const parseFeatures = () => {
    try {
      return JSON.parse(initialData.featuresJson) || [];
    } catch (e) {
      return [];
    }
  };
  const [features, setFeatures] = useState<any[]>(parseFeatures());

  // Stats operations
  const handleAddStat = () => {
    setStats([...stats, { value: "New", label: "Stat Label" }]);
  };
  const handleUpdateStat = (idx: number, key: string, val: string) => {
    const next = [...stats];
    next[idx][key] = val;
    setStats(next);
  };
  const handleRemoveStat = (idx: number) => {
    setStats(stats.filter((_, i) => i !== idx));
  };

  // Features operations
  const handleAddFeature = () => {
    setFeatures([...features, { title: "New Feature", desc: "Short description of this feature." }]);
  };
  const handleUpdateFeature = (idx: number, key: string, val: string) => {
    const next = [...features];
    next[idx][key] = val;
    setFeatures(next);
  };
  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (heroBackgroundType === "image") {
      if (!slide1) {
        toastError("Please select at least one background image (Slot 1).");
        return;
      }
      const slideCount = [slide1, slide2, slide3, slide4, slide5].filter(Boolean).length;
      if (slideCount === 2) {
        toastError("Slideshow requires at least 3 images. Please configure a 3rd image or leave only Slot 1 filled for a static background.");
        return;
      }
    }

    const slideUrls = [slide1, slide2, slide3, slide4, slide5].filter(Boolean);

    const formData = new FormData();
    formData.append("heroTitle", heroTitle);
    formData.append("heroSubtitle", heroSubtitle);
    formData.append("heroDescription", heroDescription);
    formData.append("heroBackgroundType", heroBackgroundType);
    formData.append("heroBackgroundImage", JSON.stringify(slideUrls));
    formData.append("heroBackgroundVideo", heroBackgroundVideo);
    formData.append("ctaTitle", ctaTitle);
    formData.append("ctaDescription", ctaDescription);
    formData.append("statsJson", JSON.stringify(stats));
    formData.append("featuresJson", JSON.stringify(features));

    startTransition(async () => {
      const res = await updateHomepageAction(formData);
      if (res.success) {
        success("Homepage content saved successfully!");
      } else {
        toastError(res.error || "Failed to save content.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans max-w-4xl text-gray-200">
      
      {/* 1. Hero Configuration */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold flex items-center gap-2">
          <span>Hero Banner Block</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Hero Subtitle / Tagline"
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            required
          />
          <InputField
            label="Hero Title"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            required
          />
        </div>

        <TextareaField
          label="Hero Description Text"
          value={heroDescription}
          onChange={(e) => setHeroDescription(e.target.value)}
          required
        />

        {/* Media Background Selector */}
        <div className="space-y-4">
          <label className="text-gray-300 text-xs font-bold uppercase tracking-wider block">
            Background Media Source Type
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setHeroBackgroundType("image")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                heroBackgroundType === "image"
                  ? "bg-accent/15 border-accent text-accent"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <Image className="w-4 h-4 shrink-0" />
              <span>Image Slides / Single Image</span>
            </button>
            <button
              type="button"
              onClick={() => setHeroBackgroundType("video")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                heroBackgroundType === "video"
                  ? "bg-accent/15 border-accent text-accent"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <Play className="w-4 h-4 shrink-0" />
              <span>Looping Video background</span>
            </button>
          </div>

          {heroBackgroundType === "image" ? (
            <div className="space-y-6 pt-2">
              <span className="text-xs text-gray-400 font-light block">
                Select between 3 and 5 images for the homepage slideshow. Slots 1, 2, and 3 are required.
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MediaPickerField
                  label="Slideshow Slot 1 (Required)"
                  value={slide1}
                  onChange={setSlide1}
                  fileType="IMAGE"
                  category="homepage"
                />
                <MediaPickerField
                  label="Slideshow Slot 2 (Required)"
                  value={slide2}
                  onChange={setSlide2}
                  fileType="IMAGE"
                  category="homepage"
                />
                <MediaPickerField
                  label="Slideshow Slot 3 (Required)"
                  value={slide3}
                  onChange={setSlide3}
                  fileType="IMAGE"
                  category="homepage"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-4">
                <MediaPickerField
                  label="Slideshow Slot 4 (Optional)"
                  value={slide4}
                  onChange={setSlide4}
                  fileType="IMAGE"
                  category="homepage"
                />
                <MediaPickerField
                  label="Slideshow Slot 5 (Optional)"
                  value={slide5}
                  onChange={setSlide5}
                  fileType="IMAGE"
                  category="homepage"
                />
              </div>
            </div>
          ) : (
            <div className="pt-2">
              <MediaPickerField
                label="Hero Background Video URL"
                value={heroBackgroundVideo}
                onChange={setHeroBackgroundVideo}
                fileType="VIDEO"
                category="homepage"
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. Key Statistics Section */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-serif text-lg font-bold">Key Trust Statistics</h3>
          <button
            type="button"
            onClick={handleAddStat}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-accent"
          >
            <Plus className="w-4 h-4" />
            <span>Add Stat Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#090c16] border border-white/5 p-4.5 rounded-2xl relative space-y-3">
              <button
                type="button"
                onClick={() => handleRemoveStat(idx)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-400 p-1 transition-colors"
                title="Remove Stat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <InputField
                label="Stat Value (e.g. 10+, Level 2)"
                value={stat.value}
                onChange={(e) => handleUpdateStat(idx, "value", e.target.value)}
                required
              />
              <InputField
                label="Stat Label Text"
                value={stat.label}
                onChange={(e) => handleUpdateStat(idx, "label", e.target.value)}
                required
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Features / Checklist Section */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-serif text-lg font-bold">Checklist Features</h3>
          <button
            type="button"
            onClick={handleAddFeature}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-accent"
          >
            <Plus className="w-4 h-4" />
            <span>Add Feature</span>
          </button>
        </div>

        <div className="space-y-4">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-[#090c16] border border-white/5 p-5 rounded-2xl relative grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <button
                type="button"
                onClick={() => handleRemoveFeature(idx)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-400 p-1 transition-colors"
                title="Remove Feature"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="md:col-span-1">
                <InputField
                  label="Feature Title"
                  value={feature.title}
                  onChange={(e) => handleUpdateFeature(idx, "title", e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2 pr-6">
                <InputField
                  label="Short Description"
                  value={feature.desc}
                  onChange={(e) => handleUpdateFeature(idx, "desc", e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom CTA Section */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Bottom Call-To-Action (CTA)</h3>
        
        <InputField
          label="CTA Heading Title"
          value={ctaTitle}
          onChange={(e) => setCtaTitle(e.target.value)}
          required
        />
        <TextareaField
          label="CTA Description Description"
          value={ctaDescription}
          onChange={(e) => setCtaDescription(e.target.value)}
          required
        />
      </div>

      {/* Action Footer */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl transition-all disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Homepage Changes</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}
