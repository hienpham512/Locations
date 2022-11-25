import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import HomeLayout from "./layouts/HomeLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "",
        element: <Home />,
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
    element: <Navigate to={"/auth/signin"} />,
  },
]);
