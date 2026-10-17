import React from "react";
import { db } from "@/lib/db";
import ServicesList from "./services-list";

export const revalidate = 0; // Disable server cache for list operations

export default async function AdminServicesPage() {
  const services = await db.service.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return <ServicesList initialServices={services} />;
}
