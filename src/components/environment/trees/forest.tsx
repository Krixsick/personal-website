import { useMemo } from "react";
import { Tree } from "./tree";

interface TreeData {
  position: [number, number, number];
  scale: number;
  rotation: number;
}

interface ForestProps {
  count?: number;
  spread?: number;
  minScale?: number;
  maxScale?: number;
}

export function Forest({ count = 20, spread = 40 }: ForestProps) {
  const trees = useMemo(() => {
    const treeData: TreeData[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread * 2;
      const z = (Math.random() - 0.5) * spread * 2;

      const scale = 3;
      const rotation = Math.random() * Math.PI * 2;
      treeData.push({
        position: [x, 1.2, z],
        scale,
        rotation,
      });
    }

    return treeData;
  }, [count, spread]);

  return (
    <>
      {trees.map((tree, index) => (
        <Tree
          key={index}
          position={tree.position}
          scale={tree.scale}
          rotation={tree.rotation}
        />
      ))}
    </>
  );
}
