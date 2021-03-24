const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//Register a user => /register
exports.registerUser = catchAsyncErrors (async (req, res, next) =>{
    const {name, email, password} = req.body

    const user = await User.create({
        name, 
        email,
        password, 
        avatar: {
            public_id: 'askldfj',
            url: 'asdf'
        }
    })
    const token = user.getJwtToken()
    res.status(201).json({
        success: true,
        token
    })
}) 