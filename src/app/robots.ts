import type { MetadataRoute } from "next";
import { SITE_DOMAIN } from "./sitemap";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${SITE_DOMAIN}/sitemap.xml`,
	};
}
