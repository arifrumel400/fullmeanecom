const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv')

//handle UnCaught exception
process.on('uncaughtException', err=> {
    console.log(`ERROR: ${err.message}`)
    console.log('Shutting Down server due to uncaughtException')
    process.exit(1)
})

//setting up config file 
dotenv.config({path: 'backend/config/config.env'})

//connection to dabase 
connectDatabase();

app.listen(process.env.PORT, () => console.log(`Server started on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode `)) 
const server = app.listen(process.env.PORT, () => console.log(`Server started on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode `))

//Handle unhandled Promise rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`); 
    console.log(`Shutting down the server due to unhandled promis rejection`)

    server.close(()=>{
        process.exit(1)
    })
}) 