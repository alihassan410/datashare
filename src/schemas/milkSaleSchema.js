import * as Yup from 'yup';

const milkSaleSchema = Yup.object().shape({
  customerName: Yup.string().required('Customer Name is required'),
  quantity: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
  pricePerLiter: Yup.number().required('Price per Liter is required').positive('Price per Liter must be a positive number'),
  totalSale: Yup.number().required('Total Sale is required').positive('Total Sale must be a positive number'),
  date: Yup.date().optional(), // Date is optional
});

export default milkSaleSchema;
