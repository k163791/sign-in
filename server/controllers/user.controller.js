import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

// Create new user
const create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// List down all users
const list = async (req, res) => {
    try {
        const users = await User.find({}).select('name email created updated')
        res.status(200).json(users)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }

}

// Get user by id and save it into profile header of all the requests
const userById = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.userId)
        if(!user) {
            return res.status(400).json({
                error: 'Could not retrieve user..!'
            })
        }

        req.profile = user
        next()
    } catch(err) {
        return res.status(400).json({
            error: 'Could not retrieve user'
        })
    }
}

// Read a single user
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

// Update user
const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch(err) {
        return res.status(400).json({
            error: 'Error in updating user'
        })
    }
}

// Delete user from db
const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch(err) {
        return res.status(400).json({
            error: 'Error in deleting user..!'
        })
    }
}

export default {
    create,
    list,
    read,
    update,
    remove,
    userById
}