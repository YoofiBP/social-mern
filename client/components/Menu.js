import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Home} from "@material-ui/icons";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <AppBar position={'static'}>
            <Toolbar>
                <Typography variant={'h6'}>
                    MERN Skeleton
                </Typography>

                <Link to={'/'}>
                    <IconButton>
                        <Home/>
                    </IconButton>
                </Link>
                <Link to={'/'}>
                    <Button>
                        USERS
                    </Button>
                </Link>
                <Link to={'/signup'}>
                    <Button>
                        SIGN UP
                    </Button>
                </Link>
                <Link to={'/'}>
                    <Button>
                        SIGN IN
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default Menu;