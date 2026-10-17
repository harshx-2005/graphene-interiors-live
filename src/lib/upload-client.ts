import { getUploadSignatureAction, registerMediaAction } from "@/actions/media";

const MAX_SIZE = 50 * 1024 * 1024;

// Browser uploads straight to Cloudinary, then registers the URL in the gallery DB.
export async function uploadToGallery(file: File, category: string) {
  if (file.size > MAX_SIZE) {
    return { success: false, error: "File size exceeds 50MB limit." } as const;
  }

  const sig = await getUploadSignatureAction();
  if (!sig.success) return { success: false, error: sig.error } as const;

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("folder", sig.folder);
  form.append("signature", sig.signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`, {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  if (!res.ok) {
    return { success: false, error: data?.error?.message || "Upload to Cloudinary failed." } as const;
  }

  return registerMediaAction(data.secure_url, data.resource_type === "video" ? "VIDEO" : "IMAGE", category);
}
