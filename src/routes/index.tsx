import { createFileRoute } from "@tanstack/react-router";
import { Snow } from "../components/snow/snow";
import { Canvas } from "@react-three/fiber";
import { Overlay } from "../components/start-screen/overlay";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { Ground } from "../components/environment/ground";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [sound, setSound] = useState(true);
  return (
    <>
      <div className="w-screen h-screen bg-gray-400 relative">
        <Overlay></Overlay>
        <Canvas className="w-screen h-screen">
          <Ground></Ground>
        </Canvas>
        <Snow></Snow>
        <div className="absolute w-[10%] h-[10%] bottom-1 right-5 flex justify-end items-center">
          <button
            onClick={() => {
              setSound(!sound);
            }}
            className="w-[40px] h-[40px] bg-gray-500 cursor-pointer rounded-full flex justify-center items-center"
          >
            {sound ? <Volume2></Volume2> : <VolumeX></VolumeX>}
          </button>
        </div>
      </div>
    </>
  );
}
