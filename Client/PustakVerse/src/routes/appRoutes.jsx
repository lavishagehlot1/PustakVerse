import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthLayout from "../layouts/authLayout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register"

export default function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/login",
      element: isAuthenticated() ? <Navigate to="/" replace /> : <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <h1>forgot Password</h1>,
        },
      ],
    },
     {
      path: "/register",
      element: isAuthenticated() ? <Navigate to="/" replace /> : <AuthLayout />,
      children: [
        {
          index: true,
          element: <Register />,
        },
      ],
    },
      {
      path: "/admin",
      element: isAuthenticated() ? <Navigate to="/" replace /> : <AuthLayout />,
      children: [
        {
          index: true,
          element: <h1>Admin Password </h1>,
        },
        {
          path: "forgot-password",
          element: <h1>forgot Password</h1>,
        },
      ],
    },
    {
      path: "*",
      element: <div className="p-6">404 - Page Not Found</div>,
    },
  ]);

  return routes;
}

// Dummy example - replace with your real authentication check
function isAuthenticated() {
  return false;
}
