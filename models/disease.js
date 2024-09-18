// models/disease.js
const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    symptoms: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
},
    { timestamps: true },
);

module.exports = mongoose.model('Disease', DiseaseSchema, 'Diseases');
