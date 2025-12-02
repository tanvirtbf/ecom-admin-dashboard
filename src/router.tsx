import { createBrowserRouter } from "react-router-dom";
import HmoePage from "./pages/HomePage";
import Categories from "./pages/Categories";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HmoePage />,
    },
    {
        path: "/categories",
        element: <Categories />,
    }
])