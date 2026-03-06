import "./globals.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Header from "./components/Header";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Jinjing Wu",
	icons: "./favicon.png",
	authors: {
		url: "https://wujinjing.com",
		name: "Jinjing Wu",
	},
	description: "Jinjing Wu's portfolio",
	keywords:
		"Portfolio,FullStack Developer,Frontend Developer,Backend Developer",
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
