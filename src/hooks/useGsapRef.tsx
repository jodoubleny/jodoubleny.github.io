import { useEffect, useRef } from "react";
import gsap from "gsap";

type Callback = (self?: gsap.Context) => void

const useGsapRef = (callback: Callback) => {
  const gsapRef = useRef<gsap.Context>();
  
  useEffect(() => {
    gsapRef.current = gsap.context(callback);
    return () => {
      gsapRef.current!.revert();
      gsapRef.current = undefined;
    }
  }, []);

  return gsapRef;
}

export default useGsapRef;