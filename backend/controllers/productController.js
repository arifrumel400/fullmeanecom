
const { } =require("../models/product")
const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')



//Create New product => /product/new
exports.newProduct = async (req, res, next) => {
    

    const product = await Product.create(req.body)
    
    res.status(201).json({
        success : true,
        product : true,
        product
    })
}



//Get all product => /api/v1/products

exports.getProduct = async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        cout : products.length,
        products
    })
}

//get signle product details => /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if(!product){
        //return res.status(404).json({
         //   success: false, 
            //message: 'product not found'
      //  })
    }

    res.status(200).json({
        success: true, 
        product
    })
}

//Update product = > /api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if(!product){
        return res.status(404).json({
            success: false, 
            message: 'product not found'
        })
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
}

//Delete Product => /api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if(!product){
        return res.status(404).json({
            success: false, 
            message: 'product not found'
        })
    }    

    await Product.remove()


    res.status(200).json({
        success: true,
        message: 'Product is removed'
    })
}


