import type { Metadata } from "next";
import { db } from "@/lib/db";
import PortfolioPageClient from "@/components/portfolio-page-client";

export const revalidate = 0; // Disable page server cache for dynamic updates

export async function generateMetadata(): Promise<Metadata> {
  const seo = await db.seoSettings.findFirst();
  return {
    title: `Our Portfolio | ${seo?.title || "Graphene Interiors"}`,
    description: seo?.description || "Explore Graphene Interiors' project gallery featuring modern kitchens, wardrobes, and media walls.",
  };
}

export default async function Page() {
  const projects = await db.portfolioProject.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return <PortfolioPageClient projects={projects} />;
}
