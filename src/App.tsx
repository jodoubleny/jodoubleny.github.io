import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Redux
import { useAppSelector, useAppDispatch } from './store/hooks';
import { removeProject, storeProject } from './store/storedProjectSlice';
// components
import Header from './components/Header/Header';
import ProjectNav from './components/ProjectNav/ProjectNav';
import ProjectDetail from './components/ProjectDetail/ProjectDetail';
import TagSearch from './components/TagSearch/TagSearch';

import { projectsRecord } from './assets/locale.english';
import { Project } from './types/types';
import AboutMe from './components/AboutMe/AboutMe';
import HorizontalRule from './components/HorizontalRule/HorizontalRule';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const storedProject = useAppSelector(state => state.storedProject.data);

  useEffect(() => {
    const projectKey = location.pathname.split("/")[2];
    if (projectKey === undefined) {
      if (storedProject !== undefined) {
        dispatch(removeProject());
      }
      return
    }
    const project: Project = projectsRecord[projectKey];
    dispatch(storeProject(project));
  }, [location]);

  return (
    <div className="min-w-screen min-h-screen bg-black">
      <div className="flex flex-row w-full h-full min-h-screen">
        <div className="mx-6 my-16 xl:mx-16"><Header /></div>
        <div className="mx-6 my-16 xl:mx-16"><ProjectNav /></div>
        <div className="mx-6 my-16 xl:mx-16">
          {storedProject ? <ProjectDetail /> : 
          <>
          <AboutMe />
          <HorizontalRule className="my-5" title="OR" />
          <TagSearch />
          </>
          }
        </div>
      </div>
    </div>
  )
}

export default App;