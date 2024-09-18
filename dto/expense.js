class ExpenseDTO {
    constructor(expense) {
        this._id = expense._id;
        this.expenseType = expense.expenseType;
        this.amount = expense.amount;
        this.dateIncurred = expense.dateIncurred;
    }
}

module.exports = ExpenseDTO;
