import * as yup from "yup";

const inventorySchema = yup.object().shape({
  itemName: yup.string().required("Item Name is required"),
  price: yup.number().required('Price is required').positive('Price must be positive'),
  stock: yup.number().required('Stock is required').positive('Stock must be positive'),
});

export default inventorySchema; 