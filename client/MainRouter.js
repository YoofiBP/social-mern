import React from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

const MainRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<PrivateRoute element={<Home/>}/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/signup'} element={<SignUp/>}/>
            <Route path={'/users'} element={<PrivateRoute element={<Users/>}/>}/>
            <Route path={'/profile'} element={<PrivateRoute element={<Profile/>}/>}/>
        </Routes>
    )
}

export default MainRouter;