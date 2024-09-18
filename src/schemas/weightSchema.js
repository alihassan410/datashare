import * as Yup from 'yup';

const weightSchema = Yup.object().shape({
  animalType: Yup.string().required('Animal Type is required'),
  animal_code: Yup.string().required('Code is required'),
  new_weight: Yup.number().required('New Weight is required').positive('Weight must be a positive number'),
  recordedAt: Yup.date().required('Recorded At is required'),
});

export default weightSchema;
