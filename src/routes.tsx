import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import SignUp from "./pages/auth/SignUp";
import { Orders } from "./pages/app/orders/orders";
import Dashboard from "./pages/app/dashboard/dashboard";
import { NotFound } from "./pages/auth/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
