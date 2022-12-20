import React from "react";

// Guards
import GuestGuard from "../components/GuestGuard";
import AuthGuard from "../components/AuthGuard";

// Auth components
import SignIn from "../pages/auth/SignIn";
import Page404 from "../pages/auth/Page404";

import {
  AccountCircle as AccountCircleIcon,
} from "@material-ui/icons";

// Account components
import Dashboard from "../pages/pages/Dashboard";

const authRoutes = {
  id: "Auth",
  path: "/auth",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
      guard: GuestGuard,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
  ],
  component: null,
};

const dashboardRoutes = {
  id: "Home",
  path: "/",
  icon: <AccountCircleIcon />,
  component: Dashboard,
  children: null,
  guard: AuthGuard,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardRoutes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardRoutes,
];
