import { useRef } from "react";
import Images from "../../../assets/images/Images";
import useGsapRef from "../../../hooks/useGsapRef";
import SpanSplitter from "../../atoms/SpanSplitter/SpanSplitter";
import css from "./Middle.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {}

const Middle = ({}: Props) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useGsapRef(() => {
    gsap.to(backgroundRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 3,
      },
      top: ((sectionRef.current?.getBoundingClientRect().height ?? 0) - (backgroundRef.current?.getBoundingClientRect().height ?? 0)),
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "bottom bottom",
      end: "bottom top",
      onEnter: () => containerRef.current?.classList.add(css["animated"]),
      onLeaveBack: () => containerRef.current?.classList.remove(css["animated"]),
    });
  });

  return(
    <div
      ref={sectionRef}
      className={css["wrapper"]}
    >
      <div
        ref={containerRef}
        className={css["container"]}
      >
        <SpanSplitter
          by="word"
          className={css["text"]}
          delayLerp={0.06}
        >Simplify the Complex</SpanSplitter>
        <br />
        <SpanSplitter
          by="word"
          className={css["text"]}
          delayLerp={0.06}
          delayIndexBase={3}
        >Amplify the Impact</SpanSplitter>
      </div>
      <div
        ref={backgroundRef}
        className={css["background"]}
        style={{ backgroundImage: `url(${Images.toronto})`}}
      ></div>
    </div>
  );
}

export default Middle;