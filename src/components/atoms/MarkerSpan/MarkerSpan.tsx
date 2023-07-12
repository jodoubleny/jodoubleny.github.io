import { CSSProperties, useRef } from "react";
import css from "./MarkerSpan.module.scss";
import scss from "../../../assets/styles/export";
import useGsapRef from "../../../hooks/useGsapRef";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = JSX.IntrinsicElements["span"] & {
  className?: string,
  style?: CSSProperties,
  markerColor?: string,
  isMarked?: boolean,
  children: string,
}

const MarkerSpan = ({ className, style, markerColor = scss.tomato, isMarked = false, children, ...props }: Props) => {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  useGsapRef(() => {
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "bottom bottom",
      end: "bottom top",
      toggleClass: css["marked"],
    });
  });

  return(
    <span {...props}
      ref={wrapperRef}
      className={`${css["wrapper"]}${className ? ` ${className}` : ""}`}
      style={{ "--marker-color": markerColor, ...style } as CSSProperties}
    ><span>{children}</span></span>
  );
}

export default MarkerSpan;