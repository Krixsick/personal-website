import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";
import { Overlay } from "../components/fun_mode/start-screen/overlay";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { Ground } from "../components/fun_mode/environment/ground";
import { Player } from "../components/fun_mode/player/player";
import Aurora from "@/components/ui/aurora";
import { Snowfall } from "react-snowfall";
import { Stars } from "@react-three/drei";
import { Forest } from "@/components/fun_mode/environment/trees/forest";
import FaultyTerminal from "@/components/FaultyTerminal";
import ASCIIText from "@/components/ASCIIText";
import PixelTrail from "@/components/PixelTrail";
import { Projects } from "@/components/recruiter_mode/projects";
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

  return (
    <>
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
          <div className="fixed inset-0 z-0">
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.8}
              pause={false}
              scanlineIntensity={0.5}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={1}
              chromaticAberration={0}
              dither={0}
              curvature={0.1}
              tint="#A7EF9E"
              mouseReact
              mouseStrength={0.5}
              pageLoadAnimation
              brightness={0.6}
            />
            <PixelTrail
              className="z-1"
              gridSize={50}
              trailSize={0.1}
              maxAge={250}
              interpolate={5}
              color="#5227FF"
              gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
              gooeyEnabled
              gooStrength={2}
            />
          </div>
          <section className="relative h-screen w-screen z-10">
            <nav
              className={`h-[60px] w-[40%] z-10 fixed top-6 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl flex justify-center items-center`}
            >
              <p className="text-[clamp(14px,2vw,28px)] text-white font-bold inter-nor">
                Home
              </p>
            </nav>
            {/* */}
            <div className="w-screen h-full flex justify-center items-center">
              <ASCIIText text="LINUS GAO" enableWaves asciiFontSize={4} />
            </div>
          </section>
          {/* Section 2 */}
          <section className="min-h-screen flex items-center justify-center flex-col">
            <div className="flex w-[50%] h-[50px] justify-center items-center bg-blue-100">
              <p>Projects</p>
            </div>
            <Projects></Projects>
            <div className="flex justify-center items-center">
              <button
                className="px-6 py-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full text-white text-sm hover:bg-black/60 transition-colors inter-nor cursor-pointer"
                onClick={() => setFunScreenMode(!funScreenMode)}
              >
                SECERT
              </button>
            </div>
          </section>
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
