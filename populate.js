require('dotenv').config()

const connectDB = require('./src/db/connect')
const Product = require('./src/models/product')

const jsonProduct = require('./products.json')
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        await Product.deleteMany()
        await Product.create(jsonProduct)
        console.log("succes")
        process.exit(0)
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}
start()