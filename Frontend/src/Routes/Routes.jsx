import Main from "@/Layout/Main";
import Home from "@/Pages/Home/Home";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'',
                element:<Home/>
            }
        ]
    }
])