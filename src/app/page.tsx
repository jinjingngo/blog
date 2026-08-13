"use client";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

const ROLES = ["Software Engineer", "Person on a bike", "Hiker"];
const ROLES_SWITCHING_INTERVAL = 2 * 1000; // 2 seconds

export default function Home() {
	const [role, setRole] = useState(ROLES[0]);

	useInterval(() => {
		setRole((currentRole) => {
			const currentIndex = ROLES.indexOf(currentRole);
			const nextIndex = (currentIndex + 1) % ROLES.length;
			return ROLES[nextIndex];
		});
	}, ROLES_SWITCHING_INTERVAL);

	return (
		<div
			className={
				"min-h-full w-full flex flex-col items-center justify-center gap-8"
			}
		>
			<h1 className="text-4xl md:text-5xl text-gray-900">
				Hi, This is Jinjing
			</h1>
			<article className="text-center flex flex-col text-gray-700">
				<span>{role}</span>
			</article>
		</div>
	);
}
