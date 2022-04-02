import React, { lazy, FC } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import asyncComponent from '@/components/async-component';

const Default = asyncComponent(lazy(() => import('@/pages/default')));
const Index = asyncComponent(lazy(() => import('@/pages/index')));
const About = asyncComponent(lazy(() => import('@/pages/about')));
const NotFound = asyncComponent(lazy(() => import('@/pages/not-found')));

const Routes: FC = () => {
    const element = useRoutes([
        {
            path: '/',
            element: <Default />,
            children: [
                { index: true, element: <Navigate to="/index" replace /> },
                { path: '/index', element: <Index /> },
            ],
        },
        { path: '/about', element: <About /> },
        { path: '/404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },

    ]);
    return element;
};
export default Routes;
