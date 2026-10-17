import type { Metadata } from "next";
import { db } from "@/lib/db";
import HomePageClient from "@/components/home-page-client";

export const revalidate = 0; // Ensure data is fetched dynamically

export async function generateMetadata(): Promise<Metadata> {
  const seo = await db.seoSettings.findFirst();
  return {
    title: seo?.title || "Graphene Interiors | Luxury Kitchens & Bespoke Fitted Wardrobes Leicester",
    description: seo?.description || "Luxury kitchens, bespoke fitted wardrobes, custom sliding wardrobes, TV media walls, and marble-look quartz worktops in Leicester LE5. City & Guilds carpentry precision.",
    alternates: {
      canonical: seo?.canonical || "https://www.grapheneinteriors.com",
    },
  };
}

export default async function Page() {
  const homepageContent = await db.homepageContent.findFirst();
  const services = await db.service.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });
  const faqs = await db.faq.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });
  const testimonials = await db.testimonial.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });
  const contact = await db.contactInfo.findFirst();

  return (
    <HomePageClient
      initialData={homepageContent || undefined}
      services={services}
      faqs={faqs}
      testimonials={testimonials}
      contactInfo={contact || undefined}
    />
  );
}
