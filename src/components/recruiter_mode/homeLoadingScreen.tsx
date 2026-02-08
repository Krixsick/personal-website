import { useProgress } from "@react-three/drei";

export function HomeLoadingScreen() {
  const { progress, active } = useProgress();
  if (!active || progress >= 100) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-500">
      <div className="w-[300px] flex flex-col gap-2">
        <p className="text-cyan-400 font-mono text-sm uppercase tracking-wider text-center animate-pulse">
          Initializing Environment... {Math.round(progress)}%
        </p>
        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
          {/* Moving Bar */}
          <div
            className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
