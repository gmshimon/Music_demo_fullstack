import Main from "@/Layout/Main";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>
    }
])