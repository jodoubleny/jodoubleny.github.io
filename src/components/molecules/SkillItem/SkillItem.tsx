import { CSSProperties, useEffect, useRef, useState } from "react";
import css from "./SkillItem.module.scss";
import { EmbeddedSvg } from "../../../assets/images/SvgGroups";
import SvgHelper from "../../atoms/SvgHelper/SvgHelper";
import useGsapRef from "../../../hooks/useGsapRef";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import scss from "../../../assets/styles/export";

type Props = {
  title: string,
  children: string,
  src: EmbeddedSvg,
  strokeWidth?: number,
  svgStyle? : CSSProperties,
  colNumber?: number,
  colStart?: number,
}

const SkillItem = ({
    title,
    children,
    src,
    strokeWidth,
    svgStyle,
    colNumber = 2,
    colStart = 1,
  }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [colSpan, setColSpan] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const colSpanString = window.getComputedStyle(containerRef.current).getPropertyValue("--col-span");
    const colSpan = Number.parseInt(colSpanString);
    setColSpan(colSpan)
  }, []);

  useGsapRef(() => {
    ScrollTrigger.create({
      trigger: svgWrapperRef.current,
      start: "top bottom",
      end: "bottom bottom",
      onLeave: () => setIsAnimating(true),
      onLeaveBack: () => setIsAnimating(false),
    });
  });

  return(
    <div
      ref={containerRef}
      className={css["container"]}
      style={{
        "--col-number": colNumber,
        "--col-start": ((colNumber - colStart + 1) < colSpan) ? (colNumber - colSpan + 1) : colStart,
      } as CSSProperties }
    >
      <div className={`${css["wrapper"]} ${css["title-wrapper"]}`}>
        <h2 className={`${css["skills"]}${isAnimating ? ` ${css["animated"]}` : ""}`}>{title}</h2>
      </div>
      <div className={`${css["wrapper"]} ${css["desc-wrapper"]}`}>
        <div className={css["desc"]}>{children}</div>
      </div>
      <div className={`${css["wrapper"]} ${css["icon-wrapper"]}`}>
        {/* below */}
        <div className={css["svg-wrapper"]}>
          <SvgHelper
            viewBox={src.viewBox}
            stroke={scss.lightGray}
            strokeWidth={strokeWidth ? strokeWidth - 0.25 : undefined}
            style={svgStyle}
          >{src.elements}</SvgHelper>
        </div>
        {/* above */}
        <div
          ref={svgWrapperRef}
          className={`${css["svg-wrapper"]}${isAnimating ? ` ${css["animated"]}` : ""}`}
        >
          <SvgHelper
            viewBox={src.viewBox}
            stroke={scss.black}
            strokeWidth={strokeWidth}
            isAnimated={true}
            isPlaying={isAnimating}
            duration="3s"
            repeat={1}
            delay={css.delay}
            style={svgStyle}
          >{src.elements}</SvgHelper>
        </div>
      </div>

    </div>
  );
}

export default SkillItem;