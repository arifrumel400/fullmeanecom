
const { } =require("../models/product")
const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
const User = require('../models/user')

//Create New product => /product/new
exports.newProduct = catchAsyncErrors( async (req, res, next) => {
    
    req.body.user = req.user.id

    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

///Get all product => /products

exports.getProduct = catchAsyncErrors (async (req, res, next) => {

    const products = await Product.find();
    const resPerPage = 4;
    
    const apiFeatures = new APIFeatures (Product.find(), req.query)
          .search()
          .filter()   
          .pagnation(resPerPage) 

      const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        cout : products.length,
        products
    })
})

//get signle product details => /product/:id
exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        // return res.status(404).json({
        //     success: false, 
        //     message: 'product not found'
        // })
        return next(new ErrorHandler('Product not found!', 404))
    }
    res.status(200).json({
        success: true, 
        product
    })
})

//Update product = > /product/:id
exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product not found!', 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})

//Delete Product => /product/:id
exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product not found!', 404))
    }    
    await Product.remove()
    
    res.status(200).json({
        success: true,
        message: 'Product is removed'
    })
            
}) 

