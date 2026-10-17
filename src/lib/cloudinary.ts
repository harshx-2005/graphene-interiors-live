import { v2 as cloudinary } from "cloudinary";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const UPLOAD_FOLDER = "graphene-interiors";

// Signature for a direct browser upload; the API secret never leaves the server.
export function signUpload() {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: UPLOAD_FOLDER },
    process.env.CLOUDINARY_API_SECRET!
  );
  return {
    timestamp,
    signature,
    folder: UPLOAD_FOLDER,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  };
}

export async function deleteMedia(publicIdOrUrl: string): Promise<boolean> {
  const isCloudinaryConfigured = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

  if (!publicIdOrUrl) return false;

  // Local fallback deletion
  if (publicIdOrUrl.startsWith("/uploads/") || publicIdOrUrl.startsWith("local-")) {
    const filename = publicIdOrUrl.replace("/uploads/", "").replace("local-", "");
    const filePath = join(process.cwd(), "public", "uploads", filename);
    try {
      if (existsSync(filePath)) {
        unlinkSync(filePath);
        console.log(`Deleted local file: ${filePath}`);
        return true;
      }
    } catch (error) {
      console.error("Error deleting local file:", error);
    }
    return false;
  }

  // Cloudinary deletion
  if (isCloudinaryConfigured) {
    try {
      const result = await cloudinary.uploader.destroy(publicIdOrUrl);
      return result.result === "ok";
    } catch (error) {
      console.error("Cloudinary delete error:", error);
      return false;
    }
  }

  return false;
}
