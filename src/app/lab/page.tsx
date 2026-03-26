import fs from "node:fs";
import Link from "next/link";

const snakeToUpperCamel = (str: string) => {
	return str
		.split("-")
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
		<div className={"min-h-full w-3/4 flex flex-col items-start gap-4 p-4"}>
			<h1 className={"text-4xl md:text-5xl text-gray-900"}>/lab</h1>
			<p className={"text-gray-700"}>
				Welcome to my lab! Where I experiment with things that I find
				interesting and challenging.
			</p>
			<ul className={"list-disc list-inside"}>
				{experiments.map((experiment) => (
					<li key={experiment}>
						<Link
							className={
								"cursor-pointer underline underline-offset-2 decoration-wavy hover:decoration-solid hover:underline-offset-4"
							}
							href={`/lab/${experiment}`}
						>
							{snakeToUpperCamel(experiment)}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
