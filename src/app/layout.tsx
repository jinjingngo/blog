import "./globals.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Jinjing Wu",
	icons: {
		icon: "./favicon.png",
		apple: "/apple-touch-icon.png",
	},
	authors: {
		url: "https://wujinjing.com",
		name: "Jinjing Wu",
	},
	description: "Jinjing Wu's portfolio",
	keywords: "Portfolio,Software Engineer,Person on a bike,Hiker",
	// TODO: Twitter metadata
	// TODO: OpenGraph metadata
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`bg-gray-50 ${montserrat.className}`}>
				{children}
			</body>
		</html>
	);
}
