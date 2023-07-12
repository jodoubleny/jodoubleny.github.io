import style from "./SquareImg.module.scss"

type Props = JSX.IntrinsicElements["div"] & {
  src?: string,
  className?: string,
};

const SquareImg = ({ src, className }: Props) => {
  return (
    <div className={`${style["img-wrapper"]}${className !== undefined ? ` ${className}` : ""}`}>
      <img
        className={style["square"]}
        src={src}
        loading="lazy"
      />
    </div>
  );
}

export default SquareImg;