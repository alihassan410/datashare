import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addInventory } from "../../../api/internal";
import TextInput from "../../TextInput/TextInput";
import SelectInput from "../../SelectInput/SelectInput";
import { useFormik } from "formik";
import inventorySchema from "../../../schemas/inventorySchema";

const AddInventory = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleAddInventory = async () => {
    const data = {
      itemName: values.itemName,
      price: values.price,
      stock: values.stock,
    };

    const response = await addInventory(data);

    if (response.status === 200) {
      navigate("/dashboard/manage_inventory");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      itemName: "",
      price: "",
      stock: "",
    },
    validationSchema: inventorySchema,
  });

  return (
    <div className="max-w-md w-full px-6 py-8 bg-white mt-[50px] shadow-none m-auto overflow-hidden sm:rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">
        Add Inventory Items
      </h2>
      <div className="text-center">
        <label htmlFor="itemName">ItemName</label>
        <SelectInput
          className="w-9"
          options={[
            { value: "none", text: "Select any one.." },
            { value: "Feed", text: "Feed" },
            { value: "Medicine", text: "Medicine" },
            { value: "Other", text: "Other" },
          ]}
          value={values.animalType}
          name="itemName"
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.itemName && touched.itemName ? true : false}
          errorMessage={errors.itemName}
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
        <label htmlFor="stock">Stock</label>
        <TextInput
          type="number"
          name="stock"
          value={values.stock}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Stock"
          error={errors.stock && touched.stock ? 1 : undefined}
          errormessage={errors.stock}
          className="mb-4"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleAddInventory}
        >
          Add
        </button>
      </div>
      {error !== "" && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default AddInventory;
