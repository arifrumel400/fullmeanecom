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