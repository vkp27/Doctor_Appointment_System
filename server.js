const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')

//dotenv config
dotenv.config()

//rest object
const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Server running',
    });
});

//port
const port = process.env.PORT

//listen port
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white);
});