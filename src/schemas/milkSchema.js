import * as Yup from 'yup';

const milkSchema = Yup.object().shape({
  animalType: Yup.string().required('Animal Type is required'),
  animal_code: Yup.string().required('Code is required'),
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time is required'),
  quantity: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
});

export default milkSchema;
