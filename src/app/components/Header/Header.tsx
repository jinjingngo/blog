"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./Header.module.css";

type Route = {
	name: string;
	path: string;
};

const routes: Route[] = [
	{ name: "Home", path: "/" },
	{ name: "Projects", path: "/projects" },
	{ name: "About", path: "/about" },
	{ name: "Contact", path: "/contact" },
	{ name: "Resume", path: "/resume" },
];

const Header = () => {
	const pathname = usePathname();
	return (
		<header className={classes.header}>
			<Link className={classes.header__title} href="/">
				JINJING WU
			</Link>
			<nav>
				<ul className={classes.header__nav_list}>
					{routes.map(({ name, path }, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: TODO: postpone
						<li key={index}>
							<Link
								className={`${classes.header__nav_anchor} ${
									pathname === path &&
									classes["header__nav_anchor-active"]
								}`}
								href={path}
							>
								{name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
