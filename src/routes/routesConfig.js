import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { roles } from "../constants";

const About = lazy(() => import("../components/About"));
const Admin = lazy(() => import("../components/Admin"));
const Profile = lazy(() => import("../components/Profile"));
const Customer = lazy(() => import("../components/Customer"));
const Home = lazy(() => import("../components/Home"));
const Login = lazy(() => import("../components/Login"));
const NotFound = lazy(() => import("../components/common/_404"));
const Unauthorized = lazy(() => import("../components/common/Unauthorized"));
const RequiredAuth = lazy(() => import("../components/common/RequireAuth"));

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

export default routesConfig;
