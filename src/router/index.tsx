import React, { Suspense, lazy, FC } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Loading from '@/components/Loading';

function asyncRoute<T>(RouteComponent: React.ComponentType<T>) {
    const Component = function (props: T) {
        return (
            <Suspense fallback={<Loading />}>
                <RouteComponent {...props} />
            </Suspense>
        );
    };
    return Component;
}

const Default = asyncRoute(lazy(() => import('@/pages/Index')));
const About = asyncRoute(lazy(() => import('@/pages/About')));

const routes = [
    { path: '/', component: Default },
    { path: '/about', component: About },
];

const RouterContext: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(route => (
                    <Route key={route.path} path={route.path} element={<route.component></route.component>}></Route>
                ))}
            </Routes>
            <p>
                <Link to="/">to index</Link>
                <Link to="/about">to about</Link>
            </p>
        </BrowserRouter>
    );
};
export default RouterContext;
