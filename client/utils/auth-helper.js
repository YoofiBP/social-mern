const authenticate = (jwt, cb) => {
    if (window) {
        localStorage.setItem('jwt', JSON.stringify(jwt));
    }
    cb();
}

const isAuthenticated = () => {
    if (!window) {
        return false
    }
    try {
        const token = localStorage.getItem('jwt');
        if (!token) {
            return false;
        }
        return JSON.parse(token);
    } catch (e) {
        return false;
    }
}

const clearAuth = (cb) => {
    if (window) {
        localStorage.removeItem('jwt');
        cb();
    }
}

export {
    isAuthenticated,
    clearAuth,
    authenticate
}