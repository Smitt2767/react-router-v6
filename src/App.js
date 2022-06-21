import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import { createGlobalStyle } from "styled-components";
import About from "./components/About";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import Layout from "./components/common/Layout";
import Customer from "./components/Customer";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/common/_404";
import AuthProvider from "./context/authContext";
import useAuth from "./hooks/useAuth";
import { roles } from "./constants";
import Unauthorized from "./components/common/Unauthorized";
import RequiredAuth from "./components/common/RequireAuth";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
`;

const routesConfig = {
  common: [
    {
      index: true,
      component: Home,
    },
    {
      path: "about",
      component: About,
    },
    {
      path: "unauthorized",
      component: Unauthorized,
    },
    { path: "*", component: NotFound },
  ],
  private: [
    {
      path: "/",
      component: RequiredAuth,
      children: [
        {
          path: "admin",
          allowedRoles: [roles.admin],
          component: Outlet,
          children: [
            { index: true, component: Admin },
            { path: "users", component: () => <div>Users</div> },
            { path: "settings", component: () => <div>Settings</div> },
          ],
        },
        {
          path: "customer",
          allowedRoles: [roles.customer],
          component: Outlet,
          children: [
            { index: true, component: Customer },
            { path: "cart", component: () => <div>Cart</div> },
          ],
        },
        {
          path: "profile",
          allowedRoles: [roles.customer, roles.admin],
          component: Profile,
        },
      ],
    },
  ],
  public: [{ path: "login", component: Login }],
};

const Common = (route) => <route.component />;

const Public = (route) => {
  const { user } = useAuth();

  const redirectTo = user?.role
    ? user.role === roles.admin
      ? "/admin"
      : user.role === roles.customer
      ? "/customer"
      : "/"
    : "/";

  if (!!user) return <Navigate to={redirectTo} replace />;

  return <route.component />;
};

const Private = (route) => {
  const { user } = useAuth();
  const { allowedRoles, component: Component } = route;
  const location = useLocation();

  if (!!!user)
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );

  const currentUserRole = user.role;

  if (!!allowedRoles?.length && !allowedRoles.includes(currentUserRole))
    return <Navigate to={"/unauthorized"} replace />;

  return <Component />;
};

const createNestedRoutes = (routes, RouteType) => {
  return routes.map((route, i) => {
    if (!route.component) {
      throw new Error("Component must be required....");
    }
    if (route.children) {
      return (
        <Route path={route.path} key={i} element={<RouteType {...route} />}>
          {createNestedRoutes(route.children, RouteType)}
        </Route>
      );
    } else {
      return (
        <Route
          key={i}
          index={route.index}
          path={route.path}
          element={<RouteType {...route} />}
        />
      );
    }
  });
};

const App = () => {
  const { common, private: privateRoutes, public: publicRoutes } = routesConfig;
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {createNestedRoutes(common, Common)}
            {createNestedRoutes(privateRoutes, Private)}
            {createNestedRoutes(publicRoutes, Public)}
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
