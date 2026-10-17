import React from "react";
import { db } from "@/lib/db";
import FaqManager from "./faq-manager";

export const revalidate = 0; // Disable server cache for operations

export default async function AdminFaqPage() {
  const faqs = await db.faq.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return <FaqManager initialFaqs={faqs} />;
}
