import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "@/pages/index/index";
import About from "@/pages/about/index";

const routes = [
  { path: "/", component: Index },
  { path: "/about", component: About },
];
const RouterContext: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={<route.component></route.component>}></Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default RouterContext;
