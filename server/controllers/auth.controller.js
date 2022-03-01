import UserModel from "../models/user.model";
import jwt from 'jsonwebtoken';
import config from "../config/config";
import expressJwt from 'express-jwt';

const signIn = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userInDb = await UserModel.findOne({email: userEmail});
        if (!userInDb) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }
        const passwordCorrect = userInDb.authenticate(req.body.password);
        if (!passwordCorrect) {
            return res.status(401).json({
                error: "Invalid credentials"
            })
        }

        const token = await jwt.sign({id: userInDb._id}, config.jwtSecret);

        res.cookie('token', token, {
            expires: new Date(Date.now() + 900000),
            secure: true,
            httpOnly: true
        })

        return res.status(200).json(
            {
                token,
                userInDb
            }
        )
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: "Could not sign in"
        })
    }

}

const signOut = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            message: "Logged out successfully"
        })
    } catch (e) {
        return res.status(500).json({
            error: "Something went wrong"
        })
    }

}

const hasAuthorization = async (req, res, next) => {
    const authorized = req.user && req.auth && req.user._id.toString() === req.auth.id
    if (!authorized) {
        return res.status(403).send();
    }
    next()
}

const requireSignIn = expressJwt(
    {
        secret: config.jwtSecret,
        algorithms: ['HS256'],
        requestProperty: 'auth'
    }
)

export default {signIn, signOut, hasAuthorization, requireSignIn}