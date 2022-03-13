import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu";
import {
    Avatar, Button,
    Card, CardActions,
    CardContent, Dialog, DialogActions, Divider, IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText, TextField,
    Typography
} from "@material-ui/core";
import {AccountCircle, Delete, Edit} from "@material-ui/icons";
import userServices from '../services/user.services';
import {clearAuth, isAuthenticated} from "../utils/auth-helper";
import dayjs from "dayjs";
import {useStyles} from "./Home";
import {useNavigate} from "react-router-dom";
import {Alert} from "@material-ui/lab";

const EditDialog = ({open, name, email, onCancel, onSubmit}) => {
    const classes = useStyles();
    const [fields, setFields] = useState({
        name: '',
        email: ''
    })

    useEffect(() => {
        setFields({
            name: name,
            email: email
        })
    }, [name, email])

    const handleSubmit = () => {
        onSubmit(fields)
    }

    const handleChange = (field) => (event) => {
        setFields({...fields, [field]: event.target.value})
    }

    return (
        <Dialog open={open}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant={'h6'}>
                        EDIT PROFILE
                    </Typography>
                    <TextField
                        id={'name'}
                        onChange={handleChange('name')}
                        value={fields.name}
                    />
                    <br/>
                    <TextField
                        value={fields.email}
                        id={'email'}
                        onChange={handleChange('email')}
                        type={'email'}
                    />
                </CardContent>
                <CardActions>
                    <Button onClick={onCancel}>
                        CANCEL
                    </Button>
                    <Button onClick={handleSubmit}>
                        SUBMIT
                    </Button>
                </CardActions>
            </Card>

        </Dialog>
    )
}

const DeleteDialog = ({onCancel, onDelete, open}) => {

    return (
        <Dialog open={open}>
            <Alert severity={'warning'}>Are you sure you want to delete this user?</Alert>
            <DialogActions>
                <Button onClick={onCancel}>
                    CANCEL
                </Button>
                <Button onClick={onDelete}>
                    DELETE
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isError, setIsError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleOpenEdit = () => {
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    const handleOpenDelete = () => {
        setIsDeleting(true)
    }

    const handleCancelDelete = () => {
        setIsDeleting(false);
    }

    const handleEdit = async (newUser) => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        try {
            const authDetails = isAuthenticated();
            const userID = authDetails.userInDb._id;
            const token = authDetails.token;
            const response = await userServices.update({userID}, {bearer: token}, newUser, signal)
            if (response.error) {
                setIsError(true)
            }

        } catch (e) {
            console.error(e);
        } finally {
            setIsEditing(false)
            navigate('/profile')
        }
    }

    const handleDelete = async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        try {
            const authDetails = isAuthenticated();
            const userID = authDetails.userInDb._id;
            const token = authDetails.token;
            const response = await userServices.remove({userID}, {bearer: token}, signal);
            if (response.error) {
                setIsError(true)
            }
            clearAuth(() => {
                navigate('/login')
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        try {
            const authDetails = isAuthenticated();
            const userID = authDetails.userInDb._id;
            const token = authDetails.token;
            const response = await userServices.get({userID}, {bearer: token}, signal)
            if (response.error) {
                return setIsError(true);
            }

            setUser({
                name: response.name,
                email: response.email,
                joined: dayjs(response.createdAt).format("ddd MMM D YYYY")
            })
        } catch (e) {
            setIsError(true);
        }


        return () => {
            abortController.abort();
        }
    }, [])

    return (
        <>
            <Menu/>
            <DeleteDialog open={isDeleting} onDelete={handleDelete} onCancel={handleCancelDelete}/>
            <EditDialog open={isEditing} name={user.name} email={user.email} onCancel={handleCancelEdit}
                        onSubmit={handleEdit}/>
            <Card>
                <Typography variant={'h6'}>
                    Profile
                </Typography>
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountCircle/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography>
                                    {user.name}
                                </Typography>
                                {user.email}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton onClick={handleOpenEdit}>
                                    <Edit/>
                                </IconButton>
                                <IconButton onClick={handleOpenDelete}>
                                    <Delete/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                    <Divider/>
                    <Typography>
                        Joined: {user.joined}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default Profile;