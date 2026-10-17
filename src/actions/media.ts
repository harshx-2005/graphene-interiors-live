"use server";

import { verifyAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { signUpload, deleteMedia } from "@/lib/cloudinary";

// Helper to assert authentication
async function assertAuth() {
  const user = await verifyAuth();
  if (!user) {
    throw new Error("Unauthorized access.");
  }
}

// 1a. Sign a direct browser-to-Cloudinary upload.
// Files never pass through our server, so host request-size caps (Vercel: 4.5MB) don't apply.
export async function getUploadSignatureAction() {
  try {
    await assertAuth();
    return { success: true as const, ...signUpload() };
  } catch (error: any) {
    console.error("getUploadSignatureAction error:", error);
    return { success: false as const, error: error.message || "Failed to prepare upload." };
  }
}

// 1b. Register an uploaded Cloudinary file in the gallery DB
export async function registerMediaAction(url: string, type: "IMAGE" | "VIDEO", category = "uncategorized") {
  try {
    await assertAuth();

    if (!url.startsWith(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`)) {
      return { success: false, error: "Invalid media URL." };
    }

    const item = await db.galleryItem.create({
      data: {
        url,
        type: type === "VIDEO" ? "VIDEO" : "IMAGE",
        category,
        order: 0,
      },
    });

    return { success: true, item };
  } catch (error: any) {
    console.error("registerMediaAction error:", error);
    return { success: false, error: error.message || "Failed to save file." };
  }
}

// 2. Delete media from database and storage
export async function deleteMediaAction(id: number) {
  try {
    await assertAuth();

    const item = await db.galleryItem.findUnique({
      where: { id },
    });

    if (!item) {
      return { success: false, error: "Gallery item not found." };
    }

    // Use URL or clean path to identify file (the helper accepts both)
    const success = await deleteMedia(item.url);

    // Delete DB entry
    await db.galleryItem.delete({
      where: { id },
    });

    return { success: true };
  } catch (error: any) {
    console.error("deleteMediaAction error:", error);
    return { success: false, error: error.message || "Failed to delete file." };
  }
}

// 3. Get all gallery items with filters
export async function getGalleryItemsAction(category?: string, search?: string) {
  try {
    // Media list is public (used in frontend gallery), so no auth check needed here.
    const where: any = {};

    if (category && category !== "all") {
      where.category = category;
    }

    // If search filter is used
    if (search) {
      where.url = {
        contains: search,
      };
    }

    const items = await db.galleryItem.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, items };
  } catch (error: any) {
    console.error("getGalleryItemsAction error:", error);
    return { success: false, error: error.message || "Failed to fetch gallery items." };
  }
}
