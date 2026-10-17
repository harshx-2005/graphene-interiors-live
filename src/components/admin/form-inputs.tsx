"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Image, Search, X, Loader2, Upload, FileText, Film } from "lucide-react";
import { getGalleryItemsAction } from "@/actions/media";
import { uploadToGallery } from "@/lib/upload-client";
import { useToast } from "@/components/providers";

// 1. Text Input Component
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function InputField({ label, error, className = "", ...props }: InputFieldProps) {
  return (
    <div className="space-y-1.5 w-full font-sans">
      <label className="text-gray-300 text-xs font-bold uppercase tracking-wider block">
        {label}
      </label>
      <input
        className={`w-full bg-[#090c16] border border-white/5 hover:border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-all ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

// 2. Textarea Component
interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextareaField({ label, error, className = "", ...props }: TextareaFieldProps) {
  return (
    <div className="space-y-1.5 w-full font-sans">
      <label className="text-gray-300 text-xs font-bold uppercase tracking-wider block">
        {label}
      </label>
      <textarea
        rows={4}
        className={`w-full bg-[#090c16] border border-white/5 hover:border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-all ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

// 3. Switch Component (Checkbox styled as toggle)
interface SwitchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SwitchField({ label, checked, onChange, ...props }: SwitchFieldProps) {
  return (
    <label className="flex items-center justify-between p-4 bg-[#0d1222] border border-white/5 rounded-2xl cursor-pointer select-none font-sans">
      <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{label}</span>
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
          {...props}
        />
        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent peer-checked:after:bg-primary peer-checked:after:border-primary"></div>
      </div>
    </label>
  );
}

// 4. Media Picker Input Field
interface MediaPickerFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  category?: string;
  fileType?: "IMAGE" | "VIDEO" | "ALL";
}

export function MediaPickerField({
  label,
  value,
  onChange,
  placeholder = "Select an asset...",
  category = "all",
  fileType = "ALL",
}: MediaPickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadPending, startUpload] = useTransition();
  const { success, error: toastError } = useToast();

  // Load items from DB
  const loadGallery = async () => {
    setLoading(true);
    try {
      const res = await getGalleryItemsAction(category, search);
      if (res.success) {
        let filtered = res.items || [];
        if (fileType !== "ALL") {
          filtered = filtered.filter((item: any) => item.type === fileType);
        }
        setItems(filtered);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadGallery();
    }
  }, [isOpen, search]);

  // Upload handler inside picker
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;


    startUpload(async () => {
      const res = await uploadToGallery(file, category !== "all" ? category : "uploads");
      if (res.success && res.item) {
        success("Uploaded and selected file!");
        onChange(res.item.url);
        setIsOpen(false);
      } else {
        toastError(res.error || "Upload failed.");
      }
    });
  };

  return (
    <div className="space-y-1.5 w-full font-sans">
      <label className="text-gray-300 text-xs font-bold uppercase tracking-wider block">
        {label}
      </label>
      
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-[#090c16] border border-white/5 hover:border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl py-3.5 pl-4 pr-10 text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-white/5 border border-white/5 hover:bg-[#748f6e]/10 hover:border-[#748f6e]/25 text-gray-200 px-4 rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <Image className="w-4 h-4 shrink-0 text-accent" />
          <span>Browse</span>
        </button>
      </div>

      {/* Preview Card */}
      {value && (
        <div className="mt-2.5 relative w-full h-44 border border-white/5 rounded-2xl overflow-hidden bg-primary/20 flex items-center justify-center p-2 select-none group">
          {value.endsWith(".mp4") || value.includes("/videos/") ? (
            <div className="flex flex-col items-center gap-2">
              <Film className="w-8 h-8 text-accent animate-pulse" />
              <span className="text-[10px] text-gray-500">{value.split("/").pop()}</span>
            </div>
          ) : (
            <img src={value} alt="Preview" className="w-full h-full object-contain pointer-events-none" />
          )}
        </div>
      )}

      {/* Modal Picker */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#0c101d] border border-white/5 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h3 className="text-white font-serif text-lg font-bold">Select Media Asset</h3>
                <p className="text-gray-400 text-xs mt-0.5">Choose an asset from your library or upload a new one.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Header / Search & Quick Upload */}
            <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0a0d18]">
              {/* Search */}
              <div className="relative w-full md:max-w-xs">
                <Search className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500 w-4 h-4 mt-[15px]" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#060810] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent"
                />
              </div>

              {/* Upload New */}
              <label className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-sans text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl cursor-pointer transition-colors shadow-lg select-none">
                {uploadPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload New Asset</span>
                  </>
                )}
                <input
                  type="file"
                  accept={fileType === "IMAGE" ? "image/*" : fileType === "VIDEO" ? "video/*" : "image/*,video/*"}
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploadPending}
                />
              </label>
            </div>

            {/* Content List Grid */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#0c101d]">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
              ) : items.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onChange(item.url);
                        setIsOpen(false);
                      }}
                      className="aspect-square border border-white/5 hover:border-accent/40 rounded-2xl overflow-hidden bg-primary/20 relative group cursor-pointer transition-all flex items-center justify-center p-1.5"
                    >
                      {item.type === "VIDEO" ? (
                        <div className="text-center space-y-1">
                          <Film className="w-7 h-7 text-accent mx-auto" />
                          <span className="text-[9px] text-gray-500 block truncate max-w-[80px]">
                            {item.url.split("/").pop()}
                          </span>
                        </div>
                      ) : (
                        <img src={item.url} alt="Gallery item" className="w-full h-full object-cover rounded-xl" />
                      )}
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white uppercase tracking-wider bg-accent/90 px-2 py-1 rounded">
                          Choose
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 space-y-2">
                  <FileText className="w-8 h-8 text-gray-600 mx-auto" />
                  <p className="text-gray-500 text-xs">No media assets found matching the filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
