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

export {
    create
}