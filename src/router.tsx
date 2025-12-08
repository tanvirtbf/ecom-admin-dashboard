import { createBrowserRouter } from "react-router-dom";
import HmoePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import LoginPage from "./pages/login/login";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <HmoePage />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "/auth",
    element: <NonAuth />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
