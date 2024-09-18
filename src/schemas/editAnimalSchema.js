import * as Yup from 'yup';

const editAnimalSchema = Yup.object().shape({
  animalType: Yup.string(),
  code: Yup.number().positive('Code must be a positive number'),
  breed: Yup.string(),
  weight: Yup.number().positive('Weight must be a positive number'),
  avg_milk: Yup.number().positive('Average Milk must be a positive number'),
  purchase_price: Yup.number().positive('Purchase Price must be a positive number'),
  with_calf: Yup.string(),
  age: Yup.number().positive('Age must be a positive number'),
  milking_status: Yup.string(),
  disease_history: Yup.string(),
  total_calf: Yup.number().positive('Total Calf must be a positive number'),
  death_date: Yup.date().nullable(),
  calving_history: Yup.string(),
  purchase_date: Yup.date(),
  sale_date: Yup.date().nullable(),
  expected_delivery_date: Yup.date().nullable(),
});

export default editAnimalSchema;
