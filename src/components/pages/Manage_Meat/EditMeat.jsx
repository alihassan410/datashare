import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditMeatAnimal, getAnimalByIdInternal } from "../../../api/internal";
import TextInput from "../../TextInput/TextInput";
import SelectInput from "../../SelectInput/SelectInput";
import { useFormik } from "formik";
import meatSchema from "../../../schemas/meatSchema";

const EditMeat = () => {
    const { id } = useParams(); // Use useParams to get the id from the URL
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [newMeat, setNewMeat] = useState({});

    useEffect(() => {
        const getMeatAnimalById = async () => {
            try {
                let res = await getAnimalByIdInternal(id);
                setNewMeat(res.data.meats);
            } catch (error) {
                console.error("Error fetching meat animal:", error);
            }
        };
        getMeatAnimalById();
    }, [id]);
    useEffect(() => {
        if (newMeat) {
            formik.setValues({
                animalType: newMeat.animalType,
                animal_code: newMeat.animal_code, sex: newMeat.sex,
                weight: newMeat.weight, purchase_price: newMeat.purchase_price,
                purchase_date: newMeat.purchase_date, age: newMeat.age,
                _id: newMeat._id,
            });
        }
    }, [newMeat])
    const formik = useFormik({
        initialValues: {
            animalType: '',
            animal_code: '',
            sex: '',
            weight: '',
            purchase_price: '',
            purchase_date: '',
            age: '',
        },
        validationSchema: meatSchema,
        enableReinitialize: true, // Reinitialize form values when newMeat changes
        onSubmit: async (values) => {
            const data = {
                ...values,
                // animal_code can be updated or set differently based on your requirements
                animal_code: newMeat.animal_code, // Preserve the existing code or adjust if needed
            };

            try {
                const response = await EditMeatAnimal(data);
                if (response.status === 201) {
                    navigate("/dashboard/manage_meat");
                } else {
                    setError(response.response.data.message || "An error occurred");
                }
            } catch (error) {
                setError("An error occurred");
            }
        },
    });

    return (
        <div className="max-w-lg w-full px-0 py-9 bg-white mt-[30px] shadow-none m-auto overflow-hidden sm:rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Edit Meat Animal</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <div className="text-center">
                        <label htmlFor="animalType">Animal Type</label>
                        <SelectInput
                            className="w-9"
                            options={[
                                { value: 'none', text: 'Select any one..' },
                                { value: 'buffalo', text: 'Buffalo' },
                                { value: 'cow', text: 'Cow' },
                                { value: 'goat', text: 'Goat' }
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
                        <label htmlFor="sex">Sex</label>
                        <SelectInput
                            className="w-9"
                            options={[
                                { value: 'none', text: 'Select gender..' },
                                { value: 'male', text: 'Male' },
                                { value: 'female', text: 'Female' },
                            ]}
                            value={formik.values.sex}
                            name="sex"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={formik.errors.sex && formik.touched.sex ? true : false}
                            errorMessage={formik.errors.sex}
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
                </div>
                <div className="flex items-center justify-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save Changes
                    </button>
                </div>
                {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                )}
            </form>
        </div>
    );
};

export default EditMeat;
