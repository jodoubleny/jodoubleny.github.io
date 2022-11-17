import LinkWithIcon from "./LinkWithIcon";
import { externalLinks } from "../../assets/locale.english";
import { useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";

const Header = () => {
    const storedProject = useAppSelector(state => state.storedProject.data) 
    
    return (
        <div className={`h-full flex flex-col justify-between ${storedProject && "items-center"}`}>
            <Link to="/"
                className={`text-xl xl:text-2xl grow font-bold leading-[0.9em] text-white whitespace-nowrap no-underline ${storedProject ? "text-center" : "text-left"}`}>
                <img src="/star_logo.svg" className="max-w-[5rem] animate-spin" style={{animationDuration: "60s"}} />
                <span>{"<J"}</span><span className={`transition-all ease-in-out duration-500 ${storedProject && "opacity-0 text-[0px]"}`}>onny </span>
                <span>P</span><span className={`transition-all ease-in-out duration-500 ${storedProject && "opacity-0 text-[0px]"}`}>ark</span><span>{" />"}</span>
            </Link>
            <div className="relative">
                <ul className="mb-20">
                    {externalLinks.map((link, index) => (<li key={index}><LinkWithIcon data={link} /></li>))}
                </ul>
                <span className={`inline-block absolute whitespace-nowrap text-xs text-neutral-800 cursor-pointer hover:animate-pulse transition-transform duration-300 origin-bottom-left -bottom-10 left-0 ${storedProject && "-rotate-90 left-[1.6rem]"}`}>Made by Jonny Park</span>
            </div>
        </div>
    );
}

export default Header;