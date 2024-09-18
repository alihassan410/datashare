import * as Yup from 'yup';

const meatSchema = Yup.object().shape({
  animalType: Yup.string().required('Animal Type is required'),
  animal_code: Yup.string().required('Animal Code is required'),
  sex: Yup.string().required('Gender is required'),
  weight: Yup.number().required('Weight is required').positive('Weight must be a positive number'),
  purchase_price: Yup.number().required('Purchase Price is required').positive('Purchase Price must be a positive number'),
  purchase_date: Yup.date().required('Purchase Date is required'),
  age: Yup.number().required('Age is required').positive('Age must be a positive number'),
});

export default meatSchema;
