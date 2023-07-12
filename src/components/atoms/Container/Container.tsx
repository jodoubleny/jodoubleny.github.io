import { PropsWithChildren, forwardRef } from "react";
import css from "./Container.module.scss";

type Props = JSX.IntrinsicElements["div"] & PropsWithChildren & {
  className?: string,
};

const Container = forwardRef<HTMLDivElement | null, Props>(({ className, children, ...props }, ref) => {
  return (
    <div {...props}
      ref={ref}
      className={`${css["container"]}${className !== undefined ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
});

export default Container;