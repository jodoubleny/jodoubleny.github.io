import { MouseEvent, MutableRefObject, useContext, useRef } from "react";
import css from "./Nav.module.scss";
import MenuItem from "../../molecules/MenuItem/MenuItem";
import useNavStore from "../../../stores/useNavStore";
import { LenisCtx } from "../../../App";
import Container from "../../atoms/Container/Container";

type Props = {
  sectionRefs: MutableRefObject<Map<string, HTMLDivElement | null>>,
}

const Nav = ({ sectionRefs }: Props) => {
  const lenisRef = useContext(LenisCtx);
  const { isOpen, setIsOpen } = useNavStore();
  const navRef = useRef<HTMLDivElement | null>(null);

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (!navRef.current) return;
    if (!lenisRef || !lenisRef.current) return;
    if (!sectionRefs.current) return;

    const scrollTo = event.currentTarget.dataset.lenisScrollTo ?? "";
    const target = sectionRefs.current!.get(scrollTo);
    if (!target) return;

    // toggle classes
    const classList = navRef.current.classList;
    // classList.remove(css["open"]);
    // classList.add(css["closed"]);
    classList.toggle(css["active"]);
    // set state as closed
    setIsOpen(false);

    lenisRef.current.start(); // enable scrolling
    lenisRef.current.scrollTo(target);
  }

  return(
    <nav ref={navRef} className={isOpen ? css["active"] : undefined}>
      <Container className={css["nav"]}>
        <MenuItem scrollTo="home" onAnchorClick={handleAnchorClick} >Home</MenuItem>
        <MenuItem scrollTo="portfolio" onAnchorClick={handleAnchorClick} >Portfolio</MenuItem>
        <MenuItem scrollTo="skills" onAnchorClick={handleAnchorClick} >Skills</MenuItem>
        <MenuItem scrollTo="contact" onAnchorClick={handleAnchorClick} >Contact</MenuItem>
      </Container>
    </nav>
  );
}

export default Nav;