import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../../config/config'

// Signin user
const signin = async (req, res) => {
    // const { email, password } = req.body
    try {
        let user = await User.findOne({ email: req.body.email })
        
        if(!user) {
            return res.status(400).json({ error: "User not found" })
        }

        if(!(user.authenticate(req.body.password))) {
            return res.status(400).json({ error: "Password doesn't match" })
        }

        // Generate token
        const token = jwt.sign({ _id: user._id }, config.jwtSecret)
        // Save the token in a cookie
        res.cookie('t', token, { expire: new Date() + 9999 })

        return res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            }
        })

        } catch(err) {
        return res.status(400).json({
            error: "Could not signin"
        })
    }
}

// Signout user
const signout = (req, res) => {
    res.clearCookie()
    return res.status(200).json({
        message: "Successfuly logged out"
    })
}

const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['sha1', 'HS256']
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized) {
        return res.status(400).json({
            error: 'User not authorized'
        })
    }

    next()
}

export default {
    signin,
    signout,
    requireSignin,
    hasAuthorization
}