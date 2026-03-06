import fs from "node:fs";
import Link from "next/link";

const snakeToUpperCamel = (str: string) => {
	return str
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

const path = "./src/app/lab";

const folders = fs.readdirSync(path);
const experiments = folders.filter((folder) =>
	fs.statSync(`${path}/${folder}`).isDirectory(),
);

export default function TheTwoReacts() {
	return (
		<div>
			<h1>My Lab</h1>
			<p>
				Welcome to my lab! Where I experiment with things that I find
				interesting and challenging.
			</p>
			<ul>
				{experiments.map((experiment) => (
					<li key={experiment}>
						<Link href={`/lab/${experiment}`}>
							{snakeToUpperCamel(experiment)}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
