import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://grapheneinteriors.co.uk";

  const staticPaths = [
    "",
    "/about",
    "/portfolio",
    "/contact",
    "/services",
  ];

  const servicesPaths = [
    "/services/kitchens",
    "/services/kitchen-renovations",
    "/services/fitted-wardrobes",
    "/services/sliding-wardrobes",
    "/services/bedrooms",
    "/services/media-walls",
    "/services/worktops",
    "/services/bespoke-furniture",
    "/services/custom-designs",
    "/services/interior-design",
  ];

  const localSeoSlugs = [
    "/kitchen-fitters-leicester",
    "/kitchen-renovations-leicester",
    "/media-walls-leicester",
    "/fitted-wardrobes-leicester",
    "/sliding-wardrobes-leicester",
    "/worktops-leicester",
    "/interior-design-leicester",
    "/custom-furniture-leicester",
  ];

  const allPages = [
    ...staticPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1.0 : 0.8,
    })),
    ...servicesPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...localSeoSlugs.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return allPages;
}
