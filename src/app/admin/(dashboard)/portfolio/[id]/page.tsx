import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import PortfolioForm from "../portfolio-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditPortfolioPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  const project = await db.portfolioProject.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return <PortfolioForm key={JSON.stringify(project)} initialData={project} />;
}
