import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import SignIn from "./pages/SignIn";
import Plan from "./pages/Plan";
import HomeLayout from "./layouts/HomeLayout";
import Table from "./pages/Table";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "table",
        element: <Table />,
      },
      {
        path: "plan",
        element: <Plan />,
      },
      {
        path: "",
        element: <Table />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthenticationLayout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
