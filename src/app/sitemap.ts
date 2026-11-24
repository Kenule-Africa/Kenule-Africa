import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://kenuleafrica.xyz/legitlab-academy", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://kenuleafrica.xyz/shoutout", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    {
      url: "https://kenuleafrica.xyz",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
