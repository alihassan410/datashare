const mongoose = require('mongoose');

const meatAnimalSchema = new mongoose.Schema({
    animalType: {
        type: String,
        enum: ['goat', 'buffalo', 'cow'],
        required: true
    },
    animal_code: {
        type: String,
    },
    sex: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    purchase_price: {
        type: Number,
        required: true
    },
    purchase_date: {
        type: Date,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
},
    { timestamps: true },
);

module.exports = mongoose.model('MeatAnimal', meatAnimalSchema, 'MeatAnimals');


