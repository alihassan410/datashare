// models/milkSale.js
const mongoose = require('mongoose');

const MilkSaleSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    pricePerLiter: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    totalSale: {
        type: Number,
        required: true
    }
},
   {timestamps: true},
);

module.exports = mongoose.model('MilkSale', MilkSaleSchema , 'MilkSales');

