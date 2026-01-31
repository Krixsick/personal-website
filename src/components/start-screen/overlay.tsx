import { useState } from "react";
import { CreditScreen } from "./credits";
export function Overlay() {
  const [overlayStatus, setOverlayStatus] = useState(true);
  const [resume, setResume] = useState(false);
  return (
    <>
      {overlayStatus && (
        <div className="w-full h-full opacity-50 bg-black flex justify-center items-center flex-col">
          <div>
            <div>
              <p>Linus Gao</p>
            </div>
            <div>
              <button
                onClick={() => {
                  setOverlayStatus(!overlayStatus);
                }}
              >
                Play
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setResume(!resume);
                }}
              >
                Resume
              </button>
            </div>
            <div>
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("credits_button").showModal()
                }
              >
                Credits
              </button>
              <dialog id="credits_button" className="modal">
                <CreditScreen></CreditScreen>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
