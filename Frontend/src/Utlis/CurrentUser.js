
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { fetchUser, startLoading } from "@/Redux/Slice/AuthSlice";


// TODO:: Remove this function in Hooks

const CurrentUser = () => {
    const { user } = useSelector(state => state.user);
    const  dispatch  = useDispatch();
    useEffect(() => {
      if(!sessionStorage.getItem('navOptions')){
        sessionStorage.setItem('navOptions','Home')
      }
        onAuthStateChanged(auth, currentUser => {
          if (currentUser?.email) {
            dispatch(fetchUser(currentUser.email))
          } else {
            localStorage.removeItem("userToken")
            dispatch(startLoading(false))
            // dispatch(toggleLoading())
          }
        })
      }, [dispatch, user?.token])
};

export default CurrentUser;