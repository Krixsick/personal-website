import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";
import { Overlay } from "../components/fun_mode/start-screen/overlay";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { Ground } from "../components/fun_mode/environment/ground";
import { Player } from "../components/fun_mode/player/player";
import Aurora from "@/components/ui/aurora";
import { Snowfall } from "react-snowfall";
import { Stars } from "@react-three/drei";
import { Forest } from "@/components/fun_mode/environment/trees/forest";
import FaultyTerminal from "@/components/FaultyTerminal";
import { Text3D, Center } from "@react-three/drei";
import libreFont from "../assets/Libre_Baskerville_Italic.json";
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
        <div className="w-screen h-screen relative">
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
          <div className="bg-black/60 border-b border-white absolute top-1 left-1/2 -translate-x-1/2 w-[50%] rounded-full flex justify-center items-center">
            <p className="text-2xl text-white text-serif">Home</p>
          </div>
          <div className="top-40 absolute left-1/2 -translate-x-1/2 w-full h-full">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={1}></ambientLight>
              <directionalLight
                position={[1, 1, 1]}
                intensity={2}
              ></directionalLight>
              <Center>
                <Text3D
                  font={libreFont}
                  size={1}
                  height={0.5}
                  curveSegments={12}
                  bevelEnabled
                  bevelThickness={0.02}
                  bevelSize={0.01}
                >
                  LINUS GAO
                  <meshStandardMaterial
                    color="white"
                    metalness={0.5}
                    roughness={0.3}
                  />
                </Text3D>
              </Center>
            </Canvas>
          </div>
          <div className="w-screen h-screen bg-red-100 relative">
            <button
              className="btn cursor-pointer"
              onClick={() => {
                setFunScreenMode(!funScreenMode);
              }}
            >
              secret_button
            </button>
          </div>
        </div>
      )}
    </>
  );
}
