import { PropsWithChildren, forwardRef } from "react";
import css from "./Section.module.scss";

type Props = JSX.IntrinsicElements["section"] & PropsWithChildren & {
  className?: string,
};

const Section = forwardRef<HTMLElement | null, Props>(({ className, children, ...props }, ref) => {
  return (
    <section {...props}
      ref={ref}
      className={`${css["default"]}${className !== undefined ? ` ${className}` : ""}`}
    >
      {children}
    </section>
  );
});

export default Section;