import classes from "./projects.module.css";
import ProjectCard from "../components/ProjectCard";
import type { ProjectCardProps } from "../components/ProjectCard";

const projects: ProjectCardProps[] = [
  {
    name: "Real Estate Panorama",
    description:
      "A panorama generation system utilizing krpano, dramatically improving online property showcases for multiple real estate companies, boosting their market reach and customer interaction.",
    poster: "/images/projects/real_estate_panorama.png",
  },
  {
    name: "GIS Map",
    description:
      "A versatile GIS Map component, which became a core feature integrated across multiple products, elevating user experience and expanding product functionality",
    poster: "/images/projects/gis_map_component.jpg",
  },
  {
    name: "MLS Panels",
    description:
      "MLS Panel project, utilizing React for dynamic user interface design and Express to develop a robust GraphQL service, enhancing data integration and user experience.",
    poster: "/images/projects/mls_filters.gif",
    url: "https://www.compass.com/",
  },
  {
    name: "DSAR",
    description:
      "The DSAR (Data Subject Access Request) process, ensuring compliance with data access requests across the entire system, thereby enhancing data privacy and regulatory adherence.",
    poster: "/images/projects/dsar.png",
    url: "https://www.compass.com/",
  },
  {
    name: "CRM",
    description:
      "Decomposed the main system and CRM system by consuming Kafka events to synchronize data in real-time, enhancing data reliability and system interoperability.",
    poster: "/images/projects/crm.png",
    url: "https://www.compass.com/",
  },
];

export default function Projects() {
  return (
    <main className={`min-main-h ${classes.projects}`}>
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </main>
  );
}
