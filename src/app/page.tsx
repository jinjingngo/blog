"use client";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

const ROLES = ["Software Engineer", "Cyclist", "Hiking"];
const ROLES_SWITCHING_INTERVAL = 2 * 1000; // 2 seconds

export default function Home() {
	const [role, setRole] = useState(ROLES[0]);

	useInterval(() => {
		setRole(ROLES[Math.floor(Math.random() * ROLES.length)]);
	}, ROLES_SWITCHING_INTERVAL);

	return (
		<main className="flex h-dvh flex-col items-center justify-center gap-8 ">
			<h1 className="text-4xl md:text-5xl">Hi, This is Jinjing</h1>
			<article className="text-center flex flex-col">
				<span>{role}</span>
			</article>
		</main>
	);
}
