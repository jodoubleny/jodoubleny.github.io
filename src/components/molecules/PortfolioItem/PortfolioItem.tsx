import usePortfolioStore from "../../../stores/usePortfolioStore";
import SquareImg from "../../atoms/SquareImg/SquareImg";
import css from "./PortfolioItem.module.scss";
import LinkButton from "../LinkButton/LinkButton";
import SvgGroups from "../../../assets/images/SvgGroups";
import SvgHelper from "../../atoms/SvgHelper/SvgHelper";
import scss from "../../../assets/styles/export";
import { PropsWithChildren, forwardRef } from "react";

type Props = PropsWithChildren & {
  title: string,
  src?: string,
  subTitle?: string,
  gitHub?: string,
  live?: string,
}

const PortfolioItem = forwardRef<HTMLDivElement | null, Props>(({
    title,
    src,
    subTitle,
    children,
    gitHub,
    live,
  }, ref) => {
  const { isActive } = usePortfolioStore();

  return (
    <div
      ref={ref}
      className={`${css["container"]}${isActive ? ` ${css["active"]}` : ""}`}>
      {/* title starts */}
      <div className={`${css["title-container"]}${isActive ? ` ${css["active"]}` : ""}`}>
        <h2 className={css["portfolio"]}>{title}</h2>
        {subTitle && (<span className={css["sub-title"]}>{subTitle}</span>)}
      </div>
      {/* title ends */}
      {/* image starts */}
      <div className={css["image-wrapper"]}>
        {src ? <SquareImg src={src} /> : <div className={css["no-img"]}></div>}
      </div>
      {/* image ends */}
      {/* desc starts */}
      <div className={`${css["desc-container"]}${isActive ? ` ${css["active"]}` : ""}`}>
        <div className={`${css["arrow-wrapper"]}${isActive ? ` ${css["active"]}` : ""}`}>
          <SvgHelper
            viewBox={SvgGroups.diagonalArrow.viewBox}
            fill={isActive ? scss.darkGray : scss.gray}
            className={css["arrow"]}
          >{SvgGroups.diagonalArrow.elements}</SvgHelper>
        </div>
        <div className={css["desc-wrapper"]}>{children}</div>
        {(gitHub || live) && (
        <div className={css["link-buttons-container"]}>
          {gitHub && (
          <div className={css["link-button-wrapper"]}>
            <LinkButton
              icon={SvgGroups.gitHub}
              href={gitHub}
              isFilled={true}
              primaryColor={scss.tomato}
              secondaryColor={isActive ? scss.black : scss.white}
            >Github</LinkButton>
          </div>
          )}
          {live && (
          <div className={css["link-button-wrapper"]}>
            <LinkButton
              icon={SvgGroups.link}
              href={live}
              isFilled={false}
              isStroked={true}
              strokeWidth={1.5}
              primaryColor={scss.tomato}
              secondaryColor={isActive ? scss.black : scss.white}
            >Live</LinkButton>
          </div>
          )}
        </div>
        )}
      </div>
      {/* desc ends */}
    </div>
  );
});

export default PortfolioItem;