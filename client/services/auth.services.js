import config from "../config";

const signIn = async (credentials) => {
    try {
        const loginResponse = await fetch(`${config.backendBaseUrl}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(credentials),
            credentials: "include"
        })
        return await loginResponse.json();
    } catch (e) {
        console.log('Sign in failed');
        console.error(e)
    }
}

const signOut = async () => {
    try {
        const response = await fetch(`${config.backendBaseUrl}/auth/signout`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return await response.json();
    } catch (e) {
        console.log('Sign out failed');
        console.error(e);
    }
}

export default {signOut, signIn}