import * as yup from "yup";

const productSchema = yup.object().shape({
  product_name: yup.string().required("Product Name is required"),
  price: yup.number().required('Price is required').positive('Price must be positive'),
  quantity: yup.number().required('Quantity is required').positive('Quantity must be positive'),
  expiry_date: yup.date().optional(),
});

export default productSchema; 