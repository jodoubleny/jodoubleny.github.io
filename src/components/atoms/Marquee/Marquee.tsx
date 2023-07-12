import { PropsWithChildren, useEffect, useRef, useState } from "react";
import gsap, { Power0 } from "gsap";
import css from "./Marquee.module.scss";
import useResize from "../../../hooks/useResize";

type Props = PropsWithChildren & {
  isScrubbed?: boolean,
  toRight?: boolean,
  duration?: number,
  repeat?: number,
  className?: string,
}

const Marquee = ({ isScrubbed = false, toRight = false, duration = 1, repeat = -1, className, children }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [repeatChildren, setRepeatChildren] = useState(0);

  useEffect(() => {
    const childrenWidth = childrenRef.current?.getBoundingClientRect().width;
    if (!childrenWidth) return;
    const newRepeat = Math.ceil(containerWidth / childrenWidth) + 1;
    setRepeatChildren(newRepeat);
  }, [containerWidth]);

  useResize(({ width }) => {
    if (!width) return;
    setContainerWidth(width);
  });

  useEffect(() => {
    gsap.context(() => {

      const options = {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: true,
        }
      } as gsap.TimelineVars;

      const childrenWidth = childrenRef.current?.getBoundingClientRect().width;
      if (childrenWidth !== undefined) {
        gsap.timeline(isScrubbed ? options : undefined)
        .fromTo(
          containerRef.current,
          { x: `-${childrenWidth}px` },
          { x: `${toRight ? 0 : `-${childrenWidth * 2}px`}`, ease: Power0.easeNone, duration: duration }
        )
        .repeat(repeat)
      }

    });
  }, []);

  return(
    <div
      className={`${css["wrapper"]}${className ? ` ${className}` : ""}`}
    >
      <div
        ref={containerRef}
        className={css["container"]}
      >
        <div ref={childrenRef}>{children}</div>
        {repeatChildren > 0 && (
          [...Array(repeatChildren)].map((_, index) => (
            <div key={index}>{children}</div>
          ))
        )}
      </div>
    </div>
  );
}

export default Marquee;