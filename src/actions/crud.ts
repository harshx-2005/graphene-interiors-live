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

/* =========================================================================
   1. SERVICES CRUD
   ========================================================================= */

export async function createServiceAction(data: {
  title: string;
  slug: string;
  headline: string;
  description: string;
  shortDescription: string;
  image: string;
  galleryJson: string;
  video?: string | null;
  bulletsJson: string;
  benefitsJson: string;
  seoTitle: string;
  seoDescription: string;
  isVisible: boolean;
  order: number;
}) {
  try {
    await assertAuth();

    const service = await db.service.create({
      data,
    });

    revalidatePath("/services");
    revalidatePath(`/services/${data.slug}`);
    revalidatePath("/");
    return { success: true, service };
  } catch (error: any) {
    console.error("createServiceAction error:", error);
    return { success: false, error: error.message || "Failed to create service." };
  }
}

export async function updateServiceAction(
  id: number,
  data: {
    title: string;
    slug: string;
    headline: string;
    description: string;
    shortDescription: string;
    image: string;
    galleryJson: string;
    video?: string | null;
    bulletsJson: string;
    benefitsJson: string;
    seoTitle: string;
    seoDescription: string;
    isVisible: boolean;
    order: number;
  }
) {
  try {
    await assertAuth();

    const oldService = await db.service.findUnique({ where: { id } });
    const service = await db.service.update({
      where: { id },
      data,
    });

    revalidatePath("/services");
    if (oldService) revalidatePath(`/services/${oldService.slug}`);
    revalidatePath(`/services/${data.slug}`);
    revalidatePath("/");
    return { success: true, service };
  } catch (error: any) {
    console.error("updateServiceAction error:", error);
    return { success: false, error: error.message || "Failed to update service." };
  }
}

export async function deleteServiceAction(id: number) {
  try {
    await assertAuth();

    const service = await db.service.findUnique({ where: { id } });
    await db.service.delete({
      where: { id },
    });

    revalidatePath("/services");
    if (service) revalidatePath(`/services/${service.slug}`);
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("deleteServiceAction error:", error);
    return { success: false, error: error.message || "Failed to delete service." };
  }
}

export async function duplicateServiceAction(id: number) {
  try {
    await assertAuth();

    const original = await db.service.findUnique({ where: { id } });
    if (!original) {
      return { success: false, error: "Service not found." };
    }

    const count = await db.service.count();
    const duplicated = await db.service.create({
      data: {
        title: `${original.title} (Copy)`,
        slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
        headline: original.headline,
        description: original.description,
        shortDescription: original.shortDescription,
        image: original.image,
        galleryJson: original.galleryJson,
        video: original.video,
        bulletsJson: original.bulletsJson,
        benefitsJson: original.benefitsJson,
        seoTitle: original.seoTitle,
        seoDescription: original.seoDescription,
        isVisible: false, // hidden by default on duplicate
        order: count,
      },
    });

    revalidatePath("/services");
    return { success: true, service: duplicated };
  } catch (error: any) {
    console.error("duplicateServiceAction error:", error);
    return { success: false, error: error.message || "Failed to duplicate service." };
  }
}

export async function reorderServicesAction(items: { id: number; order: number }[]) {
  try {
    await assertAuth();

    await db.$transaction(
      items.map((item) =>
        db.service.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    revalidatePath("/services");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("reorderServicesAction error:", error);
    return { success: false, error: error.message || "Failed to reorder services." };
  }
}

/* =========================================================================
   2. PORTFOLIO CRUD
   ========================================================================= */

export async function createPortfolioAction(data: {
  projectName: string;
  categoryJson: string;
  location: string;
  description: string;
  beforeImagesJson: string;
  afterImagesJson: string;
  videosJson: string;
  completionDate: string;
  isFeatured: boolean;
  order: number;
  details: string;
}) {
  try {
    await assertAuth();

    const project = await db.portfolioProject.create({
      data,
    });

    revalidatePath("/portfolio");
    revalidatePath("/");
    return { success: true, project };
  } catch (error: any) {
    console.error("createPortfolioAction error:", error);
    return { success: false, error: error.message || "Failed to create project." };
  }
}

export async function updatePortfolioAction(
  id: number,
  data: {
    projectName: string;
    categoryJson: string;
    location: string;
    description: string;
    beforeImagesJson: string;
    afterImagesJson: string;
    videosJson: string;
    completionDate: string;
    isFeatured: boolean;
    order: number;
    details: string;
  }
) {
  try {
    await assertAuth();

    const project = await db.portfolioProject.update({
      where: { id },
      data,
    });

    revalidatePath("/portfolio");
    revalidatePath("/");
    return { success: true, project };
  } catch (error: any) {
    console.error("updatePortfolioAction error:", error);
    return { success: false, error: error.message || "Failed to update project." };
  }
}

export async function deletePortfolioAction(id: number) {
  try {
    await assertAuth();

    await db.portfolioProject.delete({
      where: { id },
    });

    revalidatePath("/portfolio");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("deletePortfolioAction error:", error);
    return { success: false, error: error.message || "Failed to delete project." };
  }
}

export async function reorderPortfolioAction(items: { id: number; order: number }[]) {
  try {
    await assertAuth();

    await db.$transaction(
      items.map((item) =>
        db.portfolioProject.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    revalidatePath("/portfolio");
    return { success: true };
  } catch (error: any) {
    console.error("reorderPortfolioAction error:", error);
    return { success: false, error: error.message || "Failed to reorder portfolio." };
  }
}

/* =========================================================================
   3. TESTIMONIALS CRUD
   ========================================================================= */

export async function createTestimonialAction(data: {
  clientName: string;
  position: string;
  review: string;
  rating: number;
  image?: string | null;
  order: number;
  isVisible: boolean;
}) {
  try {
    await assertAuth();

    const testimonial = await db.testimonial.create({
      data,
    });

    revalidatePath("/");
    return { success: true, testimonial };
  } catch (error: any) {
    console.error("createTestimonialAction error:", error);
    return { success: false, error: error.message || "Failed to create testimonial." };
  }
}

export async function updateTestimonialAction(
  id: number,
  data: {
    clientName: string;
    position: string;
    review: string;
    rating: number;
    image?: string | null;
    order: number;
    isVisible: boolean;
  }
) {
  try {
    await assertAuth();

    const testimonial = await db.testimonial.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    return { success: true, testimonial };
  } catch (error: any) {
    console.error("updateTestimonialAction error:", error);
    return { success: false, error: error.message || "Failed to update testimonial." };
  }
}

export async function deleteTestimonialAction(id: number) {
  try {
    await assertAuth();

    await db.testimonial.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("deleteTestimonialAction error:", error);
    return { success: false, error: error.message || "Failed to delete testimonial." };
  }
}

export async function reorderTestimonialsAction(items: { id: number; order: number }[]) {
  try {
    await assertAuth();

    await db.$transaction(
      items.map((item) =>
        db.testimonial.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("reorderTestimonialsAction error:", error);
    return { success: false, error: error.message || "Failed to reorder testimonials." };
  }
}

/* =========================================================================
   4. FAQ CRUD
   ========================================================================= */

export async function createFaqAction(data: {
  question: string;
  answer: string;
  order: number;
  isVisible: boolean;
}) {
  try {
    await assertAuth();

    const faq = await db.faq.create({
      data,
    });

    revalidatePath("/");
    return { success: true, faq };
  } catch (error: any) {
    console.error("createFaqAction error:", error);
    return { success: false, error: error.message || "Failed to create FAQ." };
  }
}

export async function updateFaqAction(
  id: number,
  data: {
    question: string;
    answer: string;
    order: number;
    isVisible: boolean;
  }
) {
  try {
    await assertAuth();

    const faq = await db.faq.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    return { success: true, faq };
  } catch (error: any) {
    console.error("updateFaqAction error:", error);
    return { success: false, error: error.message || "Failed to update FAQ." };
  }
}

export async function deleteFaqAction(id: number) {
  try {
    await assertAuth();

    await db.faq.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("deleteFaqAction error:", error);
    return { success: false, error: error.message || "Failed to delete FAQ." };
  }
}

export async function reorderFaqsAction(items: { id: number; order: number }[]) {
  try {
    await assertAuth();

    await db.$transaction(
      items.map((item) =>
        db.faq.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("reorderFaqsAction error:", error);
    return { success: false, error: error.message || "Failed to reorder FAQs." };
  }
}
