import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";
import { Overlay } from "../components/fun_mode/start-screen/overlay";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Ground } from "../components/fun_mode/environment/ground";
import { Player } from "../components/fun_mode/player/player";
import Aurora from "@/components/ui/aurora";
import { Snowfall } from "react-snowfall";
import { Stars } from "@react-three/drei";
import { Forest } from "@/components/fun_mode/environment/trees/forest";
import { useMediaQuery } from "usehooks-ts";
import { DesktopScreen } from "@/components/recruiter_mode/desktopScreen";
import { HomeLoadingScreen } from "@/components/recruiter_mode/homeLoadingScreen";
import { MobileScreen } from "@/components/recruiter_mode/mobileScreen";
// import {
//   ProjectList,
//   exampleProjects,
// } from "@/components/portfolio/projectList";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [sound, setSound] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  //Different screen options
  const [funScreenMode, setFunScreenMode] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const heroRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);
  // const [height, setHeight] = useState(false);
  // useEffect(() => {
  //   const onScroll = () => {
  //     const shouldBeScrolled = window.scrollY > 80;
  //     if (shouldBeScrolled !== height) {
  //       setHeight(!height);
  //     }
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, []);

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <>
      <HomeLoadingScreen></HomeLoadingScreen>
      {funScreenMode ? (
        <Aurora
          speed={0.2}
          intensity={0.7}
          vibrancy={1.0}
          frequency={1.0}
          stretch={1.0}
          className="absolute inset-0"
        >
          <div className="w-screen h-screen relative">
            {!gameStarted && (
              <div className="absolute inset-0 z-30">
                <Overlay onStart={() => setGameStarted(true)} />
              </div>
            )}
            {gameStarted && <Snowfall></Snowfall>}
            <Canvas className="w-screen h-screen">
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
              />
              <ambientLight intensity={2} />
              <fog attach="fog" args={["#666666", 5, 10]} />
              <Forest count={25} spread={40} />
              <Ground />
              {/* <ProjectList projects={exampleProjects} /> */}
              {gameStarted && <Player />}
            </Canvas>
            {/* Controls hint */}
            {gameStarted && (
              <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded z-10">
                <p className="font-bold mb-2">Controls:</p>
                <p>WASD or Arrow Keys - Move</p>
              </div>
            )}
            {/* Sound button */}
            <div className="absolute bottom-4 right-4 z-10">
              <button
                onClick={() => setSound(!sound)}
                className="w-[50px] h-[50px] bg-gray-700 hover:bg-gray-600 cursor-pointer rounded-full flex justify-center items-center transition-colors"
              >
                {sound ? <Volume2 /> : <VolumeX />}
              </button>
            </div>
          </div>
        </Aurora>
      ) : (
        <div className="relative min-h-screen">
          {isMobile ? (
            <MobileScreen
              funScreenMode={funScreenMode}
              setFunScreenMode={setFunScreenMode}
              heroVisible={heroVisible}
            ></MobileScreen>
          ) : (
            <DesktopScreen
              funScreenMode={funScreenMode}
              setFunScreenMode={setFunScreenMode}
              heroVisible={heroVisible}
            ></DesktopScreen>
          )}
        </div>

        // <div className="w-screen h-screen relative">
        //   <div className="bg-black/60 border-b border-white absolute top-1 left-1/2 -translate-x-1/2 w-[50%] rounded-full flex justify-center items-center">
        //     <p className="text-2xl text-white text-serif">Home</p>
        //   </div>
        //   <div className="top-40 absolute left-1/2 -translate-x-1/2 w-full h-full"></div>
        //   <div className="w-screen h-screen bg-red-100 relative">

        //   </div>
        // </div>
      )}
    </>
  );
}
