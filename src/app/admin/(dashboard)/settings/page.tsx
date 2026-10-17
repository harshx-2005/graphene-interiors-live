import React from "react";
import { db } from "@/lib/db";
import SettingsForm from "./settings-form";

export const revalidate = 0; // Disable server cache for editing forms

export default async function AdminSettingsEdit() {
  const content = await db.websiteSettings.findFirst();

  if (!content) {
    return (
      <div className="bg-[#0d1222] p-8 rounded-3xl border border-white/5 text-center text-gray-400 font-sans">
        Website settings record not found. Please run the database seeder commands to initialize content.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Website Configuration Settings</h1>
        <p className="text-gray-400 text-xs mt-1">
          Coordinate global branding assets, favicon images, Google Analytics tags, custom theme colors, and copyright signatures.
        </p>
      </div>
      <SettingsForm key={JSON.stringify(content)} initialData={content} />
    </div>
  );
}
