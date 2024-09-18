import * as Yup from 'yup';

const animalSchema = Yup.object().shape({
  animalType: Yup.string().required('Animal Type is required'),
  code: Yup.number().required('Code is required').positive('Code must be a positive number'),
  breed: Yup.string().required('Breed is required'),
  weight: Yup.number().required('Weight is required').positive('Weight must be a positive number'),
  avg_milk: Yup.number().required('Average Milk is required').positive('Average Milk must be a positive number'),
  purchase_price: Yup.number().required('Purchase Price is required').positive('Purchase Price must be a positive number'),
  with_calf: Yup.string().required('With Calf is required'),
  age: Yup.number().required('Age is required').positive('Age must be a positive number'),
  milking_status: Yup.string().required('Milking Status is required'),
  disease_history: Yup.string().required('Disease History is required'),
  total_calf: Yup.number().required('Total Calf is required').positive('Total Calf must be a positive number'),
  death_date: Yup.date().nullable(),
  calving_history: Yup.string().required('Calving History is required'),
  purchase_date: Yup.date().required('Purchase Date is required'),
  sale_date: Yup.date().nullable(),
  expected_delivery_date: Yup.date().nullable(),
});

export default animalSchema;
