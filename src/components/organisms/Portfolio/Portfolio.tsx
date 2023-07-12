import { forwardRef, useRef, useImperativeHandle } from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import css from "./Portfolio.module.scss";
import H1 from "../../atoms/H1/H1";
import PortfolioItem from "../../molecules/PortfolioItem/PortfolioItem";
import usePortfolioStore from "../../../stores/usePortfolioStore";
import Section from "../../atoms/Section/Section";
import Container from "../../atoms/Container/Container";
import Images from "../../../assets/images/Images";
import MarkerSpan from "../../atoms/MarkerSpan/MarkerSpan";
import useGsapRef from "../../../hooks/useGsapRef";
import scss from "../../../assets/styles/export";

const Portfolio = forwardRef<HTMLDivElement | null>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const portfolioItemRef = useRef(new Array<HTMLDivElement | null>());
  const { isActive, setIsActive } = usePortfolioStore();

  useImperativeHandle(ref, () => sectionRef.current as HTMLDivElement);

  useGsapRef(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      onToggle: () => setIsActive((prev) => (!prev)),
    });
  });
  
  return (
    <Section
      ref={sectionRef}
      className={`${css["portfolio"]}${isActive ? ` ${css["active"]}` : ""}`}
    >
      <Container>
        <div className={css["h1-wrapper"]}>
          <H1
            className={css["h1-portfolio"]}
            style={{ color: `${isActive ? scss.white : scss.black}` }}
          >Portfolio</H1>
        </div>
        <div className={css["item-container"]}>
          <PortfolioItem
            ref={(el) => portfolioItemRef.current.push(el)}
            title="TT-SEE"
            src={Images.ttSee}
            subTitle="Toronto Subway Tracker"
            gitHub="https://github.com/jonpardev/tt-see"
            live="https://jonpardev.github.io/tt-see"
          >
            <span>Designed to deliver real-time updates on Toronto's current status, with a focus on faster access, especially in unstable network conditions. The frontend utilizes <MarkerSpan>React</MarkerSpan> with <MarkerSpan>TypeScript</MarkerSpan> and <MarkerSpan>Tailwind</MarkerSpan> for a smooth user experience. For the backend, <MarkerSpan>Express</MarkerSpan> on Node.js and <MarkerSpan>MongoDB</MarkerSpan> on Atlas are used as the database.</span>
          </PortfolioItem>
        </div>
      </Container>
    </Section>
  );
});

export default Portfolio;