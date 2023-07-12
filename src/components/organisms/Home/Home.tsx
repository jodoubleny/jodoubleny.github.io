import { forwardRef, useImperativeHandle, useRef } from "react";
import css from "./Home.module.scss";
import Section from "../../atoms/Section/Section";
import Marquee from "../../atoms/Marquee/Marquee";
import Cod from "../../atoms/Cod/Cod";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownArrow from "../../molecules/DownArrow/DownArrow";
import Hero from "../../molecules/Hero/Hero";
import SpanSplitter from "../../atoms/SpanSplitter/SpanSplitter";
import useGsapRef from "../../../hooks/useGsapRef";

type Props = {}

const Home = forwardRef<HTMLDivElement | null, Props>(({}, ref) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const heroTextContainerRef = useRef<HTMLDivElement | null>(null);
  const greetingsRef = useRef<HTMLDivElement | null>(null);
  const codedRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => sectionRef.current as HTMLDivElement);

  useGsapRef(() => {
    ScrollTrigger.create({
      trigger: heroTextContainerRef.current,
      onToggle: () => {
        const classList = heroTextContainerRef.current?.classList;
        classList?.toggle(css["active"]);
        classList?.toggle(css["initial"]);
      }
    });

    ScrollTrigger.create({
      trigger: greetingsRef.current,
      start: "bottom+=50 bottom",
      end: "top-=100 top",
      toggleClass: {
        targets: codedRef.current,
        className: css["active"],
      }
    });
  });

  return(
    <Section ref={sectionRef} className={css["home"]}>
      {/* hero starts */}
      <div className={css["hero-wrapper"]}>
        <div className={css["hero-container"]}>
          <Hero style={{ gridArea: "hero", alignSelf: "end" }} />
          <div className={css["hero-text-wrapper"]}>
            <div
              ref={heroTextContainerRef}
              className={`${css["hero-text-container"]} ${css["initial"]}`}
            >
              <SpanSplitter
                by="word"
                className={css["hero-text"]}
                delayLerp={0.02}
                delayBase={1}
              >"Hello, World!" - where dreams come true and ideas become reality. Let's embark on this exciting journey together and leave a lasting impression in the digital realm. We will weave wonders on the web.</SpanSplitter>
            </div>
          </div>
          <DownArrow className={css["down-arrow"]} />
        </div>
      </div>
      {/* hero ends */}
      {/* greeting starts */}
      <div
        className={css["greeting-container"]}
      >
        <Marquee
          className={css["marquee"]}
          duration={5}
        ><div className={css["text"]}>Simplify the Complex</div></Marquee>
        <div 
          ref={greetingsRef}
          className={css["greetings"]}>
          <span>Hi!</span>&nbsp;<span>I'm</span>&nbsp;<span>Jonny Park.</span><br />
          <span>And this is</span>&nbsp;
          <span>
            <div
              ref={codedRef}
              className={css["coded-container"]}>
              <div className={css["coded-wrapper"]}>coded</div>
              <div className={css["cod-wrapper"]}>
                <Cod className={css["cod"]} />
              </div>
            </div>&nbsp;by me.
          </span>
        </div>
        <Marquee
          className={css["marquee"]}
          duration={5}
          toRight={true}
        ><div className={css["text"]}>Amplify the Impact</div></Marquee>
      </div>
      {/* greeting ends */}
    </Section>
  );
});

export default Home;