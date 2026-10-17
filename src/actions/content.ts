"use server";

import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/auth";
import { db } from "@/lib/db";

// Helper to assert authentication
async function assertAuth() {
  const user = await verifyAuth();
  if (!user) {
    throw new Error("Unauthorized access.");
  }
}

// 1. Update Homepage Content
export async function updateHomepageAction(formData: FormData) {
  try {
    await assertAuth();

    const data = {
      heroTitle: formData.get("heroTitle") as string,
      heroSubtitle: formData.get("heroSubtitle") as string,
      heroDescription: formData.get("heroDescription") as string,
      heroBackgroundType: formData.get("heroBackgroundType") as string,
      heroBackgroundImage: formData.get("heroBackgroundImage") as string,
      heroBackgroundVideo: formData.get("heroBackgroundVideo") as string,
      statsJson: formData.get("statsJson") as string,
      featuresJson: formData.get("featuresJson") as string,
      ctaTitle: formData.get("ctaTitle") as string,
      ctaDescription: formData.get("ctaDescription") as string,
    };

    await db.homepageContent.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("updateHomepageAction error:", error);
    return { success: false, error: error.message || "Failed to update homepage content." };
  }
}

// 2. Update About Content
export async function updateAboutAction(formData: FormData) {
  try {
    await assertAuth();

    const data = {
      heading: formData.get("heading") as string,
      description: formData.get("description") as string,
      imagesJson: formData.get("imagesJson") as string,
      videosJson: formData.get("videosJson") as string,
      achievementsJson: formData.get("achievementsJson") as string,
      mission: formData.get("mission") as string,
      vision: formData.get("vision") as string,
    };

    await db.aboutContent.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    });

    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    console.error("updateAboutAction error:", error);
    return { success: false, error: error.message || "Failed to update about content." };
  }
}

// 3. Update Contact Information
export async function updateContactAction(formData: FormData) {
  try {
    await assertAuth();

    const data = {
      businessName: formData.get("businessName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      whatsApp: formData.get("whatsApp") as string,
      address: formData.get("address") as string,
      googleMapsEmbedUrl: formData.get("googleMapsEmbedUrl") as string,
      googleMapsLink: formData.get("googleMapsLink") as string,
      openingHoursJson: formData.get("openingHoursJson") as string,
      socialLinksJson: formData.get("socialLinksJson") as string,
    };

    await db.contactInfo.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    });

    revalidatePath("/contact");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("updateContactAction error:", error);
    return { success: false, error: error.message || "Failed to update contact info." };
  }
}

// 4. Update Global SEO Settings
export async function updateSeoAction(formData: FormData) {
  try {
    await assertAuth();

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      keywords: formData.get("keywords") as string,
      canonical: formData.get("canonical") as string,
      ogImage: formData.get("ogImage") as string,
      robots: formData.get("robots") as string,
      schemaJsonLd: formData.get("schemaJsonLd") as string,
      sitemap: formData.get("sitemap") as string || "",
      robotsTxt: formData.get("robotsTxt") as string || "",
    };

    await db.seoSettings.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/services");
    revalidatePath("/portfolio");
    revalidatePath("/contact");
    return { success: true };
  } catch (error: any) {
    console.error("updateSeoAction error:", error);
    return { success: false, error: error.message || "Failed to update SEO settings." };
  }
}

// 5. Update Website Configuration Settings
export async function updateSettingsAction(formData: FormData) {
  try {
    await assertAuth();

    const data = {
      logoUrl: formData.get("logoUrl") as string,
      faviconUrl: formData.get("faviconUrl") as string,
      footerCopyright: formData.get("footerCopyright") as string,
      themeSettingsJson: formData.get("themeSettingsJson") as string,
      analyticsId: formData.get("analyticsId") as string || "",
    };

    await db.websiteSettings.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/services");
    revalidatePath("/portfolio");
    revalidatePath("/contact");
    return { success: true };
  } catch (error: any) {
    console.error("updateSettingsAction error:", error);
    return { success: false, error: error.message || "Failed to update website settings." };
  }
}
