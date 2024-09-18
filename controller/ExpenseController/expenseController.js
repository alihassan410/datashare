const Joi = require('joi');
const Expense = require('../../models/expense');

const ExpenseController = {
    async addExpense(req, res, next) {
        const expenseSchema = Joi.object({
            expenseType: Joi.string().required().valid('Feed', 'Medicine', 'Maintenance', 'Transportation', 'Other'),
            amount: Joi.number().required(),
            dateIncurred: Joi.date().required()
        });

        const { error } = expenseSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { expenseType, amount, dateIncurred } = req.body;

        try {
            const newExpense = new Expense({
                expenseType,
                amount,
                dateIncurred,
            });

            const savedExpense = await newExpense.save();
            return res.status(201).json({ expense: savedExpense });
        } catch (error) {
            return next(error);
        }
    },
    async deleteExpense(req, res, next) {
        try {
            const newExpense = await Expense.findOneAndDelete({ _id: req.params.id });
            return res.status(201).json({ expense: savedExpense });
        } catch (error) {
            return next(error);
        }
    },
    async getAllExpenses(req, res, next) {
        try {
            const expenses = await Expense.find();
            if (!expenses || expenses.length === 0) {
                return res.status(404).json({ message: 'No expenses found' });
            }

            return res.status(200).json({ expenses });
        } catch (error) {
            return next(error);
        }
    },
}

module.exports = ExpenseController;