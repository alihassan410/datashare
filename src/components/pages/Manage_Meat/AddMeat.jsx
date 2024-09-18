import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMeatAnimal } from "../../../api/internal";
import TextInput from "../../TextInput/TextInput";
import SelectInput from "../../SelectInput/SelectInput";
import { useFormik } from "formik";
import meatSchema from "../../../schemas/meatSchema";

const AddMeat = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleAddMeat = async () => {
    const data = {
      animalType: values.animalType,
      animal_code: "2323233",
      sex: values.sex,
      weight: values.weight,
      purchase_price: values.purchase_price,
      purchase_date: values.purchase_date,
      age: values.age,
    };
    const response = await addMeatAnimal(data);
    if (response.status === 201) {
      navigate("/dashboard/manage_meat");
    }
    else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      animalType: '',
      animal_code: '23232323',
      sex: '',
      weight: '',
      purchase_price: '',
      purchase_date: new Date(),
      age: '',
    },
    validationSchema: meatSchema,
  });

  return (
    <div className="max-w-lg w-full px-0 py-9 bg-white mt-[30px] shadow-none m-auto overflow-hidden sm:rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">New Meat Animal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="text-center">
          <label htmlFor="animalType">AnimalType</label>
          <SelectInput className='w-9'
            options={[
              { value: 'none', text: 'Select any one..' },
              { value: 'buffalo', text: 'Buffalo' },
              { value: 'cow', text: 'Cow' },
              { value: 'goat', text: 'Goat' }
            ]}
            value={values.animalType}
            name="animalType"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Select Animal Type"
            error={errors.animalType && touched.animalType ? true : false}
            errorMessage={errors.animalType}
          />
        </div>
        <div className="text-center">
          <label htmlFor="sex">Sex</label>
          <SelectInput className='w-9'
            options={[
              { value: 'none', text: 'Select gender..' },
              { value: 'male', text: 'Male' },
              { value: 'female', text: 'Female' },
            ]}
            value={values.sex}
            name="sex"
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.sex && touched.sex ? true : false}
            errorMessage={errors.sex}
          />
        </div>
        <div className="text-center">
          <label htmlFor="weight">Weight</label>
          <TextInput
            type="number"
            value={values.weight}
            name="weight"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Weight"
            error={errors.weight && touched.weight ? true : false}
            errormessage={errors.weight}
          />
        </div>
        <div className="text-center">
          <label htmlFor="purchase_price">Purchase Price</label>
          <TextInput
            type="number"
            value={values.purchase_price}
            name="purchase_price"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Purchase Price"
            error={errors.purchase_price && touched.purchase_price ? true : false}
            errormessage={errors.purchase_price}
          />
        </div>
        <div className="text-center">
          <label htmlFor="purchase_date">Purchase Date</label>
          <TextInput
            type="date"
            value={values.purchase_date}
            name="purchase_date"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Purchase Date"
            error={errors.purchase_date && touched.purchase_date ? true : false}
            errormessage={errors.purchase_date}
          />
        </div>
        <div className="text-center">
          <label htmlFor="age">Age</label>
          <TextInput
            type="number"
            value={values.age}
            name="age"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Age"
            error={errors.age && touched.age ? true : false}
            errormessage={errors.age}
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleAddMeat}
        >
          Add Animal
        </button>
      </div>
      {error !== "" && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}
    </div>
  );
};

export default AddMeat;
