require('dotenv').config()
require('express-async-errors')
const express = require('express')
const connect = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const productRouter = require('./routes/products')

const app = express()

const port = process.env.PORT || 3000
// middleware
app.use(express.json())
// router
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const start = async () => {
    try {
        // console.clear()
        await connect(process.env.LOCAL_URL)
        app.listen(port, () => {
            console.log(`SERVER is listening on port : ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()