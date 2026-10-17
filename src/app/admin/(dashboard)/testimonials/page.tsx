import React from "react";
import { db } from "@/lib/db";
import TestimonialManager from "./testimonial-manager";

export const revalidate = 0; // Disable server cache for list operations

export default async function AdminTestimonialsPage() {
  const testimonials = await db.testimonial.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return <TestimonialManager initialTestimonials={testimonials} />;
}
