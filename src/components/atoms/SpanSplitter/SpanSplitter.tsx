import { Fragment, forwardRef, useImperativeHandle, useRef } from "react";

type Props = JSX.IntrinsicElements["span"] & {
  by: "word" | "letter",
  delayBase?: number,
  delayLerp?: number,
  delayIndexBase?: number,
  children: string,
}

const SpanSplitter = forwardRef<Array<HTMLSpanElement | null>, Props>(({
  by,
  delayBase = 0,
  delayLerp = 0,
  delayIndexBase = 0,
  children,
  ...props
}, ref) => {
  const spanRefs = useRef(new Array<HTMLSpanElement | null>());

  useImperativeHandle(ref, () => spanRefs.current as Array<HTMLSpanElement | null>);

  const processedChildren = (string: string) => {
    let stringArray = new Array<string>();
    switch (by) {
      case "letter":
        stringArray = [...(string.split(""))];
        break;
      case "word":
        stringArray = [...(string.split(" "))];
        break;
    }
    return stringArray;
  }

  return(
    <>
    {processedChildren(children).map((string, index) => (
      <Fragment key={index}>
        <span {...props}>
          <span
            ref={(el) => spanRefs.current[index] = el}
            style={{ transitionDelay: `${delayBase + (delayLerp * (index + delayIndexBase))}s`, animationDelay: `${delayBase + (delayLerp * index)}s`}}>{string}</span>
        </span>{(by === "word" && index !== processedChildren(children).length - 1) && " "}
      </Fragment>
    ))}
    </>
  );
});

export default SpanSplitter;