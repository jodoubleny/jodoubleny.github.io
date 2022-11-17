import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import NotFound from './layouts/NotFound/NotFound';
import './index.css';
// Redux
import { Provider } from 'react-redux';
import { store } from './store/store';

import { projectsRecord } from "./assets/locale.english";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="project">
              {Object.keys(projectsRecord).map(projectKey => (
                <Route key={projectKey} path={projectKey} element={<App />} />
              ))}
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
