import classes from "./ContactCard.module.css";
import { ReactNode } from "react";
import Link from "next/link";

export type ContactCardProps = {
  url: string;
  title: string;
} & {
  children: ReactNode;
};

const ContactCard = ({ url, title, children }: ContactCardProps) => {
  return (
    <Link href={url} title={title}>
      {children}
    </Link>
  );
};

export default ContactCard;
