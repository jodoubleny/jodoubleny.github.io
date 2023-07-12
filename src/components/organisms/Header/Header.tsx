import Title from "../../molecules/Title/Title";
import Nav from "../Nav/Nav";
import Hamburger from "../../molecules/Hamburger/Hamburger";
import css from "./Header.module.scss";
import { MutableRefObject, useRef } from "react";

type Props = { sectionRefs: MutableRefObject<Map<string, HTMLDivElement | null>> }

const Header = ({ sectionRefs }: Props) => {
  const headerRef = useRef<HTMLElement | null>(null);

  return(
    <header ref={headerRef}>
      <div className={css["container"]}>
        <Title />
        <Hamburger />
      </div>
      <Nav sectionRefs={sectionRefs} />
    </header>
  );
}

export default Header;