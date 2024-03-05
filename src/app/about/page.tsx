import classes from "./about.module.css";

export default function About() {
  return (
    <main className={`min-main-h ${classes.about__wrapper}`}>
      <p className={classes.about__paragraph}>
        I&apos;m Jinjing Wu, a Senior Front-End and Full-Stack Developer known
        for innovative solutions to complex problems. Specializing in React, Go,
        and AWS, I&apos;ve enhanced user experiences and system functionalities
        in diverse projects. From scalable web applications to dynamic GIS maps
        and interactive 3D graphics, my work pushes my understanding of
        computation.
      </p>
      <p className={classes.about__paragraph}>
        Originally from Jiangsu, China, I&apos;m currently contributing to the
        tech scene in Stockholm, driven by a passion for technology,
        environmental sustainability, and continuous learning. My approach
        marries rigorous problem-solving with creativity, aiming to transcend
        conventional web technology limits.
      </p>
      <p className={classes.about__paragraph}>
        Championing agile methodologies and teamwork, I aim to create web
        applications that are not only efficient and forward-thinking but also
        positively impact the digital landscape.
      </p>
    </main>
  );
}
