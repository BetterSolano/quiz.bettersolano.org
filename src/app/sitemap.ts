import { MetadataRoute } from "next";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://quiz.bettersolano.org";

    const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${baseUrl}/quiz/${cat.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/quiz`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        ...categoryEntries,
        {
            url: `${baseUrl}/leaderboard`,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/mechanics`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
    ];
}
