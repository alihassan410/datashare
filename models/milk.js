// Assuming you have a file for models, e.g., milkModel.js
const { date } = require('joi');
const mongoose = require('mongoose');

const MilkSchema = new mongoose.Schema({
    animalType: { type: String, required: true, enum: ['buffalo', 'cow'] },
    animal_code: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true, enum: ['morning', 'evening'], },
    quantity: { type: Number, required: true }
},
    { timestamps: true },
);

module.exports = mongoose.model('Milk', MilkSchema, 'Milks');


