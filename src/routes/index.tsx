import { createFileRoute } from "@tanstack/react-router";
import { Snow } from "../components/snow/snow";
import { Canvas } from "@react-three/fiber";
import { Overlay } from "../components/start-screen/overlay";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { Ground } from "../components/environment/ground";
import { Player } from "../components/player/player";
import Aurora from "@/components/ui/aurora";
import { Snowfall } from "react-snowfall";
import { Stars, Sparkles, Cloud } from "@react-three/drei";
import { Forest } from "@/components/environment/trees/forest";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [sound, setSound] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
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
    </>
  );
}
