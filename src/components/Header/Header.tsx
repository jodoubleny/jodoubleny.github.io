import LinkWithIcon from "./LinkWithIcon";
import { externalLinks } from "../../assets/locale.english";
import { useAppSelector } from "../../store/hooks";
import StarLogo from "../StarLogo/StarLogo";

const Header = () => {
    const storedProject = useAppSelector(state => state.storedProject.data);
    
    return (
        <div className={`h-full flex flex-col justify-between ${storedProject && "items-center"}`}>
            <StarLogo />
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