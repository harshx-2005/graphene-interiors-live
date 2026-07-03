import type { Metadata } from "next";
import HomePageClient from "@/components/home-page-client";

export const metadata: Metadata = {
  title: "Graphene Interiors | Luxury Kitchens & Bespoke Fitted Wardrobes Leicester",
  description: "Luxury kitchens, bespoke fitted wardrobes, custom sliding wardrobes, TV media walls, and marble-look quartz worktops in Leicester LE5. 10+ years experience. City & Guilds carpentry precision.",
  alternates: {
    canonical: "https://www.grapheneinteriors.com",
  },
};

export default function Page() {
  return <HomePageClient />;
}
