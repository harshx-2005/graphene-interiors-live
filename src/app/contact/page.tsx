import type { Metadata } from "next";
import { db } from "@/lib/db";
import ContactPageClient from "@/components/contact-page-client";

export const revalidate = 0; // Disable page server cache for dynamic updates

export async function generateMetadata(): Promise<Metadata> {
  const seo = await db.seoSettings.findFirst();
  return {
    title: `Contact Us | ${seo?.title || "Graphene Interiors"}`,
    description: seo?.description || "Get in touch with Graphene Interiors Ltd. Call or book a free in-home kitchen and bedroom design consultation in Leicester.",
  };
}

export default async function Page() {
  const contact = await db.contactInfo.findFirst();

  return <ContactPageClient contactData={contact || undefined} />;
}
