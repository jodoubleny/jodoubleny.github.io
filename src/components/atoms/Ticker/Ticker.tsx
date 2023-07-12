import { useRef, MouseEvent, useEffect, CSSProperties } from "react";
import css from "./Ticker.module.scss";

type Props = JSX.IntrinsicElements["span"] & {
  isAnimating?: boolean,
  repeat?: number | "infinite"
  children: string,
}

const Ticker = ({
    isAnimating,
    repeat = "infinite",
    children,
    ...props
  }: Props) => {

  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  const addHoverClassName = () => wrapperRef.current?.classList.add(css["hover"]);
  const removeHoverClass = () => wrapperRef.current?.classList.remove(css["hover"]);

  const handleMouseEnter = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    if (isAnimating === undefined) addHoverClassName();
  }

  const handleMouseLeave = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    if (isAnimating === undefined) removeHoverClass();
  }

  useEffect(() => {
    if (isAnimating === undefined) return;
    if (isAnimating) addHoverClassName();
    else removeHoverClass();
  }, [isAnimating]);

  return(
    <span {...props}>
      <span
        ref={wrapperRef}
        className={`${css["wrapper"]}${repeat === "infinite" ? ` ${css["infinite"]}` : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          className={css["target"]}
          style={{ "--ticker-repeat": repeat } as CSSProperties}
          data-text={children}
        >{children}</span>
      </span>
    </span>
  );
}

export default Ticker;