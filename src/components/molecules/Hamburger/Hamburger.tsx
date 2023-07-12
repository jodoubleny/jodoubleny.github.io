import { useState, MouseEvent, useContext } from "react";
import Ticker from "../../atoms/Ticker/Ticker";
import css from "./Hamburger.module.scss";
import useNavStore from "../../../stores/useNavStore";
import { LenisCtx } from "../../../App";
import useTouchDeviceStore from "../../../stores/useTouchDeviceStore";

const Hamburger = () => {
  const lenisRef = useContext(LenisCtx);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isOpen, setIsOpen } = useNavStore();
  const { isTouchDevice } = useTouchDeviceStore();

  const handleMouseOverOut = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isTouchDevice) return; // ignore all hover style if the device is mobile
    event.currentTarget.classList.toggle(css["hover"]);
    setIsAnimating(() => {
      if (event.type === "mouseover") return true;
      else return false;
    });
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (lenisRef?.current?.isStopped) lenisRef?.current?.start(); // enable scrolling
    else lenisRef?.current?.stop(); // disable scrolling
    setIsOpen((prev) => (!prev));
    setIsAnimating(prev => (!prev));
  }

  return (
    <button
      className={css["container"]}
      onMouseOver={handleMouseOverOut}
      onMouseOut={handleMouseOverOut}
      onClick={handleClick}
    >
      <Ticker
        isAnimating={isAnimating}
        className={`${css["ticker"]}${isOpen ? ` ${css["active"]}` : ""}`}
      >{isOpen ? "Close" : "Menu"}</Ticker>
      <div className={`${css["hamburger"]}${isOpen ? ` ${css["active"]}` : ""}`} ></div>
    </button>
  );
}

export default Hamburger;