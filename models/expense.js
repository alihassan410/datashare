const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    expenseType: {
        type: String,
        required: true,
        enum: ['Feed', 'Medicine', 'Maintenance', 'Transportation', 'Other']
    },
    amount: {
        type: Number,
        required: true
    },
    dateIncurred: {
        type: Date,
        default: Date.now,
        required: true,
    }
},
{timestamps: true},
);

module.exports = mongoose.model('Expense', ExpenseSchema, 'Expenses');


