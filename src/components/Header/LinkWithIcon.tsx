import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { ILinkWithSimpleIcon } from '../../types/types'

type LinkWithIconProps = {
    data: ILinkWithSimpleIcon,
}

const LinkWithIcon = (props: LinkWithIconProps) => {
    const [isMouseEnter, setIsMouseEnter] = useState(false)
    const storedProject = useAppSelector(state => state.storedProject.data) 

    return (
        <a href={props.data.url} onMouseEnter={() => setIsMouseEnter(true)} onMouseLeave={() => setIsMouseEnter(false)}
            className={`flex flex-row items-center font-bold no-underline text-sm transition-all duration-300 ${isMouseEnter ? `text-neutral-300 fill-neutral-300 -translate-y-0.5` : `text-neutral-600 fill-neutral-600`}`}>
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[1.5em] m-2">
                <path d={props.data.icon.svgPath} />
            </svg>
            <span className={`inline-block leading-tight grow transition-all ease-in-out duration-500 ${storedProject && "opacity-0 text-[0px]"}`}>{props.data.title}</span>
        </a>
    )
}

export default LinkWithIcon