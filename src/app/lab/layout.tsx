export default function LabLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<section className="flex min-w-0 w-full max-w-4xl flex-1 flex-col px-4 py-8 sm:px-6 md:px-10 md:py-12">
			{children}
		</section>
	);
}
