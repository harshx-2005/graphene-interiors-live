import type { Metadata } from "next";
import ServicesPageClient from "@/components/services-page-client";

export const metadata: Metadata = {
  title: "Our Services | Graphene Interiors | Luxury Kitchens & Bedroom Fitting",
  description: "Specialist interior renovation and joinery services in Leicester. We supply and install luxury kitchens, fitted wardrobes, sliding wardrobes, TV media walls, and worktops.",
  alternates: {
    canonical: "https://www.grapheneinteriors.com/services",
  },
};

export default function Page() {
  return <ServicesPageClient />;
}
