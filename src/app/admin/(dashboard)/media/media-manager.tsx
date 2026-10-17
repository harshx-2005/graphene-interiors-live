"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Upload, Search, X, Loader2, Copy, Check, FileText, Film, Eye } from "lucide-react";
import { getGalleryItemsAction, deleteMediaAction } from "@/actions/media";
import { uploadToGallery } from "@/lib/upload-client";
import { useToast } from "@/components/providers";

export default function MediaManager() {
  const { success, error: toastError } = useToast();
  const [isPending, startTransition] = useTransition();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Load items from DB
  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await getGalleryItemsAction("all", search);
      if (res.success) {
        setItems(res.items || []);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMedia();
  }, [search]);

  // Handle Drag & Drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = (file: File) => {

    startTransition(async () => {
      const res = await uploadToGallery(file, "media-library");
      if (res.success) {
        success(`Uploaded "${file.name}" successfully!`);
        loadMedia();
      } else {
        toastError(res.error || "Failed to upload file.");
      }
    });
  };

  // Delete Action
  const handleDelete = (id: number, url: string) => {
    if (!confirm("Are you sure you want to delete this media file? This will permanently remove it from storage and break any pages using this URL.")) return;

    startTransition(async () => {
      const res = await deleteMediaAction(id);
      if (res.success) {
        success("Media file deleted!");
        loadMedia();
      } else {
        toastError(res.error || "Failed to delete.");
      }
    });
  };

  // Copy Clipboard URL Action
  const handleCopyUrl = (id: number, url: string) => {
    // Resolve absolute URL if it is a local upload path
    const resolvedUrl = url.startsWith("/") ? `${window.location.origin}${url}` : url;
    
    navigator.clipboard.writeText(resolvedUrl);
    setCopiedId(id);
    success("Copied direct URL to clipboard!");
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 font-sans text-gray-200">
      
      {/* Search and stats bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0d1222] border border-white/5 p-6 rounded-3xl">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500 w-4 h-4 mt-[15px]" />
          <input
            type="text"
            placeholder="Search filenames..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#090c16] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent"
          />
        </div>

        <div className="text-gray-400 text-xs font-light">
          Total items in library: <span className="text-white font-bold">{items.length}</span>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all ${
          dragActive
            ? "border-accent bg-[#748f6e]/5"
            : "border-white/5 hover:border-white/10 bg-[#0d1222]"
        }`}
      >
        <Upload className={`w-10 h-10 mb-4 transition-transform ${isPending ? "animate-bounce text-accent" : "text-gray-500"}`} />
        
        {isPending ? (
          <p className="text-accent text-sm font-semibold animate-pulse">Uploading file to storage... Please wait.</p>
        ) : (
          <div className="space-y-1 text-center">
            <p className="text-white text-sm font-semibold">Drag & Drop media here, or browse files</p>
            <p className="text-gray-500 text-xs font-light">Supports Images (PNG, JPG, WebP) and Videos (MP4) up to 50MB</p>
          </div>
        )}

        <label className="mt-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-sans text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl cursor-pointer transition-colors select-none">
          Browse Files
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileInput}
            disabled={isPending}
          />
        </label>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#0d1222] border border-white/5 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-white/10 transition-all aspect-square relative"
            >
              {/* Thumbnail representation */}
              <div className="relative w-full h-full bg-primary/20 flex items-center justify-center overflow-hidden p-1.5 select-none">
                {item.type === "VIDEO" ? (
                  <div className="text-center space-y-1">
                    <Film className="w-8 h-8 text-accent mx-auto" />
                    <span className="text-[9px] text-gray-500 block truncate max-w-[100px] px-2">
                      {item.url.split("/").pop()}
                    </span>
                  </div>
                ) : (
                  <img src={item.url} alt="Media asset" className="object-cover w-full h-full rounded-xl" />
                )}
                
                {/* Floating tags */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-black/60 backdrop-blur-sm border border-white/5 px-2 py-0.5 rounded text-[8px] font-bold text-gray-300 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Cover Actions menu */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-3">
                  {/* View Details */}
                  <a
                    href={item.url}
                    target="_blank"
                    className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl py-2 text-[10px] font-bold text-center uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </a>

                  {/* Copy URL */}
                  <button
                    onClick={() => handleCopyUrl(item.id, item.url)}
                    className="w-full bg-accent hover:bg-accent-hover text-primary rounded-xl py-2 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item.id, item.url)}
                    className="w-full bg-red-950/40 hover:bg-red-900/30 text-red-400 border border-red-900/35 rounded-xl py-2 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0d1222] border border-white/5 p-16 rounded-3xl text-center text-gray-500 italic">
          No files matching search found in library. Upload files above to add them.
        </div>
      )}

    </div>
  );
}
