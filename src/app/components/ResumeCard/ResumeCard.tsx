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
        <FaRegFilePdf className="w-16 h-16 md:w-32 md:h-32" />
        <h1 className="text-center">{position}</h1>
      </a>
    </article>
  );
};

export default ResumeCard;
