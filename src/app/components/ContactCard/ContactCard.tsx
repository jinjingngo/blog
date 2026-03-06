import Link from "next/link";
import type { ReactNode } from "react";

export type ContactCardProps = {
	url: string;
	title: string;
} & {
	children: ReactNode;
};

const ContactCard = ({ url, title, children }: ContactCardProps) => {
	return (
		<Link href={url} title={title} target="_target">
			{children}
		</Link>
	);
};

export default ContactCard;
