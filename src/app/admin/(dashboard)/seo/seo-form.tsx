"use client";

import React, { useState, useTransition } from "react";
import { Save, Loader2, Globe } from "lucide-react";
import { updateSeoAction } from "@/actions/content";
import { InputField, TextareaField, MediaPickerField } from "@/components/admin/form-inputs";
import { useToast } from "@/components/providers";

interface SeoFormProps {
  initialData: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage: string;
    robots: string;
    schemaJsonLd: string;
    sitemap: string | null;
    robotsTxt: string | null;
  };
}

export default function SeoForm({ initialData }: SeoFormProps) {
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  // Basic Fields
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [keywords, setKeywords] = useState(initialData.keywords);
  const [canonical, setCanonical] = useState(initialData.canonical);
  const [ogImage, setOgImage] = useState(initialData.ogImage);
  const [robots, setRobots] = useState(initialData.robots);
  const [schemaJsonLd, setSchemaJsonLd] = useState(initialData.schemaJsonLd);
  const [sitemap, setSitemap] = useState(initialData.sitemap || "");
  const [robotsTxt, setRobotsTxt] = useState(initialData.robotsTxt || "");

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("keywords", keywords);
    formData.append("canonical", canonical);
    formData.append("ogImage", ogImage);
    formData.append("robots", robots);
    formData.append("schemaJsonLd", schemaJsonLd);
    formData.append("sitemap", sitemap);
    formData.append("robotsTxt", robotsTxt);

    startTransition(async () => {
      const res = await updateSeoAction(formData);
      if (res.success) {
        success("SEO Configurations saved successfully!");
      } else {
        toastError(res.error || "Failed to save details.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans max-w-4xl text-gray-200">
      
      {/* 1. Global Meta Tags */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold flex items-center gap-2">
          <Globe className="w-5 h-5 text-accent" />
          <span>Global Search Meta Configurations</span>
        </h3>

        <InputField
          label="Meta Title (Tag)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <TextareaField
          label="Meta Description tag (Snippet)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <InputField
          label="Meta Keywords (Comma-separated entries)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Canonical Base URL"
            value={canonical}
            onChange={(e) => setCanonical(e.target.value)}
            required
          />
          <InputField
            label="Robots Index Tag rules"
            value={robots}
            onChange={(e) => setRobots(e.target.value)}
            required
            placeholder="index, follow"
          />
        </div>
      </div>

      {/* 2. Open Graph Visuals */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">OpenGraph Share Visuals</h3>
        
        <MediaPickerField
          label="OG Image URL (Displays on social share cards)"
          value={ogImage}
          onChange={setOgImage}
          fileType="IMAGE"
          category="seo"
        />
      </div>

      {/* 3. Schema & Sitemap */}
      <div className="bg-[#0d1222] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
        <h3 className="text-white font-serif text-lg font-bold">Advanced Search Configuration</h3>
        
        <TextareaField
          label="Structured Data (Schema JSON-LD Markup)"
          value={schemaJsonLd}
          onChange={(e) => setSchemaJsonLd(e.target.value)}
          placeholder='{"@context": "https://schema.org", ...}'
          rows={8}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <TextareaField
            label="Robots.txt Content Override"
            value={robotsTxt}
            onChange={(e) => setRobotsTxt(e.target.value)}
            placeholder="User-agent: *..."
            rows={5}
          />
          <TextareaField
            label="Custom Sitemap XML Content Override (Optional)"
            value={sitemap}
            onChange={(e) => setSitemap(e.target.value)}
            placeholder="<urlset xmlns='...'>..."
            rows={5}
          />
        </div>
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
              <span>Save SEO Configurations</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}
