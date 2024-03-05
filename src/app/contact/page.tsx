import classes from "./contact.module.css";
import { FaGithub } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

import ContactCard from "../components/ContactCard";

import type { ContactCardProps } from "../components/ContactCard";

const className = "w-8 h-8 md:w-12 md:h-12";

const contacts: ContactCardProps[] = [
  {
    children: (
      <MdAlternateEmail className={`${className} hover:text-[salmon]`} />
    ),
    url: "mailto: jinjing.ngo@gmail.com",
    title: "Mail me",
  },
  {
    children: <FaGithub className={`${className} hover:text-[salmon]`} />,
    url: "https://github.com/charleserious",
    title: "GitHub Profile",
  },
  {
    children: (
      <AiOutlineLinkedin className={`${className} hover:text-[#2a52be]`} />
    ),
    url: "https://www.linkedin.com/in/jinjingwu/",
    title: "LinkedIn Profile",
  },
  {
    children: <FaXTwitter className={`${className} hover:text-[salmon]`} />,
    url: "https://twitter.com/JinjingNgo",
    title: "X Profile",
  },
];

export default function Contact() {
  return (
    <main className="flex min-main-h flex-row flex-wrap gap-3 md:gap-4 items-center justify-center p-24">
      {contacts.map((contact, index) => (
        <ContactCard key={index} {...contact} />
      ))}
    </main>
  );
}
