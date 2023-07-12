import { forwardRef, useEffect, useState } from "react";
import css from "./Footer.module.scss";
import H1 from "../../atoms/H1/H1";
import scss from "../../../assets/styles/export";
import AccountItem from "../../atoms/AccountItem/AccountItem";
import SvgGroups from "../../../assets/images/SvgGroups";
import Container from "../../atoms/Container/Container";
import SvgHelper from "../../atoms/SvgHelper/SvgHelper";
import MarkerSpan from "../../atoms/MarkerSpan/MarkerSpan";

type Props = {}

type LocalTime = {
  hour: string,
  minute: string,
  dayPeriod: string,
  timeZone: string,
}

const Footer = forwardRef<HTMLDivElement | null, Props>(({ }, ref) => {
  const [localTime, setLocalTime] = useState<LocalTime>();

  useEffect(() =>{
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        timeZone: "Canada/Eastern",
        timeZoneName: "short",
      };
      const dateTimeFormat = new Intl.DateTimeFormat("en-CA", options);
      const parts = dateTimeFormat.formatToParts(date);
      let partMap = new Map();
      parts.forEach(p => {
        if (["hour", "minute", "dayPeriod", "timeZoneName"].includes(p.type)) partMap.set(p.type, p.value);
      });
      setLocalTime({
        hour: partMap.get("hour"),
        minute: partMap.get("minute"),
        dayPeriod: partMap.get("dayPeriod"),
        timeZone: partMap.get("timeZoneName"),
      });
    }
    updateTime(); // initialize
    const interval = setInterval(updateTime, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <footer ref={ref}>
      <Container className={css["footer"]}>
        <H1>Contact</H1>
        <div className={css["slogan"]}>
          <span>Let's bring your vision</span>
          <span>to real <MarkerSpan>together!</MarkerSpan></span>
          <div className={css["local"]}>
            <span>Toronto</span>
            <div className={css["local-svg-wrapper"]}>
              <SvgHelper
                viewBox={SvgGroups.cnTower.viewBox}
                stroke={scss.black}
                strokeWidth={1.5}
                className={css["cn-tower"]}
              >{SvgGroups.cnTower.elements}</SvgHelper>
            </div>
            <span>
              <span>{localTime?.hour}</span>
              <span className={css["divider"]}>:</span>
              <span>{localTime?.minute}</span>&nbsp;
              <span>{localTime?.dayPeriod}</span>&nbsp;
              <span>{localTime?.timeZone}</span>
            </span>
          </div>
        </div>
        <div className={css["accounts-container"]}>
          <AccountItem
            href="mailto:jonpardev@gmail.com"
            src={SvgGroups.gmail}
            fill={scss.gray}
          >jonpardev@gmail.com</AccountItem>
          <AccountItem
            href="https://github.com/jonpardev"
            src={SvgGroups.gitHub}
            fill={scss.gray}
          >github.com/jonpardev</AccountItem>
          <AccountItem
            href="https://www.linkedin.com/in/jonpardev/"
            src={SvgGroups.linkedIn}
            fill={scss.gray}
          >linkedin.com/in/jonpardev</AccountItem>
        </div>
        <div className={css["the-last"]}>Jonny Park © 2023</div>
      </Container>
    </footer>
  );
});

export default Footer;