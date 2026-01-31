import type React from "react";
import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface AuroraShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  intensity?: number;
  vibrancy?: number;
  frequency?: number;
  stretch?: number;
}

export const AuroraShaders = forwardRef<HTMLDivElement, AuroraShadersProps>(
  ({ className, speed = 1.0, intensity = 1.0, children, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", {
        alpha: true,
        willReadFrequently: false,
      });
      if (!ctx) return;

      let animationFrameId: number;
      let time = 0;

      const resize = () => {
        // Render at lower resolution for better performance
        const scale = 0.5;
        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;
      };

      resize();
      window.addEventListener("resize", resize);

      // Aurora colors - more vibrant
      const colors = [
        { r: 0, g: 255, b: 150 }, // Bright Green (Northern Lights)
        { r: 100, g: 150, b: 255 }, // Sky Blue
        { r: 200, g: 100, b: 255 }, // Purple
        { r: 0, g: 200, b: 255 }, // Cyan
      ];

      const animate = () => {
        time += 0.008 * speed;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw aurora gradient blobs
        colors.forEach((color, index) => {
          const offset = (index * Math.PI * 2) / colors.length;

          // Position in upper portion of screen (sky area)
          const baseY = canvas.height * 0.3; // Keep in top 30% of screen
          const x =
            canvas.width / 2 + Math.cos(time + offset) * (canvas.width * 0.35);
          const y =
            baseY + Math.sin(time * 0.7 + offset) * (canvas.height * 0.15);
          const radius =
            canvas.width * 0.5 +
            Math.sin(time * 1.5 + offset) * (canvas.width * 0.15);

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

          // Much more visible - increased opacity significantly
          const alpha = intensity * 0.4; // Increased from 0.15 to 0.4
          gradient.addColorStop(
            0,
            `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`,
          );
          gradient.addColorStop(
            0.5,
            `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.3})`,
          );
          gradient.addColorStop(1, "transparent");

          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        });

        // Add some atmospheric shimmer
        const shimmerCount = 3;
        for (let i = 0; i < shimmerCount; i++) {
          const shimmerX = (Math.sin(time * 2 + i) * 0.5 + 0.5) * canvas.width;
          const shimmerY = canvas.height * 0.2 + Math.cos(time * 1.5 + i) * 50;
          const shimmerRadius = 80 + Math.sin(time * 3 + i) * 30;

          const shimmerGradient = ctx.createRadialGradient(
            shimmerX,
            shimmerY,
            0,
            shimmerX,
            shimmerY,
            shimmerRadius,
          );

          shimmerGradient.addColorStop(
            0,
            `rgba(255, 255, 255, ${intensity * 0.2})`,
          );
          shimmerGradient.addColorStop(1, "transparent");

          ctx.fillStyle = shimmerGradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animationFrameId);
      };
    }, [speed, intensity]);

    return (
      <div
        className={cn("relative w-full h-full", className)}
        ref={ref}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            filter: "blur(40px)", // Reduced blur from 60px to 40px for more definition
            opacity: 0.9, // Slight transparency
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

AuroraShaders.displayName = "AuroraShaders";

export default AuroraShaders;
