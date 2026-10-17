import React from "react";
import { db } from "@/lib/db";
import SeoForm from "./seo-form";

export const revalidate = 0; // Disable server cache for editing forms

export default async function AdminSeoEdit() {
  const content = await db.seoSettings.findFirst();

  if (!content) {
    return (
      <div className="bg-[#0d1222] p-8 rounded-3xl border border-white/5 text-center text-gray-400 font-sans">
        SEO content record not found. Please run the database seeder commands to initialize content.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Search Engine Optimization (SEO)</h1>
        <p className="text-gray-400 text-xs mt-1">
          Modify your global search meta tags, keywords list, sharing visuals, custom schema coordinates, and robots.txt file.
        </p>
      </div>
      <SeoForm key={JSON.stringify(content)} initialData={content} />
    </div>
  );
}
