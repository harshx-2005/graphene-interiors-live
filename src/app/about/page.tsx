import type { Metadata } from "next";
import AboutPageClient from "@/components/about-page-client";

export const metadata: Metadata = {
  title: "About Us | Graphene Interiors | Luxury Kitchens & Wardrobes Leicester",
  description: "Learn about Graphene Interiors Ltd. Directed by City & Guilds Level 2 qualified carpenters with 15+ years experience. We design and install custom kitchens and fitted wardrobes in Leicester LE5.",
  alternates: {
    canonical: "https://www.grapheneinteriors.com/about",
  },
};

export default function Page() {
  return <AboutPageClient />;
}
