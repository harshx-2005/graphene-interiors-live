import type { Metadata } from "next";
import { db } from "@/lib/db";
import AboutPageClient from "@/components/about-page-client";

export const revalidate = 0; // Disable page server cache for dynamic updates

export async function generateMetadata(): Promise<Metadata> {
  const seo = await db.seoSettings.findFirst();
  return {
    title: `About Us | ${seo?.title || "Graphene Interiors"}`,
    description: seo?.description || "Learn about Graphene Interiors Ltd. Directed by City & Guilds Level 2 qualified carpenters with 15+ years experience.",
  };
}

export default async function Page() {
  const about = await db.aboutContent.findFirst();

  return <AboutPageClient aboutData={about || undefined} />;
}
