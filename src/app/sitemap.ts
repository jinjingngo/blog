import type { MetadataRoute } from "next";

export const SITE_DOMAIN = "https://wujinjing.com";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: SITE_DOMAIN,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
	];
}
