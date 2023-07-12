import { CSSProperties, useRef } from "react";
import css from "./Hero.module.scss";
import SpanSplitter from "../../atoms/SpanSplitter/SpanSplitter";
import useGsapRef from "../../../hooks/useGsapRef";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  style?: CSSProperties,
}

const Hero = ({ style }: Props) => {
  const catchyContainerRef = useRef<HTMLDivElement | null>(null);

  useGsapRef(() => {
    ScrollTrigger.create({
      trigger: catchyContainerRef.current,
      onToggle: () => {
        const classList = catchyContainerRef.current?.classList;
        classList?.toggle(css["active"]);
        classList?.toggle(css["initial"]);
      }
    })
  });

  return(
    <div
      className={css["container"]}
      style={style}
    >
      <div
        ref={catchyContainerRef}
        className={`${css["catchy-container"]} ${css["initial"]}`}
      >
        <div className={css["row"]}>
          <SpanSplitter
            by="letter"
            delayLerp={0.04}
            className={css["catchy"]}
          >Hello,</SpanSplitter>
        </div>
        <div className={css["row"]}>
          <SpanSplitter
            by="letter"
            delayLerp={0.04}
            delayIndexBase={6}
            className={css["catchy"]}
          >World!</SpanSplitter>
        </div>
      </div>
    </div>
  );
}

export default Hero;