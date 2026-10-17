import React from "react";
import { db } from "@/lib/db";
import GalleryManager from "./gallery-manager";

export const revalidate = 0; // Disable server cache for operations

export default async function AdminGalleryPage() {
  const items = await db.galleryItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Gallery Showcase Manager</h1>
        <p className="text-gray-400 text-xs mt-1">
          Link media files into your website's portfolio categories and order gallery content displays.
        </p>
      </div>
      <GalleryManager initialItems={items} />
    </div>
  );
}
