import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../../api/internal";
import TextInput from "../../TextInput/TextInput";
import { useFormik } from "formik";
import productSchema from "../../../schemas/productSchema";

const AddProduct = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleAddProduct = async (values) => {
    try {
      const response = await addProduct(values);

      if (response.status === 201) {
        navigate("/dashboard/manage_product");
      } else if (response.code === "ERR_BAD_REQUEST") {
        setError(response.response.data.message);
      }
    } catch (error) {
      setError("Failed to add product. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      product_name: "",
      price: "",
      quantity: "",
      expiry_date: "",
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      await handleAddProduct(values);
    },
  });

  const { values, touched, handleBlur, handleChange, errors, handleSubmit } = formik;

  return (
    <div className="max-w-md w-full px-6 py-8 bg-white mt-[50px] shadow-none m-auto overflow-hidden sm:rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="text-center">
          <label htmlFor="product_name">Product Name</label>
          <TextInput
            type="text"
            name="product_name"
            value={values.product_name}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Product Name"
            error={errors.product_name && touched.product_name ? 1 : undefined}
            errormessage={errors.product_name}
            className="mb-4"
          />
        </div>
        <div className="text-center">
          <label htmlFor="price">Price</label>
          <TextInput
            type="number"
            name="price"
            value={values.price}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Price"
            error={errors.price && touched.price ? 1 : undefined}
            errormessage={errors.price}
            className="mb-4"
          />
        </div>
        <div className="text-center">
          <label htmlFor="quantity">Quantity</label>
          <TextInput
            type="number"
            name="quantity"
            value={values.quantity}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Quantity"
            error={errors.quantity && touched.quantity ? 1 : undefined}
            errormessage={errors.quantity}
            className="mb-4"
          />
        </div>
        <div className="text-center">
          <label htmlFor="expiry_date">Expiry Date</label>
          <TextInput
            type="date"
            name="expiry_date"
            value={values.expiry_date}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.expiry_date && touched.expiry_date ? 1 : undefined}
            errormessage={errors.expiry_date}
            className="mb-4"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add
          </button>
        </div>
      </form>
      {error !== "" && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default AddProduct;
