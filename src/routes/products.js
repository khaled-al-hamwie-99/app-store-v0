const express = require('express')
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/products')
const router = express.Router()

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getProductById).patch(updateProduct).delete(deleteProduct)

module.exports = router