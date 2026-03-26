"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/cn";

export const Header = () => {
	const pathname = usePathname();
	const isSelf = (path: string) => path === pathname;
	return (
		<nav>
			<ul className={"flex gap-4 items-center justify-end px-2 pb-1"}>
				<li>
					<Link
						className={cn(
							"cursor-pointer hover:underline underline-offset-1",
							isSelf("/") && "underline",
						)}
						href={"/"}
					>
						~
					</Link>
				</li>
				<li>
					<Link
						className={cn(
							"cursor-pointer hover:underline underline-offset-1",
							isSelf("/lab") && "underline",
						)}
						href={"/lab"}
					>
						/lab
					</Link>
				</li>
			</ul>
		</nav>
	);
};
