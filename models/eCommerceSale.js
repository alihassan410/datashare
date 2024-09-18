// models/eCommerceSale.js
const mongoose = require('mongoose');

const ECommerceSaleSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    pricePerItem: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        required: true
    }
},
{timestamps: true},
);

const ECommerceSale = mongoose.model('ECommerceSale', ECommerceSaleSchema, 'eCommerceSales');

module.exports = ECommerceSale;
