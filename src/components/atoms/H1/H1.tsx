import { CSSProperties, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import css from "./H1.module.scss";
import useGsapRef from "../../../hooks/useGsapRef";
import SpanSplitter from "../SpanSplitter/SpanSplitter";

type Props = {
  className?: string,
  style?: CSSProperties,
  children: string,
}

const H1 = ({ className, style, children }: Props) => {
  const h1ref = useRef<HTMLHeadingElement | null>(null);

  useGsapRef(() => {
    ScrollTrigger.create({
      trigger: h1ref.current,
      start: "bottom bottom",
      end: "bottom top",
      toggleClass: css["animated"],
      onToggle: () => {
        const classList = h1ref.current?.classList;
        classList?.toggle(css["active"]);
        classList?.toggle(css["initial"]);
      }
    });
  });
  
  return(
    <h1
      ref={h1ref}
      className={`${css["wrapper"]} ${css["initial"]}${className ? ` ${className}` : ""}`}
      style={style}
    >
      <SpanSplitter
        className={css["text"]}
        by="letter"
        delayLerp={0.05}
      >{children}</SpanSplitter>
    </h1>
  );
}

export default H1;