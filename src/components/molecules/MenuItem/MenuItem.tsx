import { MouseEvent, useRef } from "react";
import css from "./MenuItem.module.scss";
import Ticker from "../../atoms/Ticker/Ticker";
import useNavStore from "../../../stores/useNavStore";
import SvgGroups from "../../../assets/images/SvgGroups";
import SvgHelper from "../../atoms/SvgHelper/SvgHelper";
import scss from "../../../assets/styles/export";

type Props = {
  scrollTo: string,
  children: string,
  onAnchorClick: (event: MouseEvent<HTMLAnchorElement>) => void,
}

const MenuItem = ({
  scrollTo,
  onAnchorClick: handleAnchorClick,
  children,
}: Props) => {
  const { isOpen } = useNavStore();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  return(
    <div
      ref={containerRef}
      className={`${css["container"]}${isOpen ? ` ${css["open"]}` : ` ${css["closed"]}`}`}
    >
      <a
        ref={anchorRef}
        href={`#${scrollTo}`}
        data-lenis-scroll-to={scrollTo}
        onClick={handleAnchorClick}
      ><Ticker repeat={1}>{children}</Ticker></a>
      <div className={css["icon-wrapper"]}>
        <div className={`${css["icon"]}${isOpen ? ` ${css["open"]}` : ` ${css["closed"]}`}`}>
          <SvgHelper
            viewBox={SvgGroups.diagonalArrow.viewBox}
            fill={scss.white}
          >{SvgGroups.diagonalArrow.elements}</SvgHelper>
        </div>
      </div>
    </div>
  )
};

export default MenuItem;