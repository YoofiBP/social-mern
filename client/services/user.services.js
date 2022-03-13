import config from "../config";

const create = async (user) => {
    try {
        const response = await fetch(`${config.backendBaseUrl}/api/users`, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

const list = async (credentials, signal) => {
    try {
        const response = await fetch(`${config.backendBaseUrl}/api/users`, {
            signal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${credentials.bearer}`
            }
        });
        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

const get = async (params, credentials, signal) => {
    try {
        const response = await fetch(`${config.backendBaseUrl}/api/users/${params.userID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${credentials.bearer}`
            },
            signal
        })
        return await response.json();
    } catch (e) {
        console.error(e)
    }
}

const remove = async (params, credentials, signal) => {
    try {
        const response = await fetch(`${config.backendBaseUrl}/api/users/${params.userID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${credentials.bearer}`
            },
            signal
        })
        return await response.json();
    } catch (e) {

    }
}

const update = async (params, credentials, user, signal) => {
    try {
        const response = await fetch(`${config.backendBaseUrl}/api/users/${params.userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${credentials.bearer}`
            },
            body: JSON.stringify(user),
            signal
        })
        return await response.json();
    } catch (e) {
        console.error(e)
    }
}

export default {
    create,
    list,
    get,
    remove,
    update
}