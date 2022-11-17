import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// Redux
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { removeProject, storeProject } from '../../store/storedProjectSlice'
// components
import Header from '../../components/Header/Header'
import ProjectNav from '../../components/ProjectNav/ProjectNav'
import TagSearch from '../../components/TagSearch/TagSearch'

import { projectsRecord } from '../../assets/locale.english'
import { Project } from '../../types/types'
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule'

const NotFound = () => {
  const dispatch = useAppDispatch()

  const projectKey: string | undefined = useLocation().pathname.split('/')[2]
  const storedProject = useAppSelector(state => state.storedProject.data)

  useEffect(() => {
    if (projectKey === undefined) {
      if (storedProject !== undefined) {
        dispatch(removeProject())
      }
      return
    }
    const project: Project = projectsRecord[projectKey]
    dispatch(storeProject(project))
  }, [projectKey]);

  return (
    <div className="w-screen min-h-screen bg-black">
      <div className="flex flex-row w-full h-full min-h-screen">
        <div className="mx-6 my-16 xl:mx-16"><Header /></div>
        <div className="mx-6 my-16 xl:mx-16"><ProjectNav /></div>
        <div className="mx-6 my-16 xl:mx-16">
          <div className="text-white text-center">
            <h1 className="font-black text-[12rem] leading-none">404</h1>
            <h2 className="uppercase font-bold text-4xl">Page not found</h2>
          </div>
          <HorizontalRule className="w-1/2 my-16" title="OR" />
          <TagSearch />
        </div>
      </div>
    </div>
  )
}

export default NotFound;