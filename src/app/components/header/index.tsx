"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/cn";

export const Header = () => {
	const pathname = usePathname();
	const isSelf = (path: string) => path === pathname;

	return (
		<nav className="shrink-0 ps-[max(0.5rem,env(safe-area-inset-left))] pe-[max(0.5rem,env(safe-area-inset-right))] pb-[max(0.25rem,env(safe-area-inset-bottom))]">
			<ul className="flex items-center justify-end gap-4">
				<li>
					<Link
						className={cn(
							"cursor-pointer underline-offset-2 decoration-wavy hover:decoration-solid hover:underline-offset-2",
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
							"cursor-pointer underline-offset-2 decoration-wavy hover:decoration-solid hover:underline-offset-2",
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
