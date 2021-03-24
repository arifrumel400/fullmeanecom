const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const order = require('../models/order')

//Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors (async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo, 
        paidAt: Date.now(), 
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        order
    })
})

//Get Signle orlder => /order/:id
exports.getSingleOrder = catchAsyncErrors (async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name, email')

    if(!order){
        return next(new ErrorHandler('No order found with this id', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

//Get logged in user orders => /orders/me
exports.myOrders = catchAsyncErrors (async (req, res, next) => {
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        orders
    })
}) 

//Get all orders => /admin/orders
exports.allOrders = catchAsyncErrors (async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0

    order.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
}) 

//update / process order => /admin/order/:id
exports.UpdateOrder = catchAsyncErrors (async (req, res, next) => {
    const order = await Order.find(req.params.id)

   if(order.orderStatus === 'Delivered'){
       return next(new ErrorHandler('Your have alread delivered this product', 400))
   }

   order.orderItems.forEach(async item => {
       await updateStock(item.product, item.quantity)
   })

   order.status = req.body.status, 
   order.deliveredAt = Date.now()

   await order.save()

    res.status(200).json({
        success: true
    })
})

async function updateStock(id, quantity){
    const product = await Product.findById(id)

    product.stock = product.stock - quantity

    await product.save({validateBeforeSave: false})
} 

//Delete order => /admin/order/:id
exports.deleteOrder = catchAsyncErrors (async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('No Order found with that id', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
}) 

//Create new review => /review
exports.createProductReview = catchAsyncErrors (async (req, res, next) => {
    const {rating, comment, productId} = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(
        r => r.user.toString === req.user._id.toString()
    )

    if(isReviewed) {

        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment
                review.rating = rating
            }
        })

    } else {
        product.reviews.push(review)
        product.numberOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({validateBeforeSave: false})

    res.status(200).json({
        success: true
    })
}) 