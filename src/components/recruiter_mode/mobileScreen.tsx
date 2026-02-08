import FaultyTerminal from "@/components/FaultyTerminal";
import ASCIIText from "@/components/ASCIIText";
import { Experience } from "@/components/recruiter_mode/experience";
import { Projects } from "@/components/recruiter_mode/projects";

interface MobileScreenProps {
  funScreenMode: any;
  setFunScreenMode: any;
  heroVisible: any;
}

export function MobileScreen({
  funScreenMode,
  setFunScreenMode,
  heroVisible,
}: MobileScreenProps) {
  return (
    <>
      <div className="fixed inset-0 z-0">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.6}
          pause={false}
          scanlineIntensity={0.4}
          glitchAmount={0.7}
          flickerAmount={0.7}
          noiseAmp={0.7}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#A7EF9E"
          mouseReact={false}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={0.6}
        />
      </div>
      <section className="relative h-screen w-screen z-10">
        <nav
          className={`h-[60px] w-[40%] z-10 fixed top-6 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl flex justify-center items-center`}
        >
          <p className="text-[clamp(14px,2vw,28px)] text-white font-bold inter-nor">
            Home
          </p>
        </nav>
        {/* */}
        <div className="w-screen h-full flex justify-center items-center">
          {heroVisible && (
            <ASCIIText
              text="LINUS GAO"
              enableWaves={false}
              textFontSize={55}
              asciiFontSize={4}
            />
          )}
        </div>
      </section>
      {/* Section 2 */}
      <section className="min-h-screen flex items-center justify-center flex-col">
        <div className="flex w-[50%] h-[50px] justify-center items-center bg-blue-100">
          <p>Projects</p>
        </div>
        <Projects></Projects>
      </section>
      {/* Experience Section 3*/}
      <section className="w-full min-h-screen relative z-10">
        <Experience />
        <div className="flex justify-center items-center">
          <button
            className="px-6 py-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full text-white text-sm hover:bg-black/60 transition-colors inter-nor cursor-pointer"
            onClick={() => setFunScreenMode(!funScreenMode)}
          >
            SECRET
          </button>
        </div>
      </section>
    </>
  );
}
