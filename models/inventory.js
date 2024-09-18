const mongoose = require('mongoose');
const { Schema } = mongoose;


const inventorySchema = new Schema({
    itemName: { type: String, required: true, enum: ["Feed", "Medicine", "Others"] },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
},
{ timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema, 'InventoryItems');
