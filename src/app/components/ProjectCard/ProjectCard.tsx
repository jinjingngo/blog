import Link from "next/link";
import classes from "./ProjectCard.module.css";
import Image from "next/image";
export type ProjectCardProps = {
  name: string;
  description: string;
  poster: string;
  url?: string;
};

const ProjectCard = ({ name, description, poster, url }: ProjectCardProps) => {
  return (
    <article className={classes.project__card}>
      <Image
        className={classes.project__poster}
        src={poster}
        alt={name}
        fill
        style={{ objectFit: "contain" }}
      ></Image>
      <div className={classes.project__mask}>
        <p className={classes.project__name}>{name}</p>
        <p>{description}</p>
        {url && (
          <Link
            className={classes.project__go}
            href={url}
            target="_blank"
            title={name}
          >
            Go {">>"}
          </Link>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
