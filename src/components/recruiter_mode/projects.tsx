import { useRef, useState } from "react";
import PixelTransition from "../PixelTransition";
import protoGif from "@/assets/vid1.gif";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "../SplitText";
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
      description: "UOFTHacks 13 Project",
      tags: ["MongoDB", "NextJS", "JavaScript/TypeScript", "HTML", "CSS", ""],
      link: "https://protagame.vercel.app/",
      gif: protoGif,
    },
    {
      id: 2,
      title: "Idlemind",
      description: "hackWestern 12 Project",
      tags: [
        "MongoDB",
        "ReactJS",
        "JavaScript/TypeScript",
        "HTML",
        "CSS",
        "Python",
      ],
      link: "https://www.idlemind.tech/",
    },
    {
      id: 3,
      title: "Polar Bot",
      description: "Territory Discord Bot",
      tags: ["Python", "FastAPI", "Discord.py"],
      link: "https://github.com/Krixsick/discord-1",
    },
  ];
  const [projects] = useState<Project[]>(projectList);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <SplitText
          text="Projects"
          className="text-2xl lg:text-5xl inter-bold text-white"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>
      <div
        ref={containerRef}
        className="w-screen min-h-screen grid grid-cols-1 z-1 md:grid-cols-2 auto-rows-[50vh] gap-8 p-6 max-w-7xl"
      >
        {projects.map((item) => {
          return (
            <div
              key={item.id}
              className="project-card border-2 border-black/10 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/20">
                <h3 className="font-bold text-lg text-white inter-nor">
                  {item.title}
                </h3>
                <div className="flex gap-2">
                  {item.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] inter-nor uppercase tracking-wider text-white/70 bg-white/10 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-grow relative overflow-hidden group">
                <PixelTransition
                  firstContent={
                    <div className="w-full h-full bg-gray-900 flex justify-center items-center">
                      <img
                        src={item.gif}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  }
                  secondContent={
                    <div className="w-full h-full bg-black/90 flex flex-col justify-center items-center p-6 text-center">
                      <p className="text-white text-lg font-medium mb-6">
                        {item.description}
                      </p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform cursor-pointer"
                      >
                        View Project
                      </a>
                    </div>
                  }
                  gridSize={12}
                  pixelColor="#ffffff"
                  animationStepDuration={0.4}
                  className="w-full h-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
