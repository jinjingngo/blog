import type { JSX } from "react";

type Person = {
	firstName: string;
	birthYear: number;
};

type GreetingProps = {
	person: Person;
};

const Greeting = ({ person }: GreetingProps) => {
	return (
		<p className="text-2xl font-sans text-purple-400 dark:text-purple-500">
			Hello, <i>{person.firstName}</i>
		</p>
	);
};

const ExpandableGreeting = ({ person }: GreetingProps) => {
	return (
		<details>
			<Greeting person={person} />
		</details>
	);
};

// NOTE: A study of this post: https://overreacted.io/a-chain-reaction/
// biome-ignore lint/suspicious/noExplicitAny: postpone
const translateForBrowser = (jsx: JSX.Element): any => {
	if (jsx === null || typeof jsx !== "object") {
		return jsx;
	}

	if (Array.isArray(jsx)) {
		return jsx.map(translateForBrowser);
	}

	const { type, props } = jsx;
	if (typeof type === "function") {
		const returnedJSX = type(props);
		return translateForBrowser(returnedJSX);
	} else if (typeof type === "string") {
		return {
			type,
			props: {
				...props,
				children: translateForBrowser(props.children),
			},
		};
	}
};

const Welcome = () => {
	const alice: Person = {
		firstName: "Alice",
		birthYear: 1990,
	};
	const bob: Person = {
		firstName: "Bob",
		birthYear: 1985,
	};
	const crystal: Person = {
		firstName: "Crystal",
		birthYear: 1995,
	};

	return (
		<section>
			<h1 className="text-3xl font-sans pb-2">Welcome</h1>
			<ExpandableGreeting person={alice} />
			<ExpandableGreeting person={bob} />
			<ExpandableGreeting person={crystal} />
		</section>
	);
};

export default function AChainReaction() {
	const originalJSX = <Welcome />;
	const browserJXS = translateForBrowser(originalJSX);

	console.log({ type: browserJXS.type, props: browserJXS.props });

	return originalJSX;
}
