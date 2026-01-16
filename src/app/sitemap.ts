import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://tuannh982.github.io/days-until";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/countdown`,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.8,
        },
    ];
}
