import React from "react";
import { db } from "@/lib/db";
import PortfolioList from "./portfolio-list";

export const revalidate = 0; // Disable server cache for operations

export default async function AdminPortfolioPage() {
  const projects = await db.portfolioProject.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return <PortfolioList initialProjects={projects} />;
}
