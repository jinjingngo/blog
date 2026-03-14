import type { MetadataRoute } from "next";

export default function (): MetadataRoute.Manifest {
	return {
		name: "Jinjing",
		short_name: "Jinjing",
		description: "A blog from Jinjing",
		display: "standalone",
		background_color: "#f9fafb",
		theme_color: "#f9fafb",
		icons: [
			{
				src: "/icon-192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/icon-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/maskable-192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/maskable-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}
