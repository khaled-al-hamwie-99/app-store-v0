const Product = require('../models/product')

const createProduct = async (req, res) => {
    res.send('your products are')
}

const getProducts = async (req, res) => {
    res.json(await Product.find(req.query))
}
module.exports = {
    createProduct,
    getProducts,
}