const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')

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

//Login user => /login
exports.loginUser = catchAsyncErrors (async (req, res, next) => {
    const {email, password} = req.body

    //Check if email and password is entered by user 
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password!', 404))

    }

    //Find user in database
    const user = await User.findOne({email}).select('+password')

    if(!user) {
        return next(new ErrorHandler('Invalied or password', 401)) // 401 = un authenticated user
    }

    //Check if password matched or not 
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalied or password', 401))
    }

    //const token = user.getJwtToken()

    //res.status(200).json({
        //success: true,
        //token
    //})

    sendToken(user, 200, res)
}) 