import { useEffect, useRef, useState } from "react";
import useGsapRef from "../../../hooks/useGsapRef";
import Cod from "../../atoms/Cod/Cod";
import css from "./Title.module.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useNavStore from "../../../stores/useNavStore";

const Title = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isTop, setIsTop] = useState(true);
  const { isOpen } = useNavStore();

  useGsapRef(() => {
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top+=10 top",
      end: "bottom+=200 bottom",
      onToggle: () =>  setIsTop(prev => (!prev)),
    })
  });

  useEffect(() => {
    console.log(isTop)
  }, [isTop]);

  useEffect(() => {
    const classList = containerRef.current?.classList;
    const scrolled = css["scrolled"];

    if (isOpen || isTop) classList?.remove(scrolled);
    else classList?.add(scrolled);
  }, [isTop, isOpen]);

  return (
    <div
      ref={containerRef}
      className={css["container"]}
    >
      <div className={css["cod-wrapper"]}>
        <Cod className={css["cod"]} />
      </div>
      <div className={css["title"]}>
        <span>by </span><span className={css["full-name"]}>Jonny Park</span>
      </div>
    </div>
  );
}

export default Title;