import { forwardRef, useRef, useImperativeHandle, useState } from "react";
import css from "./Skills.module.scss";
import Section from "../../atoms/Section/Section";
import Container from "../../atoms/Container/Container";
import H1 from "../../atoms/H1/H1";
import SkillItem from "../../molecules/SkillItem/SkillItem";
import SvgGroups from "../../../assets/images/SvgGroups";
import useResize from "../../../hooks/useResize";

type Props = {}

const Skills = forwardRef<HTMLDivElement | null, Props>(({}, ref) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [colNumber, setColNumber] = useState(0);

  useImperativeHandle(ref, () => sectionRef.current as HTMLDivElement);

  useResize(() => {
    const handleResize = () => {
      if (!sectionRef.current) return;
  
      const colNumberString = window.getComputedStyle(sectionRef.current).getPropertyValue("--col-number");
      const colNumber = Number.parseInt(colNumberString);
      setColNumber(colNumber);
    }
    handleResize(); // initialize
  });

  return (
    <Section
      ref={sectionRef}
      className={css["skills"]}
    >
      <Container className={css["container"]}>
        <H1>Skills</H1>
        <div className={css["item-container"]}>
          <SkillItem
            title="TypeScript"
            src={SvgGroups.typescript}
            strokeWidth={0.5}
            svgStyle={{ strokeLinecap: "square" }}
            colNumber={colNumber}
            colStart={2}
          >JavaScript and ES6+ are excellent for web development. But I prefer TypeScript for better stability and scalability.</SkillItem>
          <SkillItem
            title="React"
            src={SvgGroups.react}
            strokeWidth={0.5}
            colNumber={colNumber}
            colStart={3}
          >React.js greatly increases my productivity through component reuse, its rich ecosystem, and its documentation. I mainly build web front-ends based on it.</SkillItem>
          <SkillItem
            title="GSAP"
            src={SvgGroups.gSAP}
            strokeWidth={0.75}
            colNumber={colNumber}
            colStart={1}
          >GSAP is an powerful and flexible JavaScript-based animation library. I utilize it to elevate the user experience of web front-end development.</SkillItem>
          <SkillItem
            title="SCSS"
            src={SvgGroups.scss}
            strokeWidth={1.25}
            colNumber={colNumber}
            colStart={3}
          >To improve reusability of CSS and achieve programmatic implementations for CSS.</SkillItem>
        </div>
        <div className={css["background-grid"]}>
          {[...Array(colNumber).keys()].map((number) => (<div key={number} className={css["grid"]} style={{ gridArea: `1 / ${number + 1} / 2 / ${number + 2}`, }}></div>))}
        </div>
      </Container>
    </Section>
  );
});

export default Skills;