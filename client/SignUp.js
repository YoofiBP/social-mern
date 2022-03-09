import React, {useState} from 'react';
import {Card, TextField} from "@material-ui/core";
import Menu from "./components/Menu";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState('');

    return (
        <>
            <Menu/>
            <Card>
                <TextField type="text" label="Name"/>
                <TextField type={"email"} label="Email"/>
                <TextField type={"password"} label={"Password"}/>
            </Card>
        </>
    )
}

export default SignUp;