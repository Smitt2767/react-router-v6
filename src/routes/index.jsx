import React, { Suspense } from "react";
import useAuth from "../hooks/useAuth";
import { roles } from "../constants";

import {
  Navigate,
  Route,
  useLocation,
  Routes as ReactRouterDomRoutes,
} from "react-router-dom";

import Layout from "../components/common/Layout";
import routesConfig from "./routesConfig";
import Loader from "../components/common/Loader";

const Common = (route) => (
  <Suspense fallback={<Loader />}>
    <route.component />
  </Suspense>
);

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

  return (
    <Suspense fallback={<Loader />}>
      <route.component />
    </Suspense>
  );
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

  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
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

const Routes = () => {
  const { common, private: privateRoutes, public: publicRoutes } = routesConfig;
  return (
    <ReactRouterDomRoutes>
      <Route path="/" element={<Layout />}>
        {createNestedRoutes(common, Common)}
        {createNestedRoutes(privateRoutes, Private)}
        {createNestedRoutes(publicRoutes, Public)}
      </Route>
    </ReactRouterDomRoutes>
  );
};

export default Routes;
