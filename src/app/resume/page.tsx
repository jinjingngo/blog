import classes from "./resume.module.css";
import ResumeCard from "../components/ResumeCard";
import type { ResumeCardProps } from "../components/ResumeCard";

const resumes: ResumeCardProps[] = [
  {
    position: "Senior Frontend Engineer",
    url: "https://drive.google.com/file/d/1uXOQJRX_G684kVKk-MnRAM29KftfR-H7/view?usp=sharing",
  },
  {
    position: "Senior Full-Stack Engineer",
    url: "https://drive.google.com/file/d/1Cy8DFQqSqsAaWqrjc8lnOARlEMxr412-/view?usp=drive_link",
  },
];

export default function Resume() {
  return (
    <main className="min-main-h grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 landscape:grid-rows-1 landscape:grid-cols-2 gap-4 place-items-center p-24 md:px-40 landscape:p-20 text-lg md:text-xl">
      {resumes.map((resume, index) => (
        <ResumeCard key={index} {...resume}></ResumeCard>
      ))}
    </main>
  );
}
