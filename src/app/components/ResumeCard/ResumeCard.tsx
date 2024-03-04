import classes from "./ResumeCard.module.css";
import { FaRegFilePdf } from "react-icons/fa6";

export type ResumeCardProps = {
  position: string;
  url: string;
};

const ResumeCard = ({ position, url }: ResumeCardProps) => {
  return (
    <article className="max-w-72 max-h-48">
      <a
        className="flex flex-col gap-8 justify-center items-center hover:text-[salmon] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        href={url}
      >
        <FaRegFilePdf size={"10rem"} />
        <h1>{position}</h1>
      </a>
    </article>
  );
};

export default ResumeCard;
