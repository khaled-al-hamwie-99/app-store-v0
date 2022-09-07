const Product = require('../models/product')

const createProduct = async (req, res) => {
    res.send('your products are')
}

const getProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilter } = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = (featured === 'true' || featured === 'yes' || featured === '1') ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    if (numericFilter) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$slt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|<=|=)\b/g
        let filter = numericFilter.replace(regEx, match => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filter = filter.split(',').forEach(item => {
            let [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        });
    }
    let result = Product.find(queryObject)
    // sort
    if (sort) {
        let sortList = sort.split(',').join(" ");
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }
    // fields
    if (fields) {
        let fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    // limit
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    const products = await result
    res.json({ nproduct: products.length, products })
}
module.exports = {
    createProduct,
    getProducts,
}