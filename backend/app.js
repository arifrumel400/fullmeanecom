const express = require('express')
const app = express()

const errorMiddleware = require('./middlewares/errors')

app.use(express.json())
  

const products = require('./routes/product')
app.use('/', products)

//Middlewares to handle error
app.use(errorMiddleware)

module.exports = app 