const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    animalType: { type: String, required: true, enum: ['buffalo', 'cow'] },
    animal_code: { type: String },
    breed: { type: String, required: true },
    weight: { type: Number, required: true },
    avg_milk: { type: Number, required: true },
    purchase_price: { type: Number, required: true },
    with_calf: { type: String, required: true },
    age: { type: Number, required: true },
    milking_status: { type: String, required: true },
    disease_history: { type: String, required: true },
    total_calf: { type: Number, required: true },
    death_date: { type: Date, default: null },
    calving_history: { type: String, required: true },
    purchase_date: { type: Date, required: true },
    sale_date: { type: Date, default: null },
    expected_delivery_date: { type: Date, default: null }

},
    { timestamps: true },
);

module.exports = mongoose.model('Animal', animalSchema, 'Animals');
