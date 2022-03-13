import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu";
import {
    Avatar,
    Card,
    CardContent, CircularProgress, IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@material-ui/core";
import {AccountCircle, ArrowForward} from "@material-ui/icons";
import userServices from '../services/user.services';
import {isAuthenticated} from "../utils/auth-helper";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(async () => {
        setIsFetching(true)
        const abortController = new AbortController();
        const signal = abortController.signal;
        const token = isAuthenticated().token;
        try {
            const users = await userServices.list({bearer: token}, signal)
            setUsers(users);
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetching(false)
        }

        return () => {
            abortController.abort();
        }
    }, [])

    const userList = (
        <List>
            {users.map(user =>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AccountCircle/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                        {user.name}
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton>
                            <ArrowForward/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>)}
        </List>
    )

    return (
        <>
            <Menu/>
            {isFetching ? <CircularProgress/> : <Card>
                <Typography>
                    All Users
                </Typography>
                <CardContent>
                    {userList}
                </CardContent>
            </Card>}
        </>
    )
}

export default Users;