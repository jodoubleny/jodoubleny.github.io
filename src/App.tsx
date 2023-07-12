import { MutableRefObject, Suspense, createContext, lazy, useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.scss";
import Loading from "./components/organisms/Loading/Loading";

const Index = lazy(() => import("./components/templates/Index"));

// for GSAP and ScrollTrigger starts
if (window !== undefined) gsap.registerPlugin(ScrollTrigger); // for SSR
gsap.registerPlugin(ScrollTrigger);

// for providing a context of Lenis, a smooth scroll plugin 
export const LenisCtx = createContext<MutableRefObject<Lenis | null> | undefined>(undefined);

const App = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const [isIndexLoading, setIsIndexLoading] = useState(true);
  const handleLoad = (isLoading: boolean) => setIsIndexLoading(isLoading);

  // set up Lenis and GSAP & ScrollTrigger
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 2.5,
      smoothTouch: false,
    });

    lenisRef.current.on("scroll", () => {
      ScrollTrigger.update;
    });
    gsap.ticker.add((time) => {  lenisRef.current?.raf(time * 1000) });
  }, []);

  return (
    <LenisCtx.Provider value={lenisRef}>
      <Loading isIndexLoading={isIndexLoading} />
      <Suspense>
        <Index onLoad={handleLoad} />
      </Suspense>
    </LenisCtx.Provider>
  )
}

export default App;