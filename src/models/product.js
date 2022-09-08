const mongoose = require('mongoose')

const ProductScema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name must be provided"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "product priece must be provided"],
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5,
        max: 5,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        required: [true, "you must provide a company name"],
        enum: {
            values: ['ikea', 'liddy', 'marcos', 'caressa'],
            message: "{VALUE} is not supported"
        }
    }
})

const Product = mongoose.model('Product', ProductScema)
module.exports = Product