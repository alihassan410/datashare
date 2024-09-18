import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditMilkClient, getMilkById } from "../../../api/internal";
import TextInput from "../../TextInput/TextInput";
import SelectInput from "../../SelectInput/SelectInput";
import { useFormik } from "formik";
import milkSchema from "../../../schemas/milkSchema";

const EditMilk = (props) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [newMilks, setNewMilks] = useState(null); // null for initial state

    // Fetch milk data by id
    useEffect(() => {
        const fetchAnimal = async () => {
            let milk = await getMilkById(props.id);
            setNewMilks(milk.data.milks); // Set the fetched milk data
        };
        fetchAnimal();
    }, [props.id]);

    // useFormik hook
    const formik = useFormik({
        initialValues: {
            animalType: "",
            animal_code: "",
            date: new Date(),
            time: "",
            quantity: "",
        },
        validationSchema: milkSchema,
        onSubmit: async (values) => {
            const data = {
                animalType: values.animalType,
                animal_code: values.animal_code,
                date: new Date(),
                time: values.time,
                quantity: values.quantity,
                _id: newMilks._id
            };
            const response = await EditMilkClient(data);
            if (response.code === "ERR_BAD_REQUEST") {
                setError(response.response.data.message);
            } else {
                navigate("/dashboard/manage_milk");
            }
        },
    });

    // Update formik values when newMilks is set
    useEffect(() => {
        if (newMilks) {
            formik.setValues({
                animalType: newMilks.animalType,
                animal_code: newMilks.animal_code,
                date: new Date(),
                time: newMilks.time,
                quantity: newMilks.quantity,
            });
        }
    }, [newMilks]);

    if (!newMilks) {
        return <p>Loading...</p>;
    }

    const { values, handleBlur, handleChange, errors, touched } = formik;

    return (
        <div className="max-w-lg w-full px-0 py-9 bg-white mt-[30px] shadow-none m-auto overflow-hidden sm:rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Edit Milk</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <div className="text-center">
                        <label htmlFor="animalType">AnimalType</label>
                        <SelectInput
                            className="w-9"
                            options={[
                                { value: "none", text: "Select any one.." },
                                { value: "buffalo", text: "Buffalo" },
                                { value: "cow", text: "Cow" },
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
                        <label htmlFor="time">Time</label>
                        <SelectInput
                            className="w-9"
                            options={[
                                { value: "none", text: "Select time.." },
                                { value: "morning", text: "Morning" },
                                { value: "evening", text: "Evening" },
                            ]}
                            value={values.time}
                            name="time"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.time && touched.time}
                            errorMessage={errors.time}
                        />
                    </div>
                    <div className="text-center">
                        <label htmlFor="quantity">Quantity</label>
                        <TextInput
                            type="number"
                            value={values.quantity}
                            name="quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Quantity"
                            error={errors.quantity && touched.quantity}
                            errormessage={errors.quantity}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save Milk
                    </button>
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default EditMilk;
