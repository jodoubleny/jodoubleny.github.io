import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { projectsRecord } from '../../assets/locale.english';
import { skillsRecord } from '../../assets/skillSet';
import hasTag from '../../helpers/hasTag';

const ProjectNav = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [tag, setTag] = useState<string>();

    useEffect(() => {
        const tagParams = searchParams.get('tag');
        if (tagParams === null) {
            setTag(undefined);
            return;
        }
        const foundTag = Object.keys(skillsRecord).find(skillKey => skillKey === tagParams);
        if (foundTag) {
            setTag(tagParams);
            return;
        };
    }, [searchParams]);

    const tagRemoverOnClick = () => {
        setSearchParams(undefined);
    }

    return (
        <>
        {tag && (
            <div className="flex flex-row justify-between items-baseline mb-5">
                <div className="text-neutral-800 text-sm">includes <span className="px-1 py-0.5 rounded text-white bg-neutral-800">{skillsRecord[tag].title}</span></div>
                <span onClick={tagRemoverOnClick} className="text-rose-900 text-xs hover:underline decoration-rose-900 cursor-pointer">remove</span>
            </div>
        )}
        <nav className="flex flex-col space-y-5">
        {Object.keys(projectsRecord).map(projectKey => (
            <div key={projectKey} className="flex flex-row justify-between text-left text-4xl xl:text-5xl font-black whitespace-nowrap">
                <NavLink to={tag ? `/project/${projectKey}?tag=${tag}` : `/project/${projectKey}`}
                    className={({ isActive }) => `inline-block transition-all ease-in-out duration-300 origin-left ${(tag && !(hasTag(projectKey, tag)) && "scale-50")} ${isActive ? "text-neutral-900 pointer-events-none decoration-neutral-900" : "text-neutral-400 hover:text-white no-underline"}`}>
                    {projectsRecord[projectKey].title}
                </NavLink>
            </div>
        ))}
        </nav>
        </>
    )
}

export default ProjectNav;