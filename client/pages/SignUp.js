import React, {useState} from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    Typography,
    CircularProgress,
    Dialog, DialogActions
} from "@material-ui/core";
import Menu from "../components/Menu";
import {useStyles} from "./Home";
import userServices from '../services/user.services';
import {useNavigate} from "react-router-dom";
import {Alert} from "@material-ui/lab";


const SignUp = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [fields, setFields] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [successLogin, setSuccessLogin] = useState(false);

    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (field) => (event) => {
        const newValue = event.target.value;
        setFields({
            ...fields,
            [field]: newValue
        })
    }

    const redirectToLogin = () => {
        navigate('/');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsPosting(true);
        try {
            const user = {
                name: fields.name,
                email: fields.email,
                password: fields.password
            }

            const data = await userServices.create(user);
            if (data.error) {
                throw Error('Error logging in');
            }
            setSuccessLogin(true);
        } catch (e) {
            setError(e)
        } finally {
            setIsPosting(false)
        }
    }

    const successDialog = (
        <Dialog open={successLogin}>
            <Alert severity={"success"}>Log in successful</Alert>
            <DialogActions>
                <Button onClick={redirectToLogin}>
                    Proceed to Login
                </Button>
            </DialogActions>
        </Dialog>
    )

    return isPosting ? <CircularProgress/> : (
        <>
            <Menu/>
            {successDialog}
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant={'h6'}>
                        SIGN UP
                    </Typography>
                    <TextField
                        id={'name'}
                        type="text"
                        label="Name"
                        value={fields.name}
                        onChange={handleChange('name')}
                    />
                    <br/>
                    <TextField
                        id={'email'}
                        type={"email"}
                        label="Email"
                        value={fields.email}
                        onChange={handleChange('email')}
                    />
                    <br/>
                    <TextField
                        id={'password'}
                        type={"password"}
                        label={"Password"}
                        value={fields.password}
                        onChange={handleChange('password')}
                    />
                    {
                        error.length > 0 && <Typography component={'p'} color="error">
                            {error}
                        </Typography>
                    }
                </CardContent>
                <CardActions>
                    <Button onClick={handleSubmit}>Submit</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default SignUp;