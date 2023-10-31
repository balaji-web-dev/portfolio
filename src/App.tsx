import './App.scss';

import React from 'react';
import { useRoutes } from 'react-router-dom';

import { AdminLayout, Dashboard, ProjectDetails, RequireAuth } from './admin';
import { HomeLayout, Layout } from './components';
import { EMenuItems } from './interfaces';
import { AboutMe, Contact, HeroBanner, Projects, Skills } from './pages';

function App() {
    const element = useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: (
                        <HomeLayout>
                            <HeroBanner dataMenu={EMenuItems.HOME} />
                            <AboutMe dataMenu={EMenuItems.ABOUTME} />
                            <Skills dataMenu={EMenuItems.SKILLS} />
                            <Projects dataMenu={EMenuItems.PROJECTS} />
                            <Contact dataMenu={EMenuItems.CONTACT} />
                        </HomeLayout>
                    ),
                },
            ],
        },
        {
            path: '/admin',
            element: <RequireAuth />,
            children: [
                {
                    path: '',
                    element: <AdminLayout />,
                    children: [
                        {
                            path: 'dashboard',
                            element: <Dashboard />,
                        },
                        {
                            path: 'projects',
                            element: <ProjectDetails />,
                        },
                    ],
                },
            ],
        },
    ]);

    return element;
}

export default App;
