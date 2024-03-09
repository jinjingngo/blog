import classes from "./about.module.css";

export default function About() {
  return (
    // TODO: add some graphic maybe a 3D thing
    <main className={`min-main-h ${classes.about}`}>
      <p className={classes.about__paragraph}>
        As a Senior Developer known for problem solving, I specialize in React,
        Go, and AWS(know some of it), I&apos;ve enhanced user experiences and
        system functionalities in diverse projects. From scalable web
        applications to dynamic GIS maps and interactive 3D graphics, my work
        pushes my understanding of computation.
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
