const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema ({
    product_name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    expiry_date: {type: Date, required: false},
},
    {timestamps: true}
);

module.exports = mongoose.model('Product', productSchema, 'Products');

