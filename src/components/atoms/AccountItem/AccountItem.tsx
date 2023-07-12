import { EmbeddedSvg } from "../../../assets/images/SvgGroups";
import SvgHelper from "../SvgHelper/SvgHelper";
import css from "./AccountItem.module.scss";

type Props = {
  href: string,
  children: string,
  src?: EmbeddedSvg,
  stroke?: string,
  fill?: string,
  strokeWidth?: number,
}

const AccountItem = ({ href, children, src, fill, stroke, strokeWidth }: Props) => {
  return(
    <a
      href={href}
      className={css["anchor"]}
    >
      <span>{children}</span>
      {src && (
      <SvgHelper
        viewBox={src.viewBox}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={css["icon"]}
      >{src.elements}</SvgHelper>
      )}
    </a>
  );
}

export default AccountItem;