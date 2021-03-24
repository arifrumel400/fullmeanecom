const express = require('express')
const { getProduct, newProduct,getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews} = require('../controllers/productController')
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth')
const router = express.Router()



router.route('/products').get(getProduct)
router.route('/product/new').post(isAuthenticatedUser, authorizeRole('admin'), newProduct)
router.route('/product/:id').get(getSingleProduct)

router.route('/product/:id').put(isAuthenticatedUser, authorizeRole('admin'), updateProduct)

router.route('/product/:id').delete(isAuthenticatedUser, authorizeRole('admin'), deleteProduct)
router.route('/review').post(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)



module.exports = router