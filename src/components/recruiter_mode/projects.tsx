import { useState } from "react";

export function Projects() {
  interface Project {
    id: number;
    title: string;
    description: string;
    gif?: string;
    tags: string[];
    link: string;
  }
  const projectList: Project[] = [
    {
      id: 1,
      title: "Protogame",
      description: "UOFT Hacks #6 Overall Create your own personalized story",
      tags: ["MongoDB", "NextJS", "JavaScript/TypeScript", "HTML", "CSS", ""],
      link: "https://github.com/immortalillusions/protagame",
    },
    {
      id: 2,
      title: "Idlemind",
      description: "Western Hacks 13 Project",
      tags: ["MongoDB", "NextJS", "JavaScript/TypeScript", "HTML", "CSS", ""],
      link: "https://github.com/immortalillusions/protagame",
    },
    {
      id: 3,
      title: "Protogame",
      description: "UOFT Hacks #6 Overall Create your own personalized story",
      tags: ["MongoDB", "NextJS", "JavaScript/TypeScript", "HTML", "CSS", ""],
      link: "https://github.com/immortalillusions/protagame",
    },
  ];
  const [projects] = useState<Project[]>(projectList);

  return (
    <>
      <div
        className="
            grid 
            grid-cols-1          
            md:grid-cols-2       
            auto-rows-[50vh]   
            gap-6
            "
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
