import { useEffect, useState } from "react";

type WindowSize = {
  width?: number,
  height?: number,
};

type Callback = (windowSize: WindowSize) => void

const useResize = (callback: Callback) => {
  const [windowSize, setWindowSize] = useState<WindowSize>();

  useEffect(() => {
    const handleResize = () => {
      const currentSize = {
        width: document.documentElement.getBoundingClientRect().width || window.innerWidth,
        height: document.documentElement.getBoundingClientRect().height || window.innerHeight,
      }
  
      setWindowSize(currentSize);
      callback(currentSize);
    };

    handleResize(); // initialize

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

export default useResize;