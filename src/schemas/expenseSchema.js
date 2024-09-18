import * as yup from "yup";

const expenseSchema = yup.object().shape({
  expenseType: yup.string().required("Expense Type is required"),
  amount: yup.number().required('Amount is required').positive('Amount must be a positive number'),
  dateIncurred: yup.date().required('Date Incurred is required')
});

export default expenseSchema; 