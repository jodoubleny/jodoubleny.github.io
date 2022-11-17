import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const StarLogo = () => {
    const storedProject = useAppSelector(state => state.storedProject.data);
    
    return (
        <Link to="/"
            className={`text-xl xl:text-2xl grow font-bold leading-[0.9em] text-white whitespace-nowrap no-underline ${storedProject ? "text-center" : "text-left"}`}>
            <img src="/star_logo.svg" className="max-w-[5rem] animate-spin" style={{animationDuration: "60s"}} />
            <span>{"<J"}</span><span className={`transition-all ease-in-out duration-500 ${storedProject && "opacity-0 text-[0px]"}`}>onny </span>
            <span>P</span><span className={`transition-all ease-in-out duration-500 ${storedProject && "opacity-0 text-[0px]"}`}>ark</span><span>{" />"}</span>
        </Link>
    );
}

export default StarLogo;