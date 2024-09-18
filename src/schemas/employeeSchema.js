import * as yup from "yup";

const employeeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  position: yup.string().required('Position is required'),
  salary: yup.number().required('Salary is required').positive('Salary must be a positive number'),
  hireDate: yup.date().optional()
});

export default employeeSchema; 