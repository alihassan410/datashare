import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editAnimal, getMilkAnimalById } from "../../../api/internal";
import TextInput from "../../TextInput/TextInput";
import SelectInput from "../../SelectInput/SelectInput";
import { useFormik } from "formik";
import editAnimalSchema from "../../../schemas/editAnimalSchema";

const EditAnimal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [newAnimal, setNewAnimal] = useState({});
  const [error, setError] = useState("");

  // Fetch the animal data by ID
  useEffect(() => {
    const getMilkAnimal = async () => {
      try {
        let res = await getMilkAnimalById(params.id);
        setNewAnimal(res.data.animals);
      } catch (error) {
        console.error("Error fetching animal:", error);
        setError("Error fetching animal details. Please try again later.");
      }
    };
    getMilkAnimal();
  }, [params.id]);

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      animalType: "",
      animal_code: "",
      breed: "",
      weight: "",
      avg_milk: "",
      purchase_price: "",
      with_calf: "",
      age: "",
      milking_status: "",
      disease_history: "",
      total_calf: "",
      death_date: "",
      calving_history: "",
      purchase_date: "",
      sale_date: "",
      expected_delivery_date: "",
    },
    validationSchema: editAnimalSchema,
    onSubmit: async (values) => {
      const data = {
        animalType: values.animalType,
        animal_code: values.animal_code,
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
        _id: newAnimal._id,
      };

      try {
        const response = await editAnimal(data);
        if (response.status === 200) {
          navigate("/dashboard/manage_animal");
        } else if (response.code === "ERR_BAD_REQUEST") {
          setError(response.response.data.message);
        }
      } catch (error) {
        console.error("Error editing animal:", error);
        setError("Error editing animal. Please try again later.");
      }
    },
  });

  // Update formik values when newAnimal is set
  useEffect(() => {
    if (newAnimal) {
      formik.setValues({
        animalType: newAnimal.animalType || "",
        animal_code: newAnimal.animal_code || "",
        breed: newAnimal.breed || "",
        weight: newAnimal.weight || "",
        avg_milk: newAnimal.avg_milk || "",
        purchase_price: newAnimal.purchase_price || "",
        with_calf: newAnimal.with_calf || "",
        age: newAnimal.age || "",
        milking_status: newAnimal.milking_status || "",
        disease_history: newAnimal.disease_history || "",
        total_calf: newAnimal.total_calf || "",
        death_date: newAnimal.death_date || "",
        calving_history: newAnimal.calving_history || "",
        purchase_date: newAnimal.purchase_date ? new Date(newAnimal.purchase_date).toISOString().split('T')[0] : "",
        sale_date: newAnimal.sale_date ? new Date(newAnimal.sale_date).toISOString().split('T')[0] : "",
        expected_delivery_date: newAnimal.expected_delivery_date ? new Date(newAnimal.expected_delivery_date).toISOString().split('T')[0] : "",
      });
    }
  }, [newAnimal]);

  return (
    <div className="max-w-lg w-full px-0 py-9 bg-white mt-[30px] shadow-none m-auto overflow-hidden sm:rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Edit Animal Details</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="text-center">
            <label htmlFor="animalType">Animal Type</label>
            <SelectInput
              className="w-9"
              options={[
                { value: "none", text: "Select any one.." },
                { value: "buffalo", text: "Buffalo" },
                { value: "cow", text: "Cow" },
              ]}
              value={formik.values.animalType}
              name="animalType"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Select Animal Type"
              error={formik.errors.animalType && formik.touched.animalType ? true : false}
              errorMessage={formik.errors.animalType}
            />
          </div>
          <div className="text-center">
            <label htmlFor="breed">Breed</label>
            <TextInput
              type="text"
              value={formik.values.breed}
              name="breed"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Breed"
              error={formik.errors.breed && formik.touched.breed ? true : false}
              errormessage={formik.errors.breed}
            />
          </div>
          <div className="text-center">
            <label htmlFor="weight">Weight</label>
            <TextInput
              type="number"
              value={formik.values.weight}
              name="weight"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Weight"
              error={formik.errors.weight && formik.touched.weight ? true : false}
              errormessage={formik.errors.weight}
            />
          </div>
          <div className="text-center">
            <label htmlFor="avg_milk">Avg Milk</label>
            <TextInput
              type="number"
              value={formik.values.avg_milk}
              name="avg_milk"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Avg Milk"
              error={formik.errors.avg_milk && formik.touched.avg_milk ? true : false}
              errormessage={formik.errors.avg_milk}
            />
          </div>
          <div className="text-center">
            <label htmlFor="purchase_price">Purchase Price</label>
            <TextInput
              type="number"
              value={formik.values.purchase_price}
              name="purchase_price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Purchase Price"
              error={formik.errors.purchase_price && formik.touched.purchase_price ? true : false}
              errormessage={formik.errors.purchase_price}
            />
          </div>
          <div className="text-center">
            <label htmlFor="with_calf">With Calf</label>
            <TextInput
              type="text"
              value={formik.values.with_calf}
              name="with_calf"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="With Calf"
              error={formik.errors.with_calf && formik.touched.with_calf ? true : false}
              errormessage={formik.errors.with_calf}
            />
          </div>
          <div className="text-center">
            <label htmlFor="age">Age</label>
            <TextInput
              type="number"
              value={formik.values.age}
              name="age"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Age"
              error={formik.errors.age && formik.touched.age ? true : false}
              errormessage={formik.errors.age}
            />
          </div>
          <div className="text-center">
            <label htmlFor="milking_status">Milking Status</label>
            <TextInput
              type="text"
              value={formik.values.milking_status}
              name="milking_status"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Milking Status"
              error={formik.errors.milking_status && formik.touched.milking_status ? true : false}
              errormessage={formik.errors.milking_status}
            />
          </div>
          <div className="text-center">
            <label htmlFor="disease_history">Disease History</label>
            <TextInput
              type="text"
              value={formik.values.disease_history}
              name="disease_history"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Disease History"
              error={formik.errors.disease_history && formik.touched.disease_history ? true : false}
              errormessage={formik.errors.disease_history}
            />
          </div>
          <div className="text-center">
            <label htmlFor="total_calf">Total Calf</label>
            <TextInput
              type="number"
              value={formik.values.total_calf}
              name="total_calf"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Total Calf"
              error={formik.errors.total_calf && formik.touched.total_calf ? true : false}
              errormessage={formik.errors.total_calf}
            />
          </div>
          <div className="text-center">
            <label htmlFor="death_date">Death Date</label>
            <TextInput
              type="date"
              value={formik.values.death_date}
              name="death_date"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Death Date"
              error={formik.errors.death_date && formik.touched.death_date ? true : false}
              errormessage={formik.errors.death_date}
            />
          </div>
          <div className="text-center">
            <label htmlFor="calving_history">Calving History</label>
            <TextInput
              type="text"
              value={formik.values.calving_history}
              name="calving_history"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Calving History"
              error={formik.errors.calving_history && formik.touched.calving_history ? true : false}
              errormessage={formik.errors.calving_history}
            />
          </div>
          <div className="text-center">
            <label htmlFor="purchase_date">Purchase Date</label>
            <TextInput
              type="date"
              value={formik.values.purchase_date}
              name="purchase_date"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Purchase Date"
              error={formik.errors.purchase_date && formik.touched.purchase_date ? true : false}
              errormessage={formik.errors.purchase_date}
            />
          </div>
          <div className="text-center">
            <label htmlFor="sale_date">Sale Date</label>
            <TextInput
              type="date"
              value={formik.values.sale_date}
              name="sale_date"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Sale Date"
              error={formik.errors.sale_date && formik.touched.sale_date ? true : false}
              errormessage={formik.errors.sale_date}
            />
          </div>
          <div className="text-center">
            <label htmlFor="expected_delivery_date">Expected Delivery Date</label>
            <TextInput
              type="date"
              value={formik.values.expected_delivery_date}
              name="expected_delivery_date"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Expected Delivery Date"
              error={formik.errors.expected_delivery_date && formik.touched.expected_delivery_date ? true : false}
              errormessage={formik.errors.expected_delivery_date}
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Edit Animal
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
      </form>
    </div>
  );
};

export default EditAnimal;
