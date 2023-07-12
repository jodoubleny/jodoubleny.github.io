import { CSSProperties, useEffect, useRef } from "react";
import SvgGroups from "../../../assets/images/SvgGroups";
import scss from "../../../assets/styles/export";
import SvgHelper from "../../atoms/SvgHelper/SvgHelper";
import css from "./DownArrow.module.scss";
import gsap from "gsap";

type Props = {
  className?: string,
}

const DownArrow = ({ className }: Props) => {
  const circleTextWrapperRef = useRef<HTMLDivElement | null>(null);
  const circleTextRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const gsapCtx = gsap.context(() => {
      
      gsap.to(
        circleTextRef.current,
        {
          scrollTrigger: {
            trigger: circleTextWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
          rotateZ: "-360deg"
        }
      )

    });
    return () => gsapCtx.revert();
  }, []);
  
  return(
    <div
      className={`${css["container"]}${className ? ` ${className}` : ""}`}
    >
      <div
        ref={circleTextWrapperRef}
        className={css["circle-text-wrapper"]}
      >
        <svg ref={circleTextRef} className={css["circle-text"]} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs>
            <path id="circle" d="M10 50a40 40 0 0 1 80 0 40 40 0 0 1-80 0"/>
          </defs>
          <text className={css["circle-text-text"]}>
            <textPath xlinkHref="#circle">Scroll to down!</textPath>
          </text>
          <text className={css["circle-text-text"]} dx="125%">
            <textPath xlinkHref="#circle">Scroll to down!</textPath>
          </text>
        </svg>
      </div>
      <div className={css["arrow-svg-wrapper"]}>
        <SvgHelper
          viewBox={SvgGroups.downArrow.viewBox}
          stroke={scss.black}
          strokeWidth={6}
          className={css["down-arrow"]}
        >
          {SvgGroups.downArrow.elements}
        </SvgHelper>
      </div>
    </div>
  );
}

export default DownArrow;