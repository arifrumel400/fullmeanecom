const express = require('express')
const { registerUser, loginUser, logoutUser,forgotPassword, resetPassword, getUserProfile, UpdatePassword, updateProfile, allUsers, getUserDetails   } = require('../controllers/userController')
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth')
const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/password/update').put(isAuthenticatedUser, UpdatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)
router.route('/admin/users').get(isAuthenticatedUser, authorizeRole('admin'), allUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRole('admin'), getUserDetails)

module.exports = router