import { projectsRecord } from "../assets/locale.english"
import { skillsRecord } from "../assets/skillSet";

const hasTag = (projectKey:string, tag: string): boolean => {
    const project = projectsRecord[projectKey];
    const result = project.techArr?.find(stack => stack.skills.find(skill => skill === skillsRecord[tag]));
    if (result) return true;
    return false;
}

export default hasTag;