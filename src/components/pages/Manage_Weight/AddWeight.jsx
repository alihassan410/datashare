import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addWeight } from "../../../api/internal";
import TextInput from "../../TextInput/TextInput";
import SelectInput from "../../SelectInput/SelectInput";
import { useFormik } from "formik";
import weightSchema from "../../../schemas/weightSchema";

const AddWeight = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      animalType: '',
      animal_code: '',
      new_weight: '',
      recordedAt: '',
    },
    validationSchema: weightSchema,
    onSubmit: async (values, { resetForm }) => {
      const data = {
        animalType: values.animalType,
        animal_code: values.animal_code,
        new_weight: values.new_weight,
        recordedAt: values.recordedAt,
      };
      try {
        const response = await addWeight(data);
        if (response.status === 201 || response.status === 200) {
          navigate("/dashboard/manage_meat");
        } else if (response.code === "ERR_BAD_REQUEST") {
          setError(response.response.data.message);
        }
      } catch (error) {
        setError("An error occurred while adding the weight.");
      } finally {
        resetForm();  // Reset the form fields
      }
    },
  });

  const { values, touched, handleBlur, handleChange, errors, handleSubmit } = formik;

  return (
    <div className="max-w-lg w-full px-0 py-9 bg-white mt-[30px] shadow-none m-auto overflow-hidden sm:rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Add New Weight</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="text-center">
            <label htmlFor="animalType">AnimalType</label>
            <SelectInput
              options={[
                { value: 'none', text: 'Select any one..' },
                { value: 'buffalo', text: 'Buffalo' },
                { value: 'cow', text: 'Cow' },
                { value: 'goat', text: 'Goat' },
              ]}
              value={values.animalType}
              name="animalType"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Select Animal Type"
              error={errors.animalType && touched.animalType}
              errorMessage={errors.animalType}
            />
          </div>
          <div className="text-center">
            <label htmlFor="animal_code">Animal Code</label>
            <TextInput
              value={values.animal_code}
              name="animal_code"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Animal Code"
              error={errors.animal_code && touched.animal_code}
              errormessage={errors.animal_code}
            />
          </div>
          <div className="text-center">
            <label htmlFor="new_weight">New Weight</label>
            <TextInput
              type="number"
              value={values.new_weight}
              name="new_weight"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='New Weight'
              error={errors.new_weight && touched.new_weight}
              errormessage={errors.new_weight}
            />
          </div>
          <div className="text-center">
            <label htmlFor="recordedAt">Recorded At</label>
            <TextInput
              type="date"
              value={values.recordedAt}
              name="recordedAt"
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.recordedAt && touched.recordedAt}
              errormessage={errors.recordedAt}
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Weight
          </button>
        </div>
      </form>
      {error !== "" && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}
    </div>
  );
};

export default AddWeight;
