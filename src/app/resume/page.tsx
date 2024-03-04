import classes from "./resume.module.css";
import ResumeCard from "../components/ResumeCard";
import type { ResumeCardProps } from "../components/ResumeCard";

const resumes: ResumeCardProps[] = [
  {
    position: "Senior Frontend Engineer",
    url: "./resumes/Jinjing Wu_Senior Frontend Developer_CV.pdf",
  },
  {
    position: "Senior Full-Stack Engineer",
    url: "./resumes/Jinjing Wu_Senior Full-Stack Developer_CV.pdf",
  },
];

export default function Resume() {
  return (
    <main className="min-main-h grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4 place-items-center p-24 md:px-40 text-lg md:text-xl">
      {resumes.map((resume, index) => (
        <ResumeCard key={index} {...resume}></ResumeCard>
      ))}
    </main>
  );
}
