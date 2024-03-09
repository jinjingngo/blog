import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-main-h flex-col items-center justify-center gap-8 p-24 landscape:p-20 md:px-40 text-lg md:text-xl">
      <h1 className="hidden md:block">Here you have Jinjing Wu</h1>
      <article className="text-center">
        If you&apos;re seeking a Senior Full Stack or Senior Frontend Developer
        with more than a decade of experience in developing scalable, engaging,
        and responsive web applications, look no further --{" "}
        {/* make it like a link */}
        <Link className="hover:underline hover:text-[salmon]" href="/resume">
          HIRE ME!
        </Link>
      </article>
    </main>
  );
}
