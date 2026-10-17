import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import HomepageForm from "./homepage-form";

export const revalidate = 0; // Disable server cache for editing forms

export default async function AdminHomepageEdit() {
  const content = await db.homepageContent.findFirst();

  if (!content) {
    // Fallback if seeder hasn't run yet
    return (
      <div className="bg-[#0d1222] p-8 rounded-3xl border border-white/5 text-center text-gray-400 font-sans">
        Homepage content record not found. Please run the database seeder commands to initialize content.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Homepage Content Editor</h1>
        <p className="text-gray-400 text-xs mt-1">
          Modify the sliders, hero descriptions, checklist features, and statistics displayed on the homepage.
        </p>
      </div>
      <HomepageForm key={JSON.stringify(content)} initialData={content} />
    </div>
  );
}
