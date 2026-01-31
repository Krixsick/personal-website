import { useState } from "react";
import { CreditScreen } from "./credits";

interface OverlayProps {
  onStart: () => void;
}

export function Overlay({ onStart }: OverlayProps) {
  return (
    <div className="w-full h-full bg-black/70 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg text-white">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">Linus Gao</h1>
          <p className="text-gray-400">Winter Explorer</p>
        </div>

        <div className="space-y-3">
          <button onClick={onStart} className="btn btn-primary w-full text-lg">
            Start Game
          </button>

          <button
            className="btn btn-secondary w-full"
            onClick={() =>
              (document.getElementById("credits_button") as any)?.showModal()
            }
          >
            Credits
          </button>
        </div>

        <dialog id="credits_button" className="modal">
          <CreditScreen />
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
