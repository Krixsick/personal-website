import type React from "react";
import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface AuroraShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Aurora wave speed
   * @default 1.0
   */
  speed?: number;

  /**
   * Light intensity and brightness
   * @default 1.0
   */
  intensity?: number;

  /**
   * Color vibrancy and saturation
   * @default 1.0
   */
  vibrancy?: number;

  /**
   * Wave frequency and complexity
   * @default 1.0
   */
  frequency?: number;

  /**
   * Vertical stretch of aurora bands
   * @default 1.0
   */
  stretch?: number;
}

export const AuroraShaders = forwardRef<HTMLDivElement, AuroraShadersProps>(
  (
    {
      className,
      speed = 1.0,
      intensity = 1.0,
      vibrancy = 1.0,
      frequency = 1.0,
      stretch = 1.0,
      children,
      ...props
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let animationFrameId: number;
      let time = 0;

      const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };

      resize();
      window.addEventListener("resize", resize);

      // Noise function
      const noise = (x: number, y: number): number => {
        const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
        return n - Math.floor(n);
      };

      const smoothNoise = (x: number, y: number): number => {
        const ix = Math.floor(x);
        const iy = Math.floor(y);
        const fx = x - ix;
        const fy = y - iy;

        const a = noise(ix, iy);
        const b = noise(ix + 1, iy);
        const c = noise(ix, iy + 1);
        const d = noise(ix + 1, iy + 1);

        const ux = fx * fx * (3 - 2 * fx);
        const uy = fy * fy * (3 - 2 * fy);

        return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
      };

      const animate = () => {
        time += 0.01 * speed;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const width = canvas.width;
        const height = canvas.height;

        // Create aurora gradient effect
        for (let y = 0; y < height; y += 2) {
          for (let x = 0; x < width; x += 2) {
            const nx = x / width;
            const ny = y / height;

            // Create vertical gradient for aurora positioning
            const verticalGradient = 1 - Math.abs(ny - 0.5) * 2;
            const stretchedGradient = Math.pow(verticalGradient, stretch);

            // Create flowing horizontal movement
            const flowX = nx + time * 0.1;
            const flowY = ny;

            // Generate multiple aurora layers
            const scale = frequency * 3;
            const aurora1 = smoothNoise(flowX * scale + time * 0.2, flowY * scale);
            const aurora2 = smoothNoise(flowX * scale * 0.7 + time * 0.15 + 10, flowY * scale * 0.7 + 10);
            const aurora3 = smoothNoise(flowX * scale * 1.3 + time * 0.25 + 20, flowY * scale * 1.3 + 20);

            // Add wave distortion
            const wave1 = Math.sin(nx * 8 + time * 2) * 0.1;
            const wave2 = Math.sin(nx * 12 + time * 1.5) * 0.05;
            const distortedY = ny + wave1 + wave2;

            // Apply vertical positioning to aurora layers
            const smoothstep = (edge0: number, edge1: number, x: number) => {
              const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
              return t * t * (3 - 2 * t);
            };

            let a1 = aurora1 * smoothstep(0.3, 0.7, distortedY) * smoothstep(0.8, 0.6, distortedY);
            let a2 = aurora2 * smoothstep(0.4, 0.6, distortedY) * smoothstep(0.7, 0.5, distortedY);
            let a3 = aurora3 * smoothstep(0.35, 0.65, distortedY) * smoothstep(0.75, 0.55, distortedY);

            // Combine aurora layers
            const combinedAurora = (a1 * 0.6 + a2 * 0.8 + a3 * 0.4) * stretchedGradient * intensity;

            // Create aurora color palette
            const color1 = { r: 0, g: 204, b: 102 };  // Green
            const color2 = { r: 51, g: 102, b: 255 };  // Blue
            const color3 = { r: 204, g: 51, b: 204 };  // Purple
            const color4 = { r: 0, g: 255, b: 204 };  // Cyan

            // Create color zones
            const colorMix1 = smoothstep(0.2, 0.4, ny);
            const colorMix2 = smoothstep(0.4, 0.6, ny);
            const colorMix3 = smoothstep(0.6, 0.8, ny);

            // Mix colors
            const mixColor = (c1: typeof color1, c2: typeof color1, t: number) => ({
              r: c1.r * (1 - t) + c2.r * t,
              g: c1.g * (1 - t) + c2.g * t,
              b: c1.b * (1 - t) + c2.b * t,
            });

            let finalColor = mixColor(color1, color2, colorMix1);
            finalColor = mixColor(finalColor, color3, colorMix2);
            finalColor = mixColor(finalColor, color4, colorMix3);

            // Apply vibrancy
            const gray = finalColor.r * 0.299 + finalColor.g * 0.587 + finalColor.b * 0.114;
            finalColor = {
              r: gray * (1 - vibrancy) + finalColor.r * vibrancy,
              g: gray * (1 - vibrancy) + finalColor.g * vibrancy,
              b: gray * (1 - vibrancy) + finalColor.b * vibrancy,
            };

            // Apply aurora intensity
            finalColor.r *= combinedAurora;
            finalColor.g *= combinedAurora;
            finalColor.b *= combinedAurora;

            // Add atmospheric glow
            const horizonGlow = Math.exp(-Math.abs(ny - 0.5) * 8) * 0.1;
            finalColor.r += finalColor.r * horizonGlow;
            finalColor.g += finalColor.g * horizonGlow;
            finalColor.b += finalColor.b * horizonGlow;

            // Clamp values
            const r = Math.max(0, Math.min(255, finalColor.r));
            const g = Math.max(0, Math.min(255, finalColor.g));
            const b = Math.max(0, Math.min(255, finalColor.b));

            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
            ctx.fillRect(x, y, 2, 2);
          }
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animationFrameId);
      };
    }, [speed, intensity, vibrancy, frequency, stretch]);

    return (
      <div className={cn("relative w-full h-full", className)} ref={ref} {...props}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ filter: "blur(20px)" }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

AuroraShaders.displayName = "AuroraShaders";

export default AuroraShaders;