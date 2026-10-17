"use client";

import React, { useState, useTransition } from "react";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import { updateAboutAction } from "@/actions/content";
import { InputField, TextareaField, MediaPickerField } from "@/components/admin/form-inputs";
import { useToast } from "@/components/providers";

interface AboutFormProps {
  initialData: {
    heading: string;
    description: string;
    imagesJson: string;
    videosJson: string;
    achievementsJson: string;
    mission: string;
    vision: string;
  };
}

export default function AboutForm({ initialData }: AboutFormProps) {
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  // Basic fields
  const [heading, setHeading] = useState(initialData.heading);
  const [description, setDescription] = useState(initialData.description);
  const [mission, setMission] = useState(initialData.mission);
  const [vision, setVision] = useState(initialData.vision);

  // Parse achievements state
  const parseAchievements = () => {
    try {
      return JSON.parse(initialData.achievementsJson) || [];
    } catch (e) {
      return [];
    }
  };
  const [achievements, setAchievements] = useState<string[]>(parseAchievements());

  // Parse media images & videos
  const parseMedia = (json: string) => {
    try {
      const arr = JSON.parse(json) || [];
      return arr[0] || ""; // For simplicity, edit the primary image/video
    } catch (e) {
      return "";
    }
  };
  const [image, setImage] = useState(parseMedia(initialData.imagesJson));
  const [video, setVideo] = useState(parseMedia(initialData.videosJson));

  // Determine initial media type from videosJson
  const parseMediaType = () => {
    try {
      const arr = JSON.parse(initialData.videosJson);
      if (Array.isArray(arr) && arr[1]) {
        return arr[1]; // "image" or "video"
      }
    } catch(e) {}
    return "video"; // default
  };
  const [mediaType, setMediaType] = useState<string>(parseMediaType());

  // Achievements operations
  const handleAddAchievement = () => {
    setAchievements([...achievements, "New Certification / Skill"]);
  };

  const handleUpdateAchievement = (idx: number, val: string) => {
    const next = [...achievements];
    next[idx] = val;
    setAchievements(next);
  };

  const handleRemoveAchievement = (idx: number) => {
    setAchievements(achievements.filter((_, i) => i !== idx));
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("description", description);
    formData.append("mission", mission);
    formData.append("vision", vision);
    formData.append("imagesJson", JSON.stringify([image].filter(Boolean)));
    formData.append("videosJson", JSON.stringify([video, mediaType].filter(Boolean)));
    formData.append("achievementsJson", JSON.stringify(achievements.filter(Boolean)));

    startTransition(async () => {
      const res = await updateAboutAction(formData);
      if (res.success) {
        success("About Us content saved successfully!");
      } else {
        toastError(res.error || "Failed to save content.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans max-w-4xl text-gray-200">
      
      {/* About Main Details */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Main Story Header</h3>
        
        <InputField
          label="Main Heading Title"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
        />
        <TextareaField
          label="Company Story Description Text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Media Configuration */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">About Media Showcase</h3>
        
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
              <span>Looping Video</span>
            </button>
          </div>

          <div className="pt-2">
            {mediaType === "image" ? (
              <MediaPickerField
                label="Background / Showcase Image URL"
                value={image}
                onChange={setImage}
                fileType="IMAGE"
                category="about"
              />
            ) : (
              <MediaPickerField
                label="Looping Video URL"
                value={video}
                onChange={setVideo}
                fileType="VIDEO"
                category="about"
              />
            )}
          </div>
        </div>
      </div>

      {/* Mission & Vision statements */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Mission & Vision Statement</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextareaField
            label="Our Mission Statement"
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            required
          />
          <TextareaField
            label="Our Vision Statement"
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Achievements / Credentials List */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-serif text-lg font-bold">Achievements & Accreditations</h3>
          <button
            type="button"
            onClick={handleAddAchievement}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-accent"
          >
            <Plus className="w-4 h-4" />
            <span>Add Accreditation</span>
          </button>
        </div>

        <div className="space-y-3">
          {achievements.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-center bg-[#090c16] border border-white/5 px-4 py-2.5 rounded-xl">
              <div className="flex-grow">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleUpdateAchievement(idx, e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none border-b border-transparent focus:border-accent pb-0.5"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveAchievement(idx)}
                className="text-gray-500 hover:text-red-400 p-1 transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
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
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save About Page Changes</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}
