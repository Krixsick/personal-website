import TiltedCard from "../TiltedCard";
import fluxlogo from "@/assets/flux.jpeg";
import rbclogo from "@/assets/rbc.jpeg";
import SplitText from "../SplitText";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Work {
  id: number;
  title: string;
  role: string; // Added role for more detail
  pic?: string;
  link: string;
}

export function Experience() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const experienceList: Work[] = [
    {
      id: 1,
      title: "Flux Marine",
      role: "Software Engineer",
      link: "https://www.fluxmarine.com/",
      pic: fluxlogo,
    },
    {
      id: 2,
      title: "RBC",
      role: "Design Thinking Fellow",
      link: "https://www.rbcroyalbank.com/personal.html",
      pic: rbclogo,
    },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".experience-card");
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

  return (
    <div
      ref={containerRef}
      className="w-full py-20 px-4 flex flex-col items-center "
    >
      <SplitText
        text="Experience"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
        {experienceList.map((item) => {
          return (
            <div
              key={item.id}
              className="experience-card flex flex-col items-center gap-6 group"
            >
              <div className="relative">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <TiltedCard
                    imageSrc={
                      item.pic ||
                      "https://placehold.co/300x300/black/white?text=Logo"
                    }
                    altText={item.title}
                    captionText={item.title}
                    containerHeight="450px"
                    containerWidth="450px"
                    imageHeight="400px"
                    imageWidth="400px"
                    rotateAmplitude={6}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                  />
                </a>
                <div className="text-center">
                  <h3 className="text-xl text-white inter-bold">
                    {item.title}
                  </h3>
                  <p className="text-cyan-400 font-mono text-sm inter-nor">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
