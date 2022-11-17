import { useEffect, useState } from 'react';
import { Link, redirect, useNavigate, useSearchParams } from 'react-router-dom';
import { projectsRecord } from '../../assets/locale.english';
import { skillsRecord } from '../../assets/skillSet';
import hasTag from '../../helpers/hasTag';
import { useAppSelector } from '../../store/hooks';

const ProjectNav = () => {
    const navigate = useNavigate();

    const [mouseOn, setMouseOn] = useState<string>();
    const currentProject = useAppSelector(state => state.storedProject.data);
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
                <div>
                {(currentProject && currentProject === projectsRecord[projectKey]) ? (
                    <span className={`inline-block text-neutral-900 underline cursor-default transition-all ease-in-out duration-300 ${(tag && !(hasTag(projectKey, tag)) && "scale-50")}`}>
                        {projectsRecord[projectKey].title}
                    </span>
                ) : (
                    <Link to={tag ? `/project/${projectKey}?tag=${tag}` : `/project/${projectKey}`} onMouseEnter={() => setMouseOn(projectKey)} onMouseLeave={() => setMouseOn(undefined)} onClick={() => setMouseOn(undefined)}
                        className={`inline-block no-underline origin-left transition-all ease-in-out duration-300 ${mouseOn === undefined ? `text-neutral-600` : `${projectKey === mouseOn ? "text-neutral-300" : "text-neutral-700"}`} ${(tag && !(hasTag(projectKey, tag)) && "scale-50")}`}>
                        {projectsRecord[projectKey].title}
                    </Link>
                )}
                </div>
            </div>
        ))}
        </nav>
        </>
    )
}

export default ProjectNav;