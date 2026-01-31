import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useKeyboardControls } from "./KeyboardControls";

export function Player() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/character_walk.glb");
  const { actions } = useAnimations(animations, group);
  const controls = useKeyboardControls();
  const { camera } = useThree();

  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  // Movement parameters
  const MOVE_SPEED = 3;
  const ROTATION_SPEED = 3;

  // Play walking animation when moving
  useEffect(() => {
    const isMoving =
      controls.forward || controls.backward || controls.left || controls.right;

    if (isMoving && actions && Object.keys(actions).length > 0) {
      // Play the first animation (usually walk/run)
      const firstAnimation = Object.values(actions)[0];
      firstAnimation?.play();
    } else if (actions && Object.keys(actions).length > 0) {
      // Stop animation when not moving
      const firstAnimation = Object.values(actions)[0];
      firstAnimation?.stop();
    }
  }, [controls, actions]);

  useFrame((_, delta) => {
    if (!group.current) return;

    // Reset direction
    direction.current.set(0, 0, 0);

    // Calculate movement direction
    if (controls.forward) direction.current.z -= 1;
    if (controls.backward) direction.current.z += 1;
    if (controls.left) direction.current.x -= 1;
    if (controls.right) direction.current.x += 1;

    // Normalize diagonal movement
    if (direction.current.length() > 0) {
      direction.current.normalize();
    }

    // Apply movement
    velocity.current.set(
      direction.current.x * MOVE_SPEED * delta,
      0,
      direction.current.z * MOVE_SPEED * delta,
    );

    group.current.position.add(velocity.current);

    // Rotate character to face movement direction
    if (direction.current.length() > 0) {
      const targetRotation = Math.atan2(
        direction.current.x,
        direction.current.z,
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotation,
        ROTATION_SPEED * delta,
      );
    }

    // Camera follow
    const cameraOffset = new THREE.Vector3(0, 3, 5);
    const targetPosition = group.current.position.clone().add(cameraOffset);
    camera.position.lerp(targetPosition, 5 * delta);
    camera.lookAt(group.current.position);

    // Keep player within bounds
    const BOUNDARY = 45;
    group.current.position.x = Math.max(
      -BOUNDARY,
      Math.min(BOUNDARY, group.current.position.x),
    );
    group.current.position.z = Math.max(
      -BOUNDARY,
      Math.min(BOUNDARY, group.current.position.z),
    );
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model
useGLTF.preload("/character_walk.glb");
