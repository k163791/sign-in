import mongoose from 'mongoose'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true,
    },
    email: {
        type: String,
        required: 'Email is required',
        trim: true,
    },
    hashed_password: {
        type: String,
        required: 'Password is required',
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
})

//Make 3 functions to use for later...!
UserSchema.methods = {
    authenticate: function(plainText) {
        return this.hashed_password == this.encryptPassword(plainText)
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf * Math.random()) + ''
    },
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch(err) {
            return ''
        }   
    }
}

UserSchema.virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

export default mongoose.model('User', UserSchema);