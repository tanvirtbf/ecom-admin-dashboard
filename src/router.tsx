import { createBrowserRouter } from "react-router-dom";
import HmoePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import LoginPage from "./pages/login/login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HmoePage />,
    },
    {
        path: "/auth/login",
        element: <LoginPage />
    },
    {
        path: "/categories",
        element: <Categories />,
    }
])