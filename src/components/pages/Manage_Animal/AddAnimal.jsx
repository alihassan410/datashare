import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAnimal } from "../../../api/internal";
import TextInput from "../../TextInput/TextInput";
import SelectInput from "../../SelectInput/SelectInput";
import { useFormik } from "formik";
import animalSchema from "../../../schemas/animalSchema";

const AddAnimal = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleAddAnimal = async () => {
    const data = {
      animalType: values.animalType,
      animal_code: 121212121,
      breed: values.breed,
      weight: values.weight,
      avg_milk: values.avg_milk,
      purchase_price: values.purchase_price,
      with_calf: values.with_calf,
      age: values.age,
      milking_status: values.milking_status,
      disease_history: values.disease_history,
      total_calf: values.total_calf,
      death_date: values.death_date,
      calving_history: values.calving_history,
      purchase_date: values.purchase_date,
      sale_date: values.sale_date,
      expected_delivery_date: values.expected_delivery_date,
    };
    const response = await addAnimal(data);
    if (response.status === 201) {
      navigate("/dashboard/manage_animal");
    }
    else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      animalType: '',
      animal_code: 23232323,
      breed: '',
      weight: '',
      avg_milk: '',
      purchase_price: '',
      with_calf: '',
      age: '',
      milking_status: '',
      disease_history: '',
      total_calf: '',
      death_date: null,
      calving_history: '',
      purchase_date: new Date,
      sale_date: null,
      expected_delivery_date: null,
    },
    validationSchema: animalSchema,
  });

  return (
    <div className="max-w-lg w-full px-0 py-9 bg-white mt-[30px] shadow-none m-auto overflow-hidden sm:rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Register New Animal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="text-center">
          <label htmlFor="animalType">AnimalType</label>
          <SelectInput className='w-9'
            options={[
              { value: 'none', text: 'Select any one..' },
              { value: 'buffalo', text: 'Buffalo' },
              { value: 'cow', text: 'Cow' },
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
          <label htmlFor="breed">Breed</label>
          <TextInput
            type="text"
            value={values.breed}
            name="breed"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Breed"
            error={errors.breed && touched.breed ? true : false}
            errormessage={errors.breed}
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
          <label htmlFor="avg_milk">Avg Milk</label>
          <TextInput
            type="number"
            value={values.avg_milk}
            name="avg_milk"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Avg Milk"
            error={errors.avg_milk && touched.avg_milk ? true : false}
            errormessage={errors.avg_milk}
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
          <label htmlFor="with_calf">With Calf</label>
          <TextInput
            type="text"
            value={values.with_calf}
            name="with_calf"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="With Calf"
            error={errors.with_calf && touched.with_calf ? true : false}
            errormessage={errors.with_calf}
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
        <div className="text-center">
          <label htmlFor="milking_status">Milking Status</label>
          <TextInput
            type="text"
            value={values.milking_status}
            name="milking_status"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Milking Status"
            error={errors.milking_status && touched.milking_status ? true : false}
            errormessage={errors.milking_status}
          />
        </div>
        <div className="text-center">
          <label htmlFor="disease_history">Disease History</label>
          <TextInput
            type="text"
            value={values.disease_history}
            name="disease_history"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Disease History"
            error={errors.disease_history && touched.disease_history ? true : false}
            errormessage={errors.disease_history}
          />
        </div>
        <div className="text-center">
          <label htmlFor="total_calf">Total Calf</label>
          <TextInput
            type="number"
            value={values.total_calf}
            name="total_calf"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Total Calf"
            error={errors.total_calf && touched.total_calf ? true : false}
            errormessage={errors.total_calf}
          />
        </div>
        <div className="text-center">
          <label htmlFor="death_date">Death Date</label>
          <TextInput
            type="date"
            value={values.death_date}
            name="death_date"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Death Date"
            error={errors.death_date && touched.death_date ? true : false}
            errormessage={errors.death_date}
          />
        </div>
        <div className="text-center">
          <label htmlFor="calving_history">Calving History</label>
          <TextInput
            type="text"
            value={values.calving_history}
            name="calving_history"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Calving History"
            error={errors.calving_history && touched.calving_history ? true : false}
            errormessage={errors.calving_history}
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
          <label htmlFor="sale_date">Sale Date</label>
          <TextInput
            type="date"
            value={values.sale_date}
            name="sale_date"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Sale Date"
            error={errors.sale_date && touched.sale_date ? true : false}
            errormessage={errors.sale_date}
          />
        </div>
        <div className="text-center">
          <label htmlFor="expected_delivery_date">Expected Delivery Date</label>
          <TextInput
            type="date"
            value={values.expected_delivery_date}
            name="expected_delivery_date"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Delivery Date"
            error={errors.expected_delivery_date && touched.expected_delivery_date ? true : false}
            errormessage={errors.expected_delivery_date}
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleAddAnimal}
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

export default AddAnimal;
