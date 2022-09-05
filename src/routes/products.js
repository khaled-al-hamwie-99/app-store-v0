const express = require('express')
const { getProducts, createProduct } = require('../controllers/products')
const router = express.Router()

router.route('/').get(getProducts).post(createProduct)

// router.route('/test').get((req,res)=>{
//     req.query
// })
module.exports = router