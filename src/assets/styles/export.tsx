import css from "./export.module.scss";
css; // force loading scss module

const scss = {
  //timing
  loadingExit: Number.parseFloat(css.loadingExit.replace("s", "")),
  portfolioTiming: Number.parseFloat(css.portfolioTiming.replace("s", "")),
  // size
  maxWidth: Number.parseFloat(css.maxWidth.replace("px", "")),
  // color
  white: css.white,
  black: css.black,
  gray: css.gray,
  darkGray: css.darkGray,
  tomato: css.tomato,
  lightGray: css.lightGray,
}

export default scss;