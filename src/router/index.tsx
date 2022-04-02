import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './route-list';

const RouterContext: FC = () => {
    return (
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    );
};
export default RouterContext;
