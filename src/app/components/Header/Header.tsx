import classes from "./Header.module.css";
import Link from "next/link";

type Route = {
  name: string;
  path: string;
};

const routes: Route[] = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Resume", path: "/resume" },
];

const Header = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.header__title} href="/">
        JINJING WU
      </Link>
      <nav>
        <ul className={classes.header__nav_list}>
          {routes.map(({ name, path }, index) => (
            <li key={index}>
              <Link className={classes.header__nav_anchor} href={path}>
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
