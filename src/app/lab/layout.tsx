export default function LabLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<section className="flex min-h-full w-full max-w-4xl flex-col px-6 py-8 md:px-10 md:py-12">
			{children}
		</section>
	);
}
