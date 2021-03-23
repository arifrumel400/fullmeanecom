const express = require('express')
const { getProduct, newProduct,getSingleProduct, updateProduct, deleteProduct} = require('../controllers/productController')
const router = express.Router()



router.route('/products').get(getProduct)
router.route('/product/new').post(newProduct)
router.route('/product/:id').get(getSingleProduct)

router.route('/product/:id').put(updateProduct)

router.route('/product/:id').delete(deleteProduct)



module.exports = router