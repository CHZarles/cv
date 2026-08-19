import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://chzarles.github.io/cv";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-08-19"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
