import React from 'react';
import {Navigate} from "react-router";
import {isAuthenticated} from "../utils/auth-helper";
import {useLocation} from "react-router-dom";


const PrivateRoute = ({element}) => {

    const location = useLocation();

    if (isAuthenticated()) {
        return element
    } else {
        return <Navigate to={'/login'} state={{from: location}}/>
    }
}

export default PrivateRoute;