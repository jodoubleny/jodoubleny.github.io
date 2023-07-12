import { forwardRef } from "react";
import css from "./IconText.module.scss";
import { EmbeddedSvg } from "../../../assets/images/SvgGroups";
import SvgHelper from "../SvgHelper/SvgHelper";

type Props =  {
  icon: EmbeddedSvg,
  className?: string,
  color: string,
  bgColor: string,
  isFilled?: boolean,
  isStroked?: boolean,
  strokeWidth?: number,
  children: string,
}

const IconText = forwardRef<HTMLDivElement | null, Props>(
  ({ icon, className, color, bgColor, isFilled, isStroked, strokeWidth, children }, ref) => {
    return(
      <div
        ref={ref}
        className={`${css["container"]}${className ? ` ${className}` : ""}`}
        style={{ backgroundColor: bgColor }}
      >
        <div className={css["icon-wrapper"]}>
          <SvgHelper
            viewBox={icon.viewBox}
            fill={isFilled === undefined ? undefined : (isFilled ? color : "none")}
            stroke={isStroked === undefined ? undefined : (isStroked ? color : "none")}
            strokeWidth={(isStroked && strokeWidth !== undefined) ? strokeWidth : undefined}
          >{icon.elements}</SvgHelper>
        </div>
        <div
          className={css["text"]}
          style={{ color: color }}
        >{children}</div>
      </div>
    );
  }
);

export default IconText;