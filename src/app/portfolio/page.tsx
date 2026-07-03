import type { Metadata } from "next";
import PortfolioPageClient from "@/components/portfolio-page-client";

export const metadata: Metadata = {
  title: "Our Portfolio | Luxury Kitchens & Bespoke Wardrobes | Graphene Interiors",
  description: "Explore Graphene Interiors' project gallery featuring modern high-gloss kitchens, sliding mirrored wardrobes, TV media walls, and custom woodwork fitted in Leicester LE5.",
  alternates: {
    canonical: "https://www.grapheneinteriors.com/portfolio",
  },
};

export default function Page() {
  return <PortfolioPageClient />;
}
