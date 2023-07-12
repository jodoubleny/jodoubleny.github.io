import { useEffect, useRef,  } from "react";
import css from "./Loading.module.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import scss from "../../../assets/styles/export";
import useGsapRef from "../../../hooks/useGsapRef";
import gsap from "gsap";
import Cod from "../../atoms/Cod/Cod";
import Marquee from "../../atoms/Marquee/Marquee";

type Props = {
  isIndexLoading: boolean,
}

const Loading = ({ isIndexLoading }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const gsapRef = useGsapRef((self) => {
    // prevent scrolling during the loading animation
    gsap.set(document.documentElement, { overflow: "hidden" });

    self?.add("handleExit", () => {
      gsap.timeline({
        onComplete: () => ScrollTrigger.refresh(),
      })
        .to(containerRef.current, {
          height: "0vh",
          duration: scss.loadingExit,
          ease: "power4.inOut",
        })
        .set(containerRef.current, { display: "none" }, ">")
        .set(document.documentElement, { overflow: "inherit" }, "<");
    });
  });

  useEffect(() => {
    if (!isIndexLoading) gsapRef.current?.handleExit();
  }, [isIndexLoading]);

  return (
    <div
      ref={containerRef}
      className={css["container"]}
    >
      <Marquee
        className={css["marquee"]}
        duration={2}
      ><div className={css["text"]}>Now Loading</div></Marquee>
      <div className={css["cod-container"]}>
        <div className={css["cod-wrapper"]}>
          <Cod className={css["cod"]} />
        </div>
        <div>by Jonny Park</div>
      </div>
    </div>
  );
}

export default Loading;