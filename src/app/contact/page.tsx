import type { Metadata } from "next";
import ContactPageClient from "@/components/contact-page-client";

export const metadata: Metadata = {
  title: "Contact Us | Graphene Interiors | Leicester Office",
  description: "Get in touch with Graphene Interiors Ltd. Call +44 7438 199369 or book a free in-home kitchen and bedroom design consultation in Leicester.",
  alternates: {
    canonical: "https://www.grapheneinteriors.com/contact",
  },
};

export default function Page() {
  return <ContactPageClient />;
}
