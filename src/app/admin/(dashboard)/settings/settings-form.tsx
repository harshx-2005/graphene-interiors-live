"use client";

import React, { useState, useTransition } from "react";
import { Save, Loader2, Settings } from "lucide-react";
import { updateSettingsAction } from "@/actions/content";
import { InputField, TextareaField, MediaPickerField } from "@/components/admin/form-inputs";
import { useToast } from "@/components/providers";

interface SettingsFormProps {
  initialData: {
    logoUrl: string;
    faviconUrl: string;
    footerCopyright: string;
    themeSettingsJson: string;
    analyticsId: string | null;
  };
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  // Basic Fields
  const [logoUrl, setLogoUrl] = useState(initialData.logoUrl);
  const [faviconUrl, setFaviconUrl] = useState(initialData.faviconUrl);
  const [footerCopyright, setFooterCopyright] = useState(initialData.footerCopyright);
  const [analyticsId, setAnalyticsId] = useState(initialData.analyticsId || "");

  // Theme settings state
  const parseTheme = () => {
    try {
      return JSON.parse(initialData.themeSettingsJson) || {};
    } catch (e) {
      return {};
    }
  };
  const [theme, setTheme] = useState<any>(parseTheme());

  const handleThemeChange = (key: string, val: any) => {
    setTheme({ ...theme, [key]: val });
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("logoUrl", logoUrl);
    formData.append("faviconUrl", faviconUrl);
    formData.append("footerCopyright", footerCopyright);
    formData.append("themeSettingsJson", JSON.stringify(theme));
    formData.append("analyticsId", analyticsId);

    startTransition(async () => {
      const res = await updateSettingsAction(formData);
      if (res.success) {
        success("Website settings updated successfully!");
      } else {
        toastError(res.error || "Failed to save settings.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans max-w-4xl text-gray-200">
      
      {/* 1. Logo and Branding */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold flex items-center gap-2">
          <Settings className="w-5 h-5 text-accent" />
          <span>Branding Assets</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediaPickerField
            label="Website Logo URL"
            value={logoUrl}
            onChange={setLogoUrl}
            fileType="IMAGE"
            category="branding"
          />
          <MediaPickerField
            label="Website Favicon Icon URL"
            value={faviconUrl}
            onChange={setFaviconUrl}
            fileType="IMAGE"
            category="branding"
          />
        </div>
      </div>

      {/* 2. Footer Copyright */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Footer Content</h3>
        
        <TextareaField
          label="Footer Copyright Statement"
          value={footerCopyright}
          onChange={(e) => setFooterCopyright(e.target.value)}
          required
        />
      </div>

      {/* 3. Analytics Config */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Google Analytics Configuration</h3>
        
        <InputField
          label="Google Tag Manager / Measurement ID"
          value={analyticsId}
          onChange={(e) => setAnalyticsId(e.target.value)}
          placeholder="e.g. G-XXXXXXX or UA-XXXXXXX-X"
        />
      </div>

      {/* 4. Theme details */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Base Brand Color Hexes</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <InputField
            label="Primary Color Hex"
            value={theme.primaryColor || "#111827"}
            onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
            required
          />
          <InputField
            label="Secondary Color Hex"
            value={theme.secondaryColor || "#F8F8F8"}
            onChange={(e) => handleThemeChange("secondaryColor", e.target.value)}
            required
          />
          <InputField
            label="Accent Highlight Color Hex"
            value={theme.accentColor || "#748f6e"}
            onChange={(e) => handleThemeChange("accentColor", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Submit Action */}
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
              <span>Save Website Settings</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}
