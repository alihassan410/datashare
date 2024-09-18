const Joi = require('joi');
const MilkSale = require('../../models/milkSale');
const ECommerceSale = require('../../models/eCommerceSale');
const Expense = require('../../models/expense');
const Employee = require('../../models/employee');

const LossProfitController = {
    async calculateLossProfit(req, res, next) {
        const lossProfitSchema = Joi.object({
            fromDate: Joi.date().optional(),
            toDate: Joi.date().optional()
        });

        const { error } = lossProfitSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { fromDate, toDate } = req.body;

        try {
            const milkSales = await MilkSale.find({ date: { $gte: fromDate, $lte: toDate } });
            const totalMilkSales = milkSales.reduce((sum, sale) => sum + sale.totalSale, 0);

            const eCommerceSales = await ECommerceSale.find({ date: { $gte: fromDate, $lte: toDate } });
            const totalECommerceSales = eCommerceSales.reduce((sum, sale) => sum + sale.totalPrice, 0);

            const expenses = await Expense.find({ date: { $gte: fromDate, $lte: toDate } });
            const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

            const employees = await Employee.find({ hireDate: { $gte: fromDate, $lte: toDate } });
            const totalSalaries = employees.reduce((sum, employee) => sum + employee.salary, 0);

            const totalIncome = totalMilkSales + totalECommerceSales;
            const totalOperationalExpenses = totalExpenses + totalSalaries;

            const profitOrLoss = totalIncome - totalOperationalExpenses;

            res.status(200).json({
                totalIncome,
                totalOperationalExpenses,
                profitOrLoss
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = LossProfitController;
