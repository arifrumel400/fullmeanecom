const express = require('express')
const { newOrder, myOrders, getSingleOrder, allOrders, UpdateOrder } = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth')
const router = express.Router()

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/orders/me').get(isAuthenticatedUser, myOrders)
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRole('admin'), allOrders)
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRole('admin'), UpdateOrder)


module.exports = router