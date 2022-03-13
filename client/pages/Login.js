import React, {useState} from 'react';
import Menu from "../components/Menu";
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@material-ui/core";
import {useLocation, useNavigate} from "react-router-dom";
import authServices from '../services/auth.services';
import {authenticate} from "../utils/auth-helper";


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const targetRedirect = location.state?.pathname || '/';

    const [fields, setFields] = useState({
        email: '',
        password: ''
    })
    const [errors, setError] = useState('');

    const handleChange = (field) => (event) => {
        setFields({...fields, [field]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await authServices.signIn(fields);
            if (data.error) {
                throw Error('Invalid credentials');
            }
            authenticate(data, () => {
                navigate(targetRedirect)
            })
        } catch (e) {
            if (e.message) {
                setError(e.message)
            } else {
                setError(e)
            }

            console.error(e);
        }
    }

    return (
        <>
            <Menu/>
            <Card>
                <CardContent>
                    <Typography>
                        LOG IN
                    </Typography>
                    <TextField
                        id="email"
                        type={"email"}
                        label={"Email"}
                        onChange={handleChange('email')}
                    />
                    <TextField
                        id="password"
                        type={"password"}
                        label={"Password"}
                        onChange={handleChange('password')}
                    />
                    {errors && <Typography>{errors}</Typography>}
                </CardContent>
                <CardActions>
                    <Button onClick={handleSubmit}>Log In</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default Login;