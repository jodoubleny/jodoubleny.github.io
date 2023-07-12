import { useEffect, useRef, useState } from "react";
import style from "./IntroItem.module.scss";
import gsap from "gsap";
import SvgGroups from "../../../assets/images/SvgGroups";
import SvgHelper from "../../atoms/SvgHelper/SvgHelper";

type Props = {
  title: string,
  children: string,
  animationDelay?: string,
}

const IntroItem = ({ title, children, animationDelay }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<SVGSVGElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const gsapCtx = gsap.context(() => {

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: true,
          onEnter: () => setIsAnimating(true),
        }
      }).fromTo(titleRef.current, { bottom: "4rem" }, { bottom: "1rem", duration: 1 })
        .fromTo(iconRef.current, { top: "4rem" }, { top: "1rem", duration: 1 }, "<");

    });
    return () => gsapCtx.revert();
  }, []);

  return(
    <div
      ref={containerRef}
      className={style["container"]}
    >
      <div className={style["title-wrapper"]}>
        <SvgHelper
          ref={iconRef}
          className={style["icon"]}
          viewBox={SvgGroups.cnTower.viewBox}
          stroke={style.gray}
          isAnimated={true}
          isPlaying={isAnimating}
          duration="5s"
          delay={animationDelay}
          repeat={1}
        >{SvgGroups.cnTower.elements}</SvgHelper>
        <div
          ref={titleRef}
          className={style["title"]}
        >{title}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default IntroItem;