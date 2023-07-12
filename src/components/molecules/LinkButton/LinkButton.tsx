import { MouseEvent, useRef } from "react";
import gsap from "gsap";
import css from "./LinkButton.module.scss";
import IconText from "../../atoms/IconText/IconText";
import { EmbeddedSvg } from "../../../assets/images/SvgGroups";
import useGsapRef from "../../../hooks/useGsapRef";

type Props = JSX.IntrinsicElements["a"] & {
  icon: EmbeddedSvg,
  primaryColor: string,
  secondaryColor: string,
  isFilled?: boolean,
  isStroked?: boolean,
  strokeWidth?: number,
  children: string,
}

const LinkButton = ({ icon, primaryColor, secondaryColor, isFilled, isStroked, strokeWidth, children, ...props }: Props) => {
  const lowerRef = useRef<HTMLDivElement | null>(null);

  const gsapRef = useGsapRef((self: any) => {
    const getRadialGradient = (x: number, y: number, pos: number) => (
      `radial-gradient(circle at ${x}% ${y}%, black 0%, black ${pos}%, transparent ${pos}%, transparent 100%)`
    );

    const getMouse = (event: MouseEvent<HTMLDivElement>) => {
      const rect = lowerRef.current!.getBoundingClientRect();
      const mouse = {
        x: Math.round(((event.clientX - Math.floor(rect.x)) / rect.width) * 100),
        y: Math.round(((event.clientY - Math.floor(rect.y)) / rect.height) * 100),
      }

      return { x: mouse.x, y: mouse.y };
    };

    gsap.set(lowerRef.current, { maskImage: getRadialGradient(0, 0, 0), });

    self.add("onMouseEnter", (event: MouseEvent<HTMLDivElement>) => {
      const mouse = getMouse(event);
      if (!mouse) return;

      gsap.fromTo(lowerRef.current,
        { maskImage: getRadialGradient(mouse.x, mouse.y, 0), },
        { maskImage: getRadialGradient(mouse.x, mouse.y, 100), duration: 0.2, }
      );
    });

    self.add("onMouseLeave", (event: MouseEvent<HTMLDivElement>) => {
      const mouse = getMouse(event);
      if (!mouse) return;

      gsap.to(lowerRef.current,
        { maskImage: getRadialGradient(mouse.x, mouse.y, 0), duration: 0.2, }
      );
    });
  });

  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    gsapRef.current?.onMouseEnter(event);
  }
  
  const handleMouseLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    gsapRef.current?.onMouseLeave(event);
  }

  return (
    <a {...props}
      className={css["container"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* below IconText */}
      <IconText
        ref={lowerRef}
        className={`${css["iconText"]} ${css["below"]}`}
        icon={icon}
        color={secondaryColor}
        bgColor={primaryColor}
        isFilled={isFilled}
        isStroked={isStroked}
        strokeWidth={strokeWidth}
      >{children}</IconText>
      {/* above IconText */}
      <IconText
        className={css["iconText"]}
        icon={icon}
        color={primaryColor}
        bgColor="transparent"
        isFilled={isFilled}
        isStroked={isStroked}
        strokeWidth={strokeWidth}
      >{children}</IconText>
    </a>
  );
}

export default LinkButton;