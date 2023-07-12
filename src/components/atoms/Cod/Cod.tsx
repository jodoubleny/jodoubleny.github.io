import Images from "../../../assets/images/Images";
import style from "./Cod.module.scss";

type Props = JSX.IntrinsicElements["div"] & {
  className?: string,
}

const Cod = ({ className, ...props }: Props) => {
  return (
    <div {...props}
      className={`${style["wrapper"]}${className ? ` ${className}` : ""}`}
    >
      <img src={Images.cod} />
    </div>
  );
}

export default Cod;