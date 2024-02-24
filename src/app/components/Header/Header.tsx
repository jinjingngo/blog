import classes from "./Header.module.css";
import Link from "next/link";

const routes = [
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
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
