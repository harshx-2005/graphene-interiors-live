import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ServiceForm from "../service-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  const service = await db.service.findUnique({
    where: { id },
  });

  if (!service) {
    notFound();
  }

  return <ServiceForm key={JSON.stringify(service)} initialData={service} />;
}
