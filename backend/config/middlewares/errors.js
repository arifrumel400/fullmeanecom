const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false, 
            error: err,
            errMessage : err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV==='PRODUCTION'){
        let error = {...err}

        error.message = err.message

        //Wrong mongoose object ID error
        if(err.name === 'CastError'){
            const message = `Resource not found. Invali: ${err.path}`

            error = new ErrorHandler(message, 400)
        }
        
          if(err.name === 'ValidationError'){
             const message = Object.values(err.errors).map(value => value.message)
             error = new ErrorHandler(message, 400)
        }
        res.status(error.statusCode).json({
            success: false, 
            message : error.message || "Internal server error"
        })
    }


}