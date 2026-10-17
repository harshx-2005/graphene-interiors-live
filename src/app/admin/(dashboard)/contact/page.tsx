import React from "react";
import { db } from "@/lib/db";
import ContactForm from "./contact-form";

export const revalidate = 0; // Disable server cache for editing forms

export default async function AdminContactEdit() {
  const content = await db.contactInfo.findFirst();

  if (!content) {
    return (
      <div className="bg-[#0d1222] p-8 rounded-3xl border border-white/5 text-center text-gray-400 font-sans">
        Contact content record not found. Please run the database seeder commands to initialize content.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Contact Info Coordinator</h1>
        <p className="text-gray-400 text-xs mt-1">
          Modify the address, hotline numbers, email desks, business working hours, and social media navigation links.
        </p>
      </div>
      <ContactForm key={JSON.stringify(content)} initialData={content} />
    </div>
  );
}
