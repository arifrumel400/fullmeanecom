const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        maxLength : [30, 'Product name cannot axceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter product email'],
        unique: true,
        validator: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter product password'],
        minLength: [6, 'Your Password must be longer than 6 characters'], 
        select: false
    }, 
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }, 
    role : {
        type: String,
        default: user
    }, 
    createAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

module.exports = mongoose.model('User', userSchema)