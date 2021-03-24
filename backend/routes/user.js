const express = require('express')
const { registerUser, loginUser, logoutUser,forgotPassword, resetPassword, getUserProfile, UpdatePassword, updateProfile } = require('../controllers/userController')
const { isAuthenticatedUser } = require('../middlewares/auth')
const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/password/update').put(isAuthenticatedUser, UpdatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

module.exports = router