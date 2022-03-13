import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Home} from "@material-ui/icons";
import {Link, useNavigate} from "react-router-dom";
import {clearAuth, isAuthenticated} from "../utils/auth-helper";

const Menu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuth(() => {
            navigate('/login')
        })
    }

    const authenticatedRoutes = (
        <>
            <Link to={'/'}>
                <IconButton>
                    <Home/>
                </IconButton>
            </Link>
            <Link to={'/users'}>
                <Button>
                    USERS
                </Button>
            </Link>
            <Link to={'/profile'}>
                <Button>
                    MY PROFILE
                </Button>
            </Link>
            <Button onClick={handleLogout}>
                LOGOUT
            </Button>
        </>)

    const publicRoutes = (
        <><Link to={'/signup'}>
            <Button>
                SIGN UP
            </Button>
        </Link>
            <Link to={'/login'}>
                <Button>
                    SIGN IN
                </Button>
            </Link></>
    );

    const userIsAuthenticated = isAuthenticated();

    return (
        <AppBar position={'static'}>
            <Toolbar>
                <Typography variant={'h6'}>
                    MERN Skeleton
                </Typography>

                {!userIsAuthenticated && publicRoutes}
                {userIsAuthenticated && authenticatedRoutes}
            </Toolbar>
        </AppBar>
    )
}

export default Menu;