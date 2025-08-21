import Main from "@/Layout/Main";
import ArtistSubmissionPage from "@/Pages/ArtistSubmissionPage/ArtistSubmissionPage";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import Registration from "@/Pages/Registration/Registration";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<Registration/>
            },
            {
                path:'submit',
                element:<ArtistSubmissionPage/>
            }
        ]
    }
])