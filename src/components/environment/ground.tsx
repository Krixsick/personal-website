import { useTexture } from "@react-three/drei";

export function Ground() {
  const groundTexture = useTexture("/snow_01_1k/snow_01_diff_1k.jpg");
  return (
    <>
      <mesh>
        <planeGeometry></planeGeometry>
        <meshStandardMaterial map={groundTexture}></meshStandardMaterial>
      </mesh>
    </>
  );
}
