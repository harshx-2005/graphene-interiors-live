import React from "react";
import MediaManager from "./media-manager";

export default function AdminMediaPage() {
  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Media Storage Library</h1>
        <p className="text-gray-400 text-xs mt-1">
          Upload and organize assets in your Cloudinary repository. Copy URLs to paste into other page content editors.
        </p>
      </div>
      <MediaManager />
    </div>
  );
}
