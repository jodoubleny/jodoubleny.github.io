import { useRef, Children, isValidElement, cloneElement, CSSProperties, useState, useEffect, ReactNode, ReactElement, PropsWithChildren, forwardRef } from "react";
import css from "./SvgHelper.module.scss";

type Props = PropsWithChildren & {
  viewBox: string,
  className?: string,
  style?: CSSProperties,
  fill?: string | "none",
  stroke?: string | "none",
  strokeWidth?: number,
  isAnimated?: boolean,
  isPlaying?: boolean,
  duration?: string,
  delay?: string,
  repeat?: number | "infinite",
}

const SvgHelper = forwardRef<SVGSVGElement | null, Props>(({
  viewBox,
  children,
  className,
  style,
  fill = "none",
  stroke = "none",
  strokeWidth = 1,
  isAnimated = false,
  isPlaying = false,
  duration = "1s",
  delay = "0s",
  repeat = "infinite",
}, ref) => {
const childRefs = useRef(new Array<SVGGeometryElement | null>());
const [totalLength, setTotalLength] = useState<Number>();

useEffect(() => {
  if (!childRefs.current) return;
  let totalLength = 0;
  childRefs.current?.forEach((el) => {
    totalLength += el?.getTotalLength() ?? 0;
  });
  setTotalLength(Math.ceil(totalLength));
}, []);

return(
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox}
    className={`${css["default"]}${isAnimated ? ` ${css["animation-ready"]}` : ""}${isPlaying ? ` ${css["playing"]}` : ""}${className ? ` ${className}` : ""}`}
    style={{
      "--fill": fill,
      "--stroke": stroke,
      "--stroke-width": strokeWidth,
      "--line-length": totalLength ?? 0,
      "--duration": duration,
      "--delay": delay,
      "--repeat": repeat,
      ...style
    } as CSSProperties }
  >
  {Children.map(children, (child) => {
    if (!child) return;
    if (!isValidElement) return child;

    const propsChildren: ReactElement | ReactElement[] = (child as ReactElement).props.children;
    let svgChildren: ReactElement[];
    if (Array.isArray(propsChildren)) svgChildren = propsChildren;
    else svgChildren = [propsChildren];
    const newSvgChildren = svgChildren.map((svgChild, index) => {
      return cloneElement(svgChild, { ref: (el: SVGGeometryElement | null) => childRefs.current?.push(el), key: index });
    })
    return cloneElement(child as ReactElement, {} , newSvgChildren);
  })}
  </svg>
);
});

export default SvgHelper;