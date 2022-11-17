import { Link, useSearchParams } from 'react-router-dom';
import { skillsRecord } from '../../assets/skillSet';

const TagSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const skillOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const params: Record<string, string> = {"tag": event.currentTarget.value}
        setSearchParams(params);
    }
    
    return (
        <>
        <h1 className="text-xl text-white">Want to see projects used a specific skill?</h1>
        <div className="text-white flex flex-row justify-start gap-5 my-10 flex-wrap">
        {Object.keys(skillsRecord).map((skillKey, index) => (
            <button key={skillKey} value={skillKey} onClick={skillOnClick}
                className="rounded-full px-4 py-1 border-2 transition-colors duration-300 border-white hover:bg-white hover:text-neutral-900">
                    {skillsRecord[skillKey].title}
            </button>
        ))}
        </div>
        </>
    )
}

export default TagSearch;