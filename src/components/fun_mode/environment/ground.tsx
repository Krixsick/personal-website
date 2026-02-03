import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export function Ground() {
  const [diffuseMap, normalMap, displacementMap, roughnessMap] = useTexture([
    "/snow_01_1k.gltf/snow_01_diff_1k.jpg",
    "/snow_01_1k.gltf/snow_01_nor_gl_1k.jpg",
    "/snow_01_1k.gltf/snow_01_disp_1k.jpg",
    "/snow_01_1k.gltf/snow_01_rough_1k.jpg",
  ]);

  [diffuseMap, normalMap, displacementMap, roughnessMap].forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100, 64, 64]} />
      <meshStandardMaterial
        map={diffuseMap}
        normalMap={normalMap}
        displacementMap={displacementMap}
        displacementScale={0.5}
        roughnessMap={roughnessMap}
      />
    </mesh>
  );
}
