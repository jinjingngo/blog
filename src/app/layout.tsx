import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Header } from "./components/header";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Jinjing Wu",
	icons: {
		icon: "/favicon.png",
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

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`flex min-h-dvh w-full max-w-full flex-col gap-4 bg-gray-50 ${montserrat.className}`}
			>
				<main className="flex min-w-0 flex-1 justify-center text-gray-800">
					{children}
				</main>
				<Header />
			</body>
		</html>
	);
}
