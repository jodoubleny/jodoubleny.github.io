import { useEffect, useRef } from "react";
import Header from "../organisms/Header/Header";
import Home from "../organisms/Home/Home";
import Portfolio from "../organisms/Portfolio/Portfolio";
import Skills from "../organisms/Skills/Skills";
import Footer from "../organisms/Footer/Footer";
import Middle from "../molecules/Middle/Middle";

type Props = {
  onLoad: (isLoading: boolean) => void,
}

const Index = ({ onLoad: handleLoad }: Props) => {
  const sectionRefs = useRef(new Map<string, HTMLDivElement | null>());

  useEffect(() => handleLoad(false), []); // when Index is rendered, handleLoad is triggered
  
  return(
    <>
    <Header sectionRefs={sectionRefs} />
    <main>
      <Home ref={(el) => sectionRefs.current.set("home", el)} />
      <Portfolio ref={(el) => sectionRefs.current.set("portfolio", el)} />
      <Middle />
      <Skills ref={(el) => sectionRefs.current.set("skills", el)} />
    </main>
    <Footer ref={(el) => sectionRefs.current.set("contact", el)} />
    </>
  );
}

export default Index;