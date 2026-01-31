import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

interface TreeProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: number;
}

export function Tree({
  position = [0, 2, 0],
  scale = 4,
  rotation = 0,
}: TreeProps) {
  const { scene } = useGLTF("/tree1.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <group position={position} scale={scale} rotation={[0, rotation, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Preload the model
useGLTF.preload("/tree1.glb");
